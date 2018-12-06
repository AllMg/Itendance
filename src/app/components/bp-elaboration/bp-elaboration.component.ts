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
  @ViewChild('tdSepare') tdSepare: ElementRef;

  Menu = {
    menu: "inventaire",
    sousMenu: ""
  };

  Individu = {
    idIndividu: null,
    codeService: null
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
    refService: null
  };

  Validation = {
    refService: null,
    listeProjet: []
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
    if (nom == "service" && !this.Service.estVue) {
      this.Service.estVue = true;
      let comptes = ["60451", "60452", "60453", "6048"];
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
      that.chargeListeRubriqueFCT();
    });
  }

  /**
   * charge la liste des comptes 6
   * puis appelle la fonction qui charge la liste des comptes 2
   */
  chargeListeRubriqueFCT() {
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
        for (let compte of this.Service.listeDEP) {
          for (let rubrique of obs.msg) {
            if (rubrique.idpcg == compte.numeroCompte) {
              compte.libelleCompte = rubrique.libelcpt;
            }
          }
        }
        that.Service.listeFCT = liste;
        that.chargeListeRubriqueINV();
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
   */
  chargeListeRubriqueINV() {
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
        that.Service.listeINV = liste;
        that.chargeListeRubriqueREC();
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
   */
  chargeListeRubriqueREC() {
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
        that.Service.listeREC = liste;
      }
      that.fermeChargement();
      observ.unsubscribe();
      that.chargeRubriqueEnregistrer();
    });
  }

  /**
   * charge la liste des rubriques (des projets) déjà enregistrer pour continuer le travail
   */
  chargeRubriqueEnregistrer() {
    let that = this;
    let observ = this.budgetService.budgetTopic("prendBudgetEnregistrerBPSE", "4050", false).subscribe(obs => {
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
                  }
                }
              }
            }
          }
        }
        that.Service.projetsChoisis = listeProjet;
        if (htmlAChanger.length > 0) {
          /**
           * en retarde le placement des valeurs dans la page car il faut attendre que les éléments
           * html soit affiché complètement
           */
          setTimeout(() => {
            for (let changer of htmlAChanger) {
              $("#cred_" + changer.numeroCompte+changer.idProjet).html(changer.cred);
              $("#prec_" + changer.id).html(changer.prec);
            }
          }, 2000);
        }
      }
      observ.unsubscribe();
    });
  }

  sommeDEP(compteDebut, idProjet) {
    let somme = 0;
    for(let rubrique of this.Service.listeFCT[0].enfants){
      if(rubrique.numeroCompte.startsWith(compteDebut)){
        somme += rubrique.projets[idProjet];
      }
    }
    if(somme > 0){
      return this.separeMillier(somme.toString());
    };
    return "";
  }

  clickParentFCT(index) {
    this.Service.listeFCT[index].visible = !this.Service.listeFCT[index].visible;
  }

  clickParentINV(index) {
    this.Service.listeINV[index].visible = !this.Service.listeINV[index].visible;
  }

  clickParentREC(index) {
    this.Service.listeREC[index].visible = !this.Service.listeREC[index].visible;
  }

  clickCategorie(cat) {
    this.Service.categorie = cat;
  }

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
        this.trieProjetChoisis();
        break;
      }
    }
    console.log("ajouterProjetPourElaboration", this.Service.listeREC);
  }

  trieProjetChoisis() {
    this.Service.projetsChoisis.sort((a, b) => {
      if (a.codeProjet > b.codeProjet) {
        return 1;
      }
      else if (a.codeProjet < b.codeProjet) {
        return -1
      }
      return 0;
    });
  }

  creditDansCelluleFCT(indexP, indexE, idProjet, td) {
    let sansEspace = td.textContent.replace(/ /g, "");;
    let avecEspace = this.separeMillier(sansEspace);
    let chiffre = parseInt(sansEspace);
    if (chiffre != NaN) {
      this.Service.listeFCT[indexP].enfants[indexE].projets[idProjet] = chiffre;
    }
    td.textContent = avecEspace;
    this.curseurALaFin(td);
  }

  precisionDansCelluleFCT(indexP, indexE, td) {
    this.Service.listeFCT[indexP].enfants[indexE].precision = td.textContent;
  }

  creditDansCelluleINV(indexP, indexE, idProjet, td) {
    let sansEspace = td.textContent.replace(/ /g, "");;
    let avecEspace = this.separeMillier(sansEspace);
    let chiffre = parseInt(sansEspace);
    if (chiffre != NaN) {
      this.Service.listeINV[indexP].enfants[indexE].projets[idProjet] = chiffre;
    }
    td.textContent = avecEspace;
    this.curseurALaFin(td);
  }

  precisionDansCelluleINV(indexP, indexE, td) {
    this.Service.listeINV[indexP].enfants[indexE].precision = td.textContent;
  }

  creditDansCelluleREC(indexP, indexE, idProjet, td) {
    let sansEspace = td.textContent.replace(/ /g, "");;
    let avecEspace = this.separeMillier(sansEspace);
    let chiffre = parseInt(sansEspace);
    if (chiffre != NaN) {
      this.Service.listeREC[indexP].enfants[indexE].projets[idProjet] = chiffre;
    }
    td.textContent = avecEspace;
    this.curseurALaFin(td);
  }

  precisionDansCelluleREC(indexP, indexE, td) {
    this.Service.listeREC[indexP].enfants[indexE].precision = td.textContent;
  }

  enregistrerBudget() {
    this.afficheChargement();
    let attributs = ["listeFCT", "listeINV", "listeREC"];
    let argument = [];
    for (let projet of this.Service.projetsChoisis) {
      let servRubr = {
        refService: "4050",
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

  validerBudget(){
    this.afficheChargement();
    let that = this;
    let observ = this.budgetService.budgetTopic("validerBudgetBPSE","4050",false).subscribe(obs=>{
      that.fermeChargement();
      if(obs.success){
        that.toast.success("Vous avez marqué votre plan budgétaire comme étant valide");
      }
      observ.unsubscribe();
    });
  }

  chargerBudgetServiceOuSe(){

  }

  chargerBudgetServiceEtSe() {
    /*this.afficheChargement();
    let that = this;
    let observ = this.budgetService.budgetTopic("",this.Validation.refService,false).subscribe(obs=>{
      if(obs.success){

      }
      observ.unsubscribe();
    });*/
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
