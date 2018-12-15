import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BudgetService } from '../../services/budget/budget.service';
import { ImmoService } from '../../services/immo/immo.service';

declare var $: any;

@Component({
  selector: 'app-bp-elaboration',
  templateUrl: './bp-elaboration.component.html',
  styleUrls: ['./bp-elaboration.component.css']
})
export class BpElaborationComponent implements OnInit {

  @ViewChild('modalChargement') modalChargement;
  @ViewChild('modalConfirmeValidation') modalConfirmeValidation;
  @ViewChild('tdSepare') tdSepare: ElementRef;

  Menu = {
    menu: "inventaire",
    sousMenu: ""
  };

  Individu = {
    idIndividu: null,
    codeService: "8010"
  };

  ngxServices = [];

  exerciceBudget: number;

  Service = {
    estVue: false,
    categorie: "fct",
    listeProjet: [],
    ngxProjet: [], // pour affichage
    idProjet: -1,
    projetsChoisis: [],
    listeFCT: [],
    listeINV: [],
    listeREC: [],
    listeDEP: []
  };

  SE = {
    estVue: false,
    categorie: "fct",
    refService: null,
    projetsChoisis: [],
    listeFCT: [],
    listeINV: [],
    listeREC: [],
    listeDEP: []
  };

  Validation = {
    refService: null,
    listeProjet: [],
    budgetChoisi: ""
  };

  constructor(
    private router: Router,
    private toast: ToastrService,
    private budgetService: BudgetService,
    private immoService: ImmoService) {
    this.exerciceBudget = new Date(Date.now()).getFullYear() + 1;
  }

  ngOnInit() {
    this.initIndividu();
    this.calculAngleSepare();
  }

  initIndividu() {
    let utilisateur = JSON.parse(localStorage.getItem('user'));
    let that = this;
    let observ = this.budgetService.getServiceDirection(utilisateur.id_acces).subscribe(obs => {
      console.log("Utilisateur", obs);
      if (obs.success && obs.msg.length > 0) {
        that.Individu.idIndividu = utilisateur.id_acces;
        that.Individu.codeService = obs.msg[0].code_service.code_service;
      }
      observ.unsubscribe();
    });
  }

  clickInMenu1(lien: string) {
    this.router.navigate(['/' + lien]);
  }

  clickSousMenu(nom) {
    this.Menu.sousMenu = nom;
    let comptes = ["60451", "60452", "60453", "6048"];
    if (nom == "service" && !this.Service.estVue) {
      this.Service.estVue = true;
      for (let compte of comptes) {
        this.Service.listeDEP.push({
          numeroCompte: compte,
          libelleCompte: "",
          projets: {}
        });
      }
      this.chargerListeProjet();
    }
    if(nom == "se" || nom == "val"){
      if(nom == "se"){
        this.SE.estVue = true;
        for (let compte of comptes) {
          this.SE.listeDEP.push({
            numeroCompte: compte,
            libelleCompte: "",
            projets: {}
          });
        }
      }
      this.chargeListeService();
    }
  }

  chargeListeService(){
    let that = this;
    let observ = this.immoService.getAllRefDrhService().subscribe(obs => {
      if (obs.success) {
        obs.msg.sort((a, b) => {
          if (a.libelle > b.libelle) {
            return 1;
          }
          else if (a.libelle < b.libelle) {
            return -1;
          }
          return 0;
        });
        let listeService = obs.msg;
        let liste = [];
        for (let i = 0; i < listeService.length; i++) {
          liste.push({
            id: listeService[i].code_service,
            text: listeService[i].libelle + " " + listeService[i].code_service
          });
        }
        that.ngxServices = liste;
      }
      observ.unsubscribe();
    });
  }

