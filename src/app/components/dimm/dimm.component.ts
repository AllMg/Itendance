import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatStepper, MatStepperNext} from '@angular/material';
import { StatusService} from '../../services/status/status.service';
import { CategorieService} from '../../services/categorie/categorie.service';
import { ToastrService } from 'ngx-toastr';
import { EmployeurService} from '../../services/employeur/employeur.service';
import { ActiviteService} from '../../services/activite/activite.service';
import { AuthService} from '../../services/auth/auth.service';
import { AdresseService} from '../../services/adresse/adresse.service';
import { BanqueService } from '../../services/banque/banque.service';
import {InfoService} from '../../services/info/info.service';
import { NotificationService } from '../../services/notification/notification.service';
@Component({
  selector: 'app-dimm',
  templateUrl: './dimm.component.html',
  styleUrls: ['./dimm.component.css']
})
export class DimmComponent implements OnInit, AfterViewInit {
  user: any;
  itemsFokotany: any[] = [];
  accessTemp: string;
  public items: any[] = [];
  itemsActivite: any[] = [];
  itemsFiraisana: any[] = [];
  JSON = this.JSON;
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  status: any [] = [];
  // condition boolean des pièces nécessaires pour les status
  pigl = false;
  enseignement = false;
  sp = false;
  sarl = false;
  sa = false;
  egm = false;

  lieu = [
    {libelle: 'ROUTE'},
    {libelle: 'AVENUE'},
    {libelle: 'BOULEVARD'},
    {libelle: 'RUE'},
    {libelle: 'LOGT'},
    {libelle: 'LOT'},
    {libelle: 'APPT'},
    {libelle: 'BP'},
    {libelle: 'LOCALITE'},
  ];
  corres = [];
  acces: any =  {
    id_acces: '',
    mdp: '',
    type_entite: 'E'
  };
  // banque data
  pays: any[];
  banque: any[];
  agence: any[];
  textInput: any;
  constructor(
    private routes: Router,
    private _formBuilder: FormBuilder,
    private statusService: StatusService,
    private categorieService: CategorieService,
    private employeurService: EmployeurService,
    private toastr: ToastrService,
    private activiteService: ActiviteService,
    private authService: AuthService,
    private adresseService: AdresseService,
    private banqueService: BanqueService,
    private infoService: InfoService,
    private notificationService: NotificationService
  ) { }