  chargerListeProjet() {
    let that = this;
    let observ = this.budgetService.budgetTopic("listeProjetPourElaborationBPSE", "", false).subscribe(obs => {
      console.log("listeProjetPourElaborationBPSE", obs);
      if (obs.success) {
        that.Service.listeProjet = obs.msg;
        let liste = [];
        for (let projet of that.Service.listeProjet) {
          liste.push({
            id: projet.idProjet,
            text: projet.codeProjet + " - " + projet.libelleProjet
          });
        }
        that.Service.ngxProjet = liste;
      }
      observ.unsubscribe();
      that.chargeListeRubriqueFCT('Service', false);
    });
  }

  /**
   * charge la liste des comptes 6
   * puis appelle la fonction qui charge la liste des comptes 2
   * @param obj l'objet de la class qui possède l'attribut à initialisé
   * @param chargeSE un boolean qui précise si on doit charger les données enregistré par SE ou Service
   */
  chargeListeRubriqueFCT(obj, chargeSE:boolean) {
    this.afficheChargement();
    let that = this;
    let observ = this.budgetService.getCptbyGroupe("6").subscribe(obs => {
      console.log("getCptbyGroupe 6", obs);
      if (obs.success) {
        let liste = [];
        let indice = -1;
        for (let rubrique of obs.msg) {
          if (rubrique.idpcg.startsWith("69")) {
            break;
          }
          else {
            if (rubrique.idpcg.length == 2) {
              liste.push({
                numeroCompte: rubrique.idpcg,
                libelleCompte: rubrique.libelcpt,
                enfants: [],
                visible: false
              });
              indice++;
            }
            else {
              if (rubrique.imputable == "I") {
                liste[indice].enfants.push({
                  numeroCompte: rubrique.idpcg,
                  libelleCompte: rubrique.libelcpt,
                  precision: "",
                  projets: {}
                });
              }
            }
          }
        }
        for (let compte of this[obj].listeDEP) {
          for (let rubrique of obs.msg) {
            if (rubrique.idpcg == compte.numeroCompte) {
              compte.libelleCompte = rubrique.libelcpt;
            }
          }
        }
        that[obj].listeFCT = liste;
        that.chargeListeRubriqueINV(obj, chargeSE);
      }
      else {
        that.fermeChargement();
      }
      observ.unsubscribe();
    });
  }

  /**
   * charge la liste des comptes 2
   * puis appelle la fonction qui charge la liste des comptes 7
   * @param obj l'objet de la class qui possède l'attribut à initialisé
   * @param chargeSE un boolean qui précise si on doit charger les données enregistré par SE ou Service
   */
  chargeListeRubriqueINV(obj, chargeSE:boolean) {
    this.afficheChargement();
    let that = this;
    let observ = this.budgetService.getCptbyGroupe("2").subscribe(obs => {
      console.log("getCptbyGroupe 2", obs);
      if (obs.success) {
        let liste = [];
        let indice = -1;
        for (let i = 0; i < obs.msg.length; i++) {
          let rubrique = obs.msg[i];
          if (rubrique.imputable == "N") {
            if (obs.msg[i + 1].imputable == "I") {
              liste.push({
                numeroCompte: rubrique.idpcg,
                libelleCompte: rubrique.libelcpt,
                enfants: [],
                visible: false
              });
              indice++;
            }
          }
          else {
            liste[indice].enfants.push({
              numeroCompte: rubrique.idpcg,
              libelleCompte: rubrique.libelcpt,
              precision: "",
              projets: {}
            });
          }
        }
        that[obj].listeINV = liste;
        that.chargeListeRubriqueREC(obj, chargeSE);
      }
      else {
        that.fermeChargement();
      }
      observ.unsubscribe();
    });
  }

  /**
   * charge la liste des comptes 7
   * puis appelle la fonction qui charge la liste rubrique déjà enregistrer
   * @param obj l'objet de la class qui possède l'attribut à initialisé
   * @param chargeSE un boolean qui précise si on doit charger les données enregistré par SE ou Service
   */
  chargeListeRubriqueREC(obj, chargeSE:boolean) {
    this.afficheChargement();
    let that = this;
    let observ = this.budgetService.getCptbyGroupe("7").subscribe(obs => {
      console.log("getCptbyGroupe 7", obs);
      if (obs.success) {
        let liste = [];
        let indice = -1;
        for (let i = 0; i < obs.msg.length; i++) {
          let rubrique = obs.msg[i];
          if (rubrique.imputable == "N") {
            if (obs.msg[i + 1].imputable == "I") {
              liste.push({
                numeroCompte: rubrique.idpcg,
                libelleCompte: rubrique.libelcpt,
                enfants: [],
                visible: false
              });
              indice++;
            }
          }
          else {
            liste[indice].enfants.push({
              numeroCompte: rubrique.idpcg,
              libelleCompte: rubrique.libelcpt,
              precision: "",
              projets: {}
            });
          }
        }
        that[obj].listeREC = liste;
      }
      that.fermeChargement();
      observ.unsubscribe();
      if(!chargeSE){
        that.chargeRubriqueEnregistrer();
      }
      else{
        that.chargerBudgetServiceOuSe();
      }
    });
  }

  /**
   * charge la liste des rubriques (des projets) déjà enregistrer pour continuer le travail
   */
  chargeRubriqueEnregistrer() {
    let that = this;
    let observ = this.budgetService.budgetTopic("prendBudgetEnregistrerBPSE", this.Individu.codeService, false).subscribe(obs => {
      console.log("prendBudgetEnregistrerBPSE", obs);
      if (obs.success) {
        let listeProjet = [];
        let htmlAChanger = [];
        let attributs = ["listeFCT", "listeINV", "listeREC"];
        for (let parent of obs.msg) {
          let projet = null;
          for (let pr of that.Service.listeProjet) {
            if (pr.idProjet == parent.idProjet) {
              projet = pr;
              listeProjet.push(pr);
              break;
            }
          }
          for(let attr of attributs){
            for (let rubriqueP of that.Service[attr]) {
              for (let rubriqueE of rubriqueP.enfants) {
                rubriqueE.projets[projet.idProjet] = 0;
                for (let enfant of parent.servRubrValeur) {
                  if (rubriqueE.numeroCompte == enfant.numeroCompte) {
                    rubriqueE.projets[projet.idProjet] = enfant.creditPrev;
                    rubriqueE.precision = enfant.precisionServ;
                    htmlAChanger.push({
                      idProjet: projet.idProjet,
                      numeroCompte: enfant.numeroCompte,
                      cred: that.separeMillier(enfant.creditPrev.toString()),
                      prec: enfant.precisionServ
                    });
                    break;
                  }
                }
              }
            }
          }
        }
        that.Service.projetsChoisis = listeProjet;
        that.trieProjetChoisis("Service");
        if (htmlAChanger.length > 0) {
          /**
           * en retarde le placement des valeurs dans la page car il faut attendre que les éléments
           * html soit affiché complètement
           */
          setTimeout(() => {
            for (let changer of htmlAChanger) {
              $("#sv_cred_" + changer.numeroCompte+changer.idProjet).html(changer.cred);
              $("#sv_prec_" + changer.numeroCompte).html(changer.prec);
            }
          }, 2000);
        }
      }
      observ.unsubscribe();
    });
  }

  /**
   * 
   * @param obj l'objet qui possède l'attribut à traiter
   * @param compteDebut le numero de compte parent
   * @param idProjet l'ID du projet
   */
  sommeDEP(obj, compteDebut, idProjet) {
    let somme = 0;
    for(let rubrique of this[obj].listeFCT[0].enfants){
      if(rubrique.numeroCompte.startsWith(compteDebut)){
        somme += rubrique.projets[idProjet];
      }
    }
    if(somme > 0){
      return this.separeMillier(somme.toString());
    };
    return "";
  }