  ngAfterViewInit() {
    this.textInput = document.getElementById('matricule');
    let timeout = null;
    const text  = this.textInput;
    const component = this;
    this.textInput.onkeyup = function (e) {
      clearTimeout(timeout);
      timeout = setTimeout(function () {
        component.initDataFind(component.textInput.value);
      }, 1000);
    };
  }
  ngOnInit() {
    const userTemp = localStorage.getItem('user');
    if (userTemp) {
      this.user = JSON.parse(userTemp);
    }
    // individu service
    this.statusService.getAllStatusEmployeur().subscribe(data => {
      if (data.success) {
        this.status = data.msg;
      } else {
        alert(data.msg);
      }
    });
    // adresse service
    this.adresseService.getTypeAdresse().subscribe(data => {
      if (data.success) {
        this.corres = data.msg;
      } else {
        alert(data.msg);
      }
    });
    // banque service
    this.banqueService.listPays().subscribe(data => {
      if (data.success) {
        this.pays = data.msg;
      } else {
        alert(data.msg);
      }
    });
    this.banqueService.listBanque().subscribe(data => {
      if (data.success) {
        this.banque = data.msg;
      } else {
        alert(data.msg);
      }
    });
    // Form groupe
    this.firstFormGroup = this._formBuilder.group({
      employeur_nom: ['', Validators.required],
      employeur_lieu_registre: ['', Validators.required],
      employeur_date_registre: ['', Validators.required],
      employeur_num_registre: ['', Validators.required],
      employeur_date_adhesion: ['', Validators.required],
      employeur_date_embauche: ['', Validators.required],
      employeur_num_stat: ['', Validators.required],
      employeur_date_stat: ['', Validators.required],
      employeur_lieu_stat: ['', Validators.required],
      employeur_nif: ['', Validators.required],
      employeur_date_nif: ['', Validators.required],
      date_debut_act: ['', Validators.required],
      mote_de_passe: ['', Validators.required],
      mote_de_passe_conf: ['', Validators.required],
      sigle_code: ['', Validators.required],
      id_categorie: ['', Validators.required],
      id_statut: ['', Validators.required],
      id_activite: ['', Validators.required],
      dr_code: ['', Validators.required],
      firaisana: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      numero: ['', Validators.required],
      libelle: ['', Validators.required],
      adresse_quartier: ['', Validators.required],
      adresse_e_mail: ['', [Validators.required, Validators.email]],
      adresse_fax: ['', Validators.required],
      adresse_telephone: ['', Validators.required],
      id_type: ['', Validators.required],
      type: ['', Validators.required],
      fokontany: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      pays: ['', Validators.required],
      banque: ['', Validators.required],
      agence: ['', Validators.required],
      cle_rib: ['', Validators.required],
      date_debut: ['', Validators.required],
      compteBancaire: ['', Validators.required],
      code_swift: [''],
      domiciliation: [''],
      departement: [''],
      localite: [''],
      code_region: ['', ],
      boite_postale: ['']
    });
    this.fourthFormGroup = this._formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      fonction: ['', Validators.required],
      date_debut: ['', Validators.required],
      date_fin: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }
  // Action Function
  newEmployeur(stepper: MatStepper) {
    const cc = this.firstFormGroup.value;
    console.log(cc);
    const employeur = {
      employeur_nom: cc.employeur_nom,
      employeur_lieu_registre: cc.employeur_lieu_registre,
      employeur_date_registre: cc.employeur_date_registre,
      employeur_num_registre: cc.employeur_num_registre,
      employeur_date_adhesion: cc.employeur_date_adhesion,
      employeur_date_embauche: cc.employeur_date_embauche,
      employeur_num_stat: cc.employeur_num_stat,
      employeur_date_stat: cc.employeur_date_stat,
      employeur_lieu_stat: cc.employeur_lieu_stat,
      employeur_nif: cc.employeur_nif,
      employeur_date_nif: cc.employeur_date_nif,
      date_debut_act: cc.date_debut_act,
      sigle_code: cc.sigle_code,
      id_categorie: cc.id_categorie,
      id_statut: cc.id_statut.id_statut,
      id_activite: JSON.parse(cc.id_activite)
    };
    const dataToSend = {
      refsig: employeur,
      idFir: cc.firaisana,
      drCode: cc.dr_code
    };
    console.log(this.firstFormGroup.valid);
    if (this.firstFormGroup.valid) {
      if (cc.mote_de_passe !== cc.mote_de_passe_conf) {
        this.toastr.error('Mot de passe different');
      } else {
        if (this.accessTemp) {
          this.acces.id_acces = this.accessTemp;
          this.acces.mdp = cc.mote_de_passe;
          const data = {
            data: this.acces
          };
          this.authService.newAccess(data).subscribe(dataResponse => {
            if (dataResponse.success) {
              stepper.next();
            } else {
              this.toastr.error(dataResponse.msg);
            }
          });
        } else {
          const data = {
            data: dataToSend
          };
          this.employeurService.newEmployeur(data).subscribe(dataResponse => {
            if (dataResponse.success) {
              this.accessTemp = dataResponse.msg;
              this.acces.id_acces = this.accessTemp;
              this.acces.mdp = cc.mote_de_passe;
              const dataAcces = {
                data: this.acces
              };
              this.authService.newAccess(dataAcces).subscribe(dataR => {
                if (dataR.success) {
                  stepper.next();
                } else {
                  this.toastr.error(dataR.msg);
                }
              });
            } else {
              this.toastr.error(dataResponse.msg);
            }
          });
        }
      }
    }
  }
  newAdresse(stepper: MatStepper) {
    const cc = this.secondFormGroup.value;
    const adresse = {
      numero: cc.numero,
      libelle: cc.libelle,
      adresse_quartier: cc.adresse_quartier,
      adresse_e_mail: cc.adresse_e_mail,
      adresse_fax: cc.adresse_fax,
      adresse_telephone: cc.adresse_telephone,
      id_type: cc.id_type,
      type: cc.type,
      fokontany: JSON.parse(cc.fokontany),
      certificat_de_residence: cc.certificat_de_residence,
      id_empl: this.accessTemp,
      adresse_date: new Date()
    };
    const data = {
      data: adresse
    };
    if (this.secondFormGroup.valid) {
      this.adresseService.ajoutAdresse(data).subscribe(dataResponse => {
        if (dataResponse.success) {
          stepper.next();
        } else {
          this.toastr.error(dataResponse.msg);
        }
      });
    }

  }
  newCompte(stepper: MatStepper) {
    const cc = this.thirdFormGroup.value;
    const compte = {
      id_empl: this.accessTemp,
      id_pays: +cc.pays.id_pays,
      id_rel_bq_agce: cc.agence,
      compte: cc.compteBancaire,
      cle: cc.cle_rib,
      date_debut: cc.date_debut,
      code_swift: cc.code_swift,
      domiciliation: cc.domiciliation,
      departement: cc.departement,
      localite: cc.localite,
      code_region: cc.code_region,
      bp: cc.boite_postale
    };
    if (this.thirdFormGroup.valid) {
       this.banqueService.newCompte(compte).subscribe( data => {
         if (data.success) {
           stepper.next();
         } else {
           this.toastr.error(data.msg);
         }
       });
    }
  }
  newResponsable(stepper: MatStepper) {
    const cc = this.fourthFormGroup.value;
    if ( this.fourthFormGroup.valid ) {
      const responsable = {
        nom_resp: cc.nom,
        prenom_resp: cc.prenom,
        fonction_resp : cc.fonction,
        date_debut : cc.date_debut,
        date_fin : cc.date_fin,
        resp_mail : cc.email,
        id_empl : this.accessTemp
      };
      const data = {
         data : responsable
      };
      this.employeurService.updateResponsableEmployeur(data).subscribe(dataResponse => {
        if (dataResponse.success) {
          this.toastr.success('Votre demande a été pris en charge');
          const msg = 'Bonjour, votre compte compte a été créé avec succès, afin de vous connecter,' +
            ' votre numero CNAPS : ' + this.accessTemp +
            ' et utilisez le mot de passe que vous avez inséré lors de la création du compte';
          const content = {
            expediteur: 'System',
            destinataire: this.accessTemp,
            titre: 'Nouveau Compte',
            message: msg,
            typeNotif: 'Dimm',
            dateEnvoi: new Date()
          };
          this.notificationService.sendNotif(this.accessTemp, content).then(
            () => {
              this.toastr.success('Notification envoyé');
            },
            (err) => {
              this.toastr.error('Notification non envoyé');
            }
          );
          this.routes.navigate(['/accueil-connecte']);
        } else {
          this.toastr.error(dataResponse.msg);
        }
      });
    }
  }
  // End Action Function
  public inputTyped(source: string, text: string) {
    if (text.length > 2 ) {
      this.categorieService.getCategorieByName(text).subscribe( data => {
        if (data.success) {
           this.initData(data.msg);
        } else {
          this.toastr.error(data.msg);
        }
      });
    }
  }
  public inputTypedActivite(source: string, text: string) {
    if (text.length > 2 ) {
      this.activiteService.getActiviteByName(text).subscribe( data => {
        if (data.success) {
          this.initDataActivite(data.msg);
        } else {
          this.toastr.error(data.msg);
        }
      });
    }
  }
  private initData(data: any[]) {
    this.items = [];
    for (let i = 0; i < data.length; i++) {
      this.items.push({id: data[i].id_categorie, text: data[i].libelle});
    }
  }
  private initDataActivite(data: any[]) {
    this.itemsActivite = [];
    for (let i = 0; i < data.length; i++) {
      this.itemsActivite.push({id: JSON.stringify(data[i]), text: data[i].libelle});
    }
  }
  public inputTypedFiraisana(source: string, text: string) {
    if (text.length >= 3) {
      this.adresseService.firaisanaByName(text).subscribe(data => {
        this.initDataFiraisana(data.msg);
      });
    }
  }
  private initDataFiraisana(data: any[]) {
    this.itemsFiraisana = [];
    for (let i = 0; i < data.length; i++) {
      this.itemsFiraisana.push({id: data[i].id_firaisana, text: data[i].libelle + ' ' + data[i].fivondronana.id_fiv});
    }
  }
  public inputTypedFokotany(source: string, text: string) {
    if (text.length >= 3) {
      this.adresseService.listFokontany(text).subscribe(data => {
        this.initDataFokotoany(data.msg);
      });
    }
  }
  private initDataFokotoany(data: any[]) {
    this.itemsFokotany = [];
    for (let i = 0; i < data.length; i++) {
      this.itemsFokotany.push({id: JSON.stringify(data[i]), text: data[i].libelle + ' ' + data[i].firaisana.fivondronana.id_fiv});
    }
  }