  /**
   * 
   * @param obj Service ou SE l'objet qui possède l'attribut à modifier
   * @param index l'indice du rubrique parent des comptes 6
   */
  clickParentFCT(obj, index) {
    this[obj].listeFCT[index].visible = !this[obj].listeFCT[index].visible;
  }

  clickParentINV(obj, index) {
    this[obj].listeINV[index].visible = !this[obj].listeINV[index].visible;
  }

  clickParentREC(obj, index) {
    this[obj].listeREC[index].visible = !this[obj].listeREC[index].visible;
  }

  /**
   * 
   * @param obj Service ou SE l'objet qui possède l'attribut à modifier
   * @param cat la valeur du catégorie à afficher
   */
  clickCategorie(obj,cat) {
    this[obj].categorie = cat;
  }

  /**
   * fonction qui ajoute un projet dans le tableau pour l'élaboration du budget
   */
  ajouterProjetPourElaboration() {
    for (let projet of this.Service.projetsChoisis) {
      if (projet.idProjet == this.Service.idProjet) {
        return;
      }
    }
    for (let projet of this.Service.listeProjet) {
      if (projet.idProjet == this.Service.idProjet) {
        for (let parent of this.Service.listeFCT) {
          for (let enfant of parent.enfants) {
            enfant.projets[projet.idProjet] = 0;
          }
        }
        for (let parent of this.Service.listeINV) {
          for (let enfant of parent.enfants) {
            enfant.projets[projet.idProjet] = 0;
          }
        }
        for (let parent of this.Service.listeREC) {
          for (let enfant of parent.enfants) {
            enfant.projets[projet.idProjet] = 0;
          }
        }
        this.Service.projetsChoisis.push(projet);
        this.trieProjetChoisis('Service');
        break;
      }
    }
    console.log("ajouterProjetPourElaboration", this.Service.listeREC);
  }

  /**
   * 
   * @param obj l'objet possédant l'attribut (la liste) à trié
   * met en ordre croissant les projets dans le tableau
   */
  trieProjetChoisis(obj:string) {
    this[obj].projetsChoisis.sort((a, b) => {
      if (a.codeProjet > b.codeProjet) {
        return 1;
      }
      else if (a.codeProjet < b.codeProjet) {
        return -1
      }
      return 0;
    });
  }

  /**
   * fonction appelé lors d'un appuye sur une touche du clavier dans la cellule où l'on précise
   * le crédit voulu pour les comptes de fonctionnment
   * 
   * @param obj l'objet qui possède l'attribut de traitement
   * @param indexP l'indice du compte parent
   * @param indexE l'indice du sous compte (compte enfant)
   * @param idProjet l'ID du projet où la valeur est entrée
   * @param td l'element html (colonne) où la valeur est entrée
   */
  creditDansCelluleFCT(obj, indexP, indexE, idProjet, td) {
    let sansEspace = td.textContent.replace(/ /g, "");
    let avecEspace = this.separeMillier(sansEspace);
    let chiffre = Number(sansEspace);
    if (isNaN(chiffre) != true) {
      this[obj].listeFCT[indexP].enfants[indexE].projets[idProjet] = chiffre;
      td.textContent = avecEspace;
    }
    else{
      if(this[obj].listeFCT[indexP].enfants[indexE].projets[idProjet] > 0){
        td.textContent = this.separeMillier(this[obj].listeFCT[indexP].enfants[indexE].projets[idProjet].toString());
      }
      else{
        td.textContent = "";
      }
    }
    this.curseurALaFin(td);
  }

  precisionDansCelluleFCT(obj, indexP, indexE, td) {
    this[obj].listeFCT[indexP].enfants[indexE].precision = td.textContent;
  }

  /**
   * fonction appelé lors d'un appuye sur une touche du clavier dans la cellule où l'on précise
   * le crédit voulu pour les comptes d'investissement
   */
  creditDansCelluleINV(obj, indexP, indexE, idProjet, td) {
    let sansEspace = td.textContent.replace(/ /g, "");;
    let avecEspace = this.separeMillier(sansEspace);
    let chiffre = Number(sansEspace);
    if (isNaN(chiffre) != true) {
      this[obj].listeINV[indexP].enfants[indexE].projets[idProjet] = chiffre;
      td.textContent = avecEspace;
    }
    else{
      if(this[obj].listeINV[indexP].enfants[indexE].projets[idProjet] > 0){
        td.textContent = this.separeMillier(this[obj].listeINV[indexP].enfants[indexE].projets[idProjet].toString());
      }
      else{
        td.textContent = "";
      }
    }
    this.curseurALaFin(td);
  }

  precisionDansCelluleINV(obj, indexP, indexE, td) {
    this[obj].listeINV[indexP].enfants[indexE].precision = td.textContent;
  }

  /**
   * fonction appelé lors d'un appuye sur une touche du clavier dans la cellule où l'on précise
   * le crédit voulu pour les comptes de recette
   */
  creditDansCelluleREC(obj, indexP, indexE, idProjet, td) {
    let sansEspace = td.textContent.replace(/ /g, "");;
    let avecEspace = this.separeMillier(sansEspace);
    let chiffre = Number(sansEspace);
    if (isNaN(chiffre) != true) {
      this[obj].listeREC[indexP].enfants[indexE].projets[idProjet] = chiffre;
      td.textContent = avecEspace;
    }
    else{
      if(this[obj].listeREC[indexP].enfants[indexE].projets[idProjet] > 0){
        td.textContent = this.separeMillier(this[obj].listeREC[indexP].enfants[indexE].projets[idProjet].toString());
      }
      else{
        td.textContent = "";
      }
    }
    this.curseurALaFin(td);
  }

  precisionDansCelluleREC(obj, indexP, indexE, td) {
    this[obj].listeREC[indexP].enfants[indexE].precision = td.textContent;
  }

  /**
   * 
   * @param validerBudget boolean - si true alors la validation se suit sinon s'arrête à l'enregistrement
   * enregistre le plan budgétaire actuel pour pouvoir l'éditer plus tard
   */
  enregistrerBudget(validerBudget) {
    this.afficheChargement();
    let attributs = ["listeFCT", "listeINV", "listeREC"];
    let argument = [];
    for (let projet of this.Service.projetsChoisis) {
      let servRubr = {
        refService: this.Individu.codeService,
        idProjet: projet.idProjet,
        servRubrValeur: []
      }
      for (let attr of attributs) {
        for (let parent of this.Service[attr]) {
          for (let enfant of parent.enfants) {
            if (enfant.projets[projet.idProjet] > 0) {
              servRubr.servRubrValeur.push({
                numeroCompte: enfant.numeroCompte,
                creditPrev: enfant.projets[projet.idProjet],
                precisionServ: enfant.precision
              });
            }
          }
        }
      }
      if (servRubr.servRubrValeur.length > 0) {
        argument.push(servRubr);
      }
    }
    console.log("argument", argument);
    let that = this;
    let observ = this.budgetService.budgetTopic("ajoutRubriquePrevisionServBPSE", argument, true).subscribe(obs => {
      console.log("ajoutRubriquePrevisionServBPSE", obs);
      if (obs.success) {
        if(validerBudget){
          that.marqueFinitionBudget();
        }
        else{
          that.toast.success("Enregistrement terminé");
        }
      }
      else {
        that.toast.error("Une erreur vous empêche d'enregistrer ce plan budgétaire");
      }
      observ.unsubscribe();
    });
  }

  /**
   * Marque que le plan budgetétaire du service peut être maintenant être traité par le service SE
   */
  marqueFinitionBudget(){
    let that = this;
    let observ = this.budgetService.budgetTopic("validerBudgetServiceBPSE",this.Individu.codeService,false).subscribe(obs=>{
      that.fermeChargement();
      if(obs.success){
        that.toast.success("Vous avez marqué votre plan budgétaire comme étant valide");
      }
      observ.unsubscribe();
    });
  }