  // banque function
  onChange(event) {
    this.banqueService.listAgenceByBanque(event.value).subscribe(data => {
      if (data.success) {
        this.agence = data.msg;
      } else {
        alert(data.msg);
      }
    });
  }

  // onchange function
  initDataFind(matricule: string) {
    this.infoService.infoIndiv(matricule).subscribe( data => {
      if (data.success) {
        const dataTemp = data.msg;
        this.fourthFormGroup.controls['nom'].setValue(dataTemp.nom);
        this.fourthFormGroup.controls['prenom'].setValue(dataTemp.prenoms);
        this.infoService.infoAdresse(matricule).subscribe( dataAdresse => {
          if (dataAdresse.success) {
            if (dataAdresse.msg.length > 0)  {
              const adresseTemp = dataAdresse.msg[0];
              this.fourthFormGroup.controls['email'].setValue(adresseTemp.adresse_e_mail);
            }
          } else {
            this.toastr.error(dataAdresse.msg);
          }
        });
      } else {
        this.toastr.error('impossible de trouver la personne cause : ' + data.msg);
      }
    });
  }
  // On change status
  onChangeStatus(data) {
    this.clearCondition();
    if (data.value) {
      const statChoose = data.value;
      if (statChoose.libelle === 'SOCIETE INDIVIDUELLE') {

        this.pigl = true;
      }
      if (statChoose.libelle === 'PROPRIETE PRIVE') {

        this.pigl = true;
      }
      if (statChoose.libelle === 'SARL') {

        this.sarl = true;
      }
      if (statChoose.libelle === 'EMPLOYEUR GENS DE MAISON') {

        this.egm = true;
      }
      if (statChoose.libelle === 'SOCIETE ANONYME') {

        this.sa = true;
      }
    } else {
      this.toastr.warning('Veuillez selectionner un status valide');
    }
  }
  // set False all condition piece
  clearCondition() {
    this.pigl = false;
    this.enseignement = false;
    this.sp = false;
    this.sarl = false;
    this.sa = false;
    this.egm = false;
  }

}