  chargerBudgetServiceOuSe(){
    this.SE.projetsChoisis = [];
    let that = this;
    let observ = this.budgetService.budgetTopic("prendBudgetEnregistreSEOuServiceBPSE", this.Individu.codeService, false).subscribe(obs => {
      console.log("prendBudgetEnregistreSEOuServiceBPSE", obs);
      if (obs.success) {
        let htmlAChanger = [];
        let attributs = ["listeFCT", "listeINV", "listeREC"];
        for (let parent of obs.msg) {
          that.SE.projetsChoisis.push(parent.projet);
          for(let attr of attributs){
            for (let rubriqueP of that.SE[attr]) {
              for (let rubriqueE of rubriqueP.enfants) {
                rubriqueE.projets[parent.projet.idProjet] = 0;
                for (let enfant of parent.rubrique) {
                  if (rubriqueE.numeroCompte == enfant.numeroCompte) {
                    rubriqueE.projets[parent.projet.idProjet] = enfant.creditPrev;
                    rubriqueE.precision = enfant.precisionServ;
                    htmlAChanger.push({
                      idProjet: parent.projet.idProjet,
                      numeroCompte: enfant.numeroCompte,
                      cred: that.separeMillier(enfant.creditPrev.toString()),
                      prec: enfant.precisionServ
                    });
                    break;
                  }
                }
              }
            }
          }
        }
        that.trieProjetChoisis('SE');

        if (htmlAChanger.length > 0) {
          /**
           * en retarde le placement des valeurs dans la page car il faut attendre que les éléments
           * html soit affiché complètement
           */
          setTimeout(() => {
            for (let changer of htmlAChanger) {
              $("#se_cred_" + changer.numeroCompte+changer.idProjet).html(changer.cred);
              $("#se_prec_" + changer.numeroCompte).html(changer.prec);
            }
          }, 2000);
        }
      }
      observ.unsubscribe();
    });
  }

  enregistrerBudgetParSE(){
    this.afficheChargement();
    let attributs = ["listeFCT", "listeINV", "listeREC"];
    let argument = [];
    for (let projet of this.SE.projetsChoisis) {
      let servRubr = {
        refService: this.Individu.codeService,
        idProjet: projet.idProjet,
        servRubrValeur: []
      }
      for (let attr of attributs) {
        for (let parent of this.SE[attr]) {
          for (let enfant of parent.enfants) {
            if (enfant.projets[projet.idProjet] > 0) {
              servRubr.servRubrValeur.push({
                numeroCompte: enfant.numeroCompte,
                creditPrev: enfant.projets[projet.idProjet],
                precisionServ: enfant.precision
              });
            }
          }
        }
      }
      if (servRubr.servRubrValeur.length > 0) {
        argument.push(servRubr);
      }
    }
    console.log("argument", argument);
    let that = this;
    let observ = this.budgetService.budgetTopic("ajoutParSERubriquePrevisionBPSE", argument, true).subscribe(obs => {
      console.log("ajoutParSERubriquePrevisionBPSE", obs);
      that.fermeChargement();
      if (obs.success) {
        that.toast.success("Enregistrement terminé");
      }
      else {
        that.toast.error("Une erreur vous empêche d'enregistrer ce plan budgétaire");
      }
      observ.unsubscribe();
    });
  }

  /**
   * charge la somme des crédits de chaque projet que le Service et le SE ont enrégistré
   * pour voir la différence lors de la validation de l'un ou l'autre
   */
  chargerBudgetServiceEtSe() {
    this.afficheChargement();
    let that = this;
    let observ = this.budgetService.budgetTopic("prendBudgetServiceEtSEBPSE",this.Validation.refService,false).subscribe(obs=>{
      console.log("prendBudgetServiceEtSEBPSE",obs);
      if(obs.success){
        let liste = [];
        for(let projet of obs.msg){
          let data = {
            codeProjet: projet.projet.codeProjet,
            affSe: "",
            affService: that.separeMillier(projet.sommeService.toString()),
            sommeSe: projet.sommeSe,
            sommeService: projet.sommeService,
            diff: ""
          };
          liste.push(data);
          if(projet.sommeSe > 0){
            data.diff = that.separeMillier(Math.abs(projet.sommeSe - projet.sommeService).toString());
            data.affSe = that.separeMillier(projet.sommeSe.toString());
          }
        }
        liste.sort((a,b)=>{
          if(a.codeProjet > b.codeProjet){
            return 1;
          }
          else if(a.codeProjet < b.codeProjet){
            return -1
          }
          return 0;
        });
        that.Validation.listeProjet = liste;
      }
      else{
        that.Validation.listeProjet = [];
      }
      that.fermeChargement();
      setTimeout(()=>{ that.calculAngleSepare(); }, 500);
      observ.unsubscribe();
    });
  }

  sommeSuggSE(){
    let som = 0;
    for(let pro of this.Validation.listeProjet){
      som += pro.sommeSe;
    }
    return som;
  }

  clickValiderBudgetService(){
    this.Validation.budgetChoisi = "service";
    this.afficheConfirme();
  }

  clickValiderBudgetSE(){
    this.Validation.budgetChoisi = "se";
    this.afficheConfirme();
  }

  confirmer(){
    this.fermeConfirme();
    this.validerBudgetServiceOuSE();
  }

  validerBudgetServiceOuSE(){
    this.afficheChargement();
    let argument = {
      refService: this.Validation.refService,
      seEstValide: 0
    };
    if(this.Validation.budgetChoisi == "se"){
      argument.seEstValide = 1;
    }
    let that = this;
    let observ = this.budgetService.budgetTopic("validerBudgetServiceOuSEBPSE",argument,true).subscribe(obs=>{
      console.log("validerBudgetServiceOuSEBPSE",obs);
      this.Validation.listeProjet = [];
      this.Validation.refService = "";
      setTimeout(()=>{ that.calculAngleSepare(); }, 500);
      this.fermeChargement();
      if(obs.success){
        that.toast.success("Validation terminé");
      }
      observ.unsubscribe();
    });
  }

  calculAngleSepare() {
    let ele = this.tdSepare.nativeElement;

    let ab = ele.clientHeight;
    let bc = ele.clientWidth;
    let hyp = Math.sqrt(ab * ab + bc * bc);
    let rad = Math.asin(ab / hyp);
    let nouvDeg = rad * 180 / Math.PI;

    ele.children[1].style.transform = "rotate(" + nouvDeg + "deg)";
  }

  afficheChargement() {
    $(this.modalChargement.nativeElement).modal("show");
  }

  fermeChargement() {
    $(this.modalChargement.nativeElement).modal('hide');
  }

  afficheConfirme() {
    $(this.modalConfirmeValidation.nativeElement).modal("show");
  }

  fermeConfirme(){
    $(this.modalConfirmeValidation.nativeElement).modal('hide');
  }

  separeMillier(valeur: string) {
    valeur = valeur.trim();
    let resultat = "";
    if (valeur.length > 3) {
      for (let i = valeur.length - 1, compteur = 0; i > -1; i--) {
        resultat = valeur.charAt(i) + resultat;
        compteur++;
        if (compteur == 3) {
          compteur = 0;
          resultat = " " + resultat;
        }
      }
    }
    else {
      return valeur;
    }
    return resultat;
  }

  curseurALaFin(htmlElement) {
    let range;
    range = document.createRange();
    range.selectNodeContents(htmlElement);
    range.collapse(false);
    let selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
  }

}
