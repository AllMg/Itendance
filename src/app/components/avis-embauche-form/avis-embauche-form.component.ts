import { Component, OnInit } from '@angular/core';
import { InfoService } from '../../services/info/info.service';
import { IndividuService } from "../../services/individu/individu.service";
import { AdresseService } from "../../services/adresse/adresse.service";
import { ToastrService } from "ngx-toastr";
import { MatStepper } from '@angular/material';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { EmployeurService } from '../../services/employeur/employeur.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-avis-embauche-form',
  templateUrl: './avis-embauche-form.component.html',
  styleUrls: ['./avis-embauche-form.component.css']
})
export class AvisEmbaucheFormComponent implements OnInit {

  JSON;
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  private btnDisable: boolean = true;
  private finContratDisabled: boolean = true;
  public show: boolean;

  public items: any[] = [];
  id: string;

  dataNationalite: any[];
  dataSexe: any[];
  id_nationalite: string;
  cin: string;
  code_dr: string;
  date_cin: string;
  date_naissance: string;
  id_firaisana_rel_fkt_naiss: string;
  id_sexe: string;
  lieu_naissance: string;
  nom: string;
  prenoms: string;
  pere: string;
  mere: string;

  newNom: string;
  newPrenoms: string;
  newDate_naissance: string;
  newLieu_naissance: string;
  new_id_firaisana_rel_fkt_naiss: string;
  new_id_sexe: string;
  new_id_nationalite: string;
  newCin: string;
  newDate_cin: string;
  newNom_pere: string;
  newNom_mere: string;
  newSalaire: any;
  newTypeContrat: any;
  newCodeDr: any;


  debutDateEmbauche: any;
  finDateEmbauche: any;
  typeContrat: any;
  salaire: any;

  sexe_indiv: string;
  nat_indiv: string;
  firaisana_indiv: string;

  estIndiv: boolean;
  private user: any;
  idLien: String;

  tabIdIndiv: any[];
  tabIdIndivStock: any[];
  test = false;
  today = Date.now();
  matriculeEmpl: string;
  raisonSociale: string;

  stockIndiv: any = {};
  stockTrav: any = {};

  contrats = [
    { value: 'CDD', viewValue: 'CDD' },
    { value: 'CDI', viewValue: 'CDI' }
  ];

  constructor(
    private adresseService: AdresseService,
    private infoService: InfoService,
    private toastr: ToastrService,
    private router: Router,
    private individuService: IndividuService,
    private route: ActivatedRoute,
    private employeurService: EmployeurService,
    private _formBuilder: FormBuilder
  ) {
    this.JSON = JSON;
    this.show=false;
  }


  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.idLien = params['id'];
    });
    this.user = JSON.parse(localStorage.getItem('user'));
    // this.debutDateEmbauche = this.date.getDate() + '/' + this.month + '/' + this.date.getFullYear();
    if (this.user.type_entite === 'E') {
      this.estIndiv = false;
      this.firstFormGroup = this._formBuilder.group({
        new_nom: ['', Validators.required],
        new_prenom: ['', Validators.required],
        new_date_naissance: ['', Validators.required],
        new_lieu: ['', Validators.required],
        new_firaisana: ['', Validators.required],
        id_sexe: ['', Validators.required],
        id_nationalite: ['', Validators.required],
        new_cin: ['', Validators.required],
        new_date_cin: ['', Validators.required],
        new_pere: ['', Validators.required],
        new_mere: ['', Validators.required],
        new_code_dr: ['', Validators.required]
      });
      this.secondFormGroup = this._formBuilder.group({
        new_salaire: ['', Validators.required],
        new_type_contrat: ['', Validators.required],
        new_date_debut_contrat: ['', Validators.required],
        new_date_fin_contrat: ['', Validators.required]
      });
    } else {
      this.estIndiv = true;
      this.id = this.user.id_acces;
      this.onValid();
    }
    this.adresseService.nationalite(1).subscribe(data => {
      if (data.success) {
        this.dataNationalite = data.msg;
        //console.log(this.dataNationalite);
      } else {
        setTimeout( () => this.toastr.error(data.msg));
      }
    });
    this.infoService.allSexe().subscribe(data => {
      if (data.success) {
        this.dataSexe = data.msg;
      } else {
        setTimeout( () => this.toastr.error(data.msg));
      }
    });
  }

  public inputTyped(source: string, text: string) {
    if (text.length >= 3) {
      this.adresseService.firaisanaByName(text).subscribe(data => {
        this.initData(data.msg);
      });
    }
  }

  private initData(data: any[]) {
    this.items = [];
    for (let i = 0; i < data.length; i++) {
      this.items.push({ id: data[i].id_firaisana, text: data[i].libelle });
    }
  }

  onChange(event) {
    if (event) {
      if (this.typeContrat === 'CDD') {
        this.btnDisable = false;
      }
      else this.btnDisable = true;

    }
  }


  /*onChange1(event) {
    if (event) {
      const cc = this.secondFormGroup.value;
      if (cc.new_type_contrat === 'CDD') {
        this.finContratDisabled = false;
      }
      else this.finContratDisabled = true;
    }
  }*/
  onValid() {
    this.infoService.infoIndiv(this.id).subscribe(
      (data) => {
       // console.log(data.msg);
        this.nom = data.msg.nom,
          this.prenoms = data.msg.prenoms,
          this.date_naissance = data.msg.date_naissance,
          this.lieu_naissance = data.msg.lieu_naissance,
          this.id_firaisana_rel_fkt_naiss = data.msg.id_firaisana_rel_fkt_naiss,
          this.sexe_indiv = data.msg.id_sexe.id_sexe,
          this.nat_indiv = data.msg.id_nationalite.libelle,
          this.firaisana_indiv = data.msg.id_firaisana_rel_fkt_naiss,
          this.cin = data.msg.cin,
          this.date_cin = data.msg.date_cin,
          this.pere = data.msg.nom_pere,
          this.mere = data.msg.nom_mere,
          this.code_dr = data.msg.code_dr,
          this.id_sexe = data.msg.id_sexe;
      },
      (err) => {
        console.log('ERR:' + err);
      }
    );

    this.individuService.listHistoriqueTravailleur(this.id).subscribe(
      (data1) => {
        console.log(data1);
        this.debutDateEmbauche = data1.msg[0].date_debut;
        this.finDateEmbauche = data1.msg[0].date_fin;
        this.typeContrat = data1.msg[0].type_contrat;
        if (data1.msg[0].type_contrat === 'CDD') {
          this.btnDisable = false;
        }
        this.salaire = data1.msg[0].salaire_fixe;
        this.matriculeEmpl = data1.msg[0].employeur_matr;
        console.log(this.matriculeEmpl);
        this.employeurService.infoEmployeur(data1.msg[0].id_empl).subscribe(data2 => {
          this.raisonSociale = data2.msg.employeur_nom;
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }

  public modifierTravailleur() {
    this.show=true;
    if (this.user.type_entite === 'T') {
      const newIndividu = {
        nom: this.nom,
        prenoms: this.prenoms,
        date_naissance: this.date_naissance,
        lieu_naissance: this.lieu_naissance,
        id_firaisana_rel_fkt_naiss: this.id_firaisana_rel_fkt_naiss,
        id_sexe: JSON.parse(this.id_sexe),
        id_nationalite: JSON.parse(this.id_nationalite),
        cin: this.cin,
        date_cin: this.date_cin,
        nom_pere: this.pere,
        nom_mere: this.mere,
        code_dr: this.code_dr,
        id_individu: this.id
      };
      const data = {
        data: newIndividu
      };
      this.infoService.new(data).subscribe(dataResponse => {
        if (dataResponse.success) {

          this.toastr.success('Modification effectuée', 'Mise à jour');
          setTimeout(() => {
            if (this.idLien === '1') {
              this.router.navigate(['/dn']);
            }
            else {
              this.router.navigate(['/liste-travailleur']);
            }
          }, 2000);
          // console.log(dataResponse.msg);
        } else {
          this.toastr.error(dataResponse.msg, 'Erreur');
        }
      });
    } else {


      if (this.typeContrat === 'CDI') {
        this.finDateEmbauche = '';
      }
      const newTrav = {
        id_empl: this.user.id_acces,
        date_debut: this.debutDateEmbauche,
        date_fin: this.finDateEmbauche,
        reference: '',
        employeurmatricule: '',
        type_contrat: this.typeContrat,
        salaire_fixe: this.salaire,
        id_individu: this.id
      };
      const data = {
        data: newTrav
      };

      this.individuService.listTravailleur(this.user.id_acces).subscribe(
        (dataRes) => {
          this.tabIdIndiv = dataRes.msg;
          for (let i = 0; i < this.tabIdIndiv.length; i++) {
            // console.log(this.tabIdIndiv[i].id_individu);
            if (this.tabIdIndiv[i].id_individu === this.id) {
              this.test = true;
            }
          }
          if (this.test) {
            this.infoService.ajouterTravailleur(data).subscribe(dataResponse => {
              if (dataResponse.success) {
                this.toastr.success('Modification effectuée', 'Mise à jour');
                setTimeout(() => {
                  this.router.navigate(['/accueil-connecte']);
                }, 2000);

              } else {
                this.toastr.error(dataResponse.msg, 'Erreur');
              }
            });

          } else {
            this.infoService.ajouterTravailleur(data).subscribe(dataResponse => {
              if (dataResponse.success) {
                this.toastr.success('Vous avez déclaré un nouveau travailleur', 'Enregistrement');
                setTimeout(() => {
                  this.router.navigate(['/accueil-connecte']);
                }, 2000);

              } else {
                this.toastr.error(dataResponse.msg, 'Erreur');
              }
            });

            // this.toastr.warning("Vous n'avez accès à cette option car cet individu n'est pas votre travailleur.", 'Avertissement!');
          }
        },
        (err) => {
          console.log('ERR:' + err);
        }
      );

    }
  }


  newTrav(stepper: MatStepper) {
    const cc = this.firstFormGroup.value;
    this.stockIndiv = {
      nom: cc.new_nom,
      prenoms: cc.new_prenom,
      date_naissance: cc.new_date_naissance,
      lieu_naissance: cc.new_lieu,
      id_firaisana_rel_fkt_naiss: cc.new_firaisana,
      id_sexe: JSON.parse(cc.id_sexe),
      id_nationalite: JSON.parse(cc.id_nationalite),
      cin: cc.new_cin,
      date_cin: cc.new_date_cin,
      nom_pere: cc.new_pere,
      nom_mere: cc.new_mere,
      code_dr: cc.new_code_dr
    };
    stepper.next();
  }

  newContrat(stepper: MatStepper) {
    this.show=true;
    const date = new Date(this.today);
    const month = (date.getMonth()) + 1;
    const dateNow = date.getFullYear() + '-' + month + '-' + date.getDate();
    const cc = this.secondFormGroup.value;
    this.stockTrav = {
      id_empl: this.user.id_acces,
      date_debut: cc.new_date_debut_contrat,
      date_fin: cc.new_date_fin_contrat,
      reference: '',
      employeurmatricule: '',
      type_contrat: cc.new_type_contrat,
      salaire_fixe: cc.new_salaire
    };

    const temp = {
      individu: this.stockIndiv,
      contrat: this.stockTrav
    };
    const dataObject = {
      temp: temp
    };

    this.infoService.newTrav(dataObject).subscribe(dataResponse => {
      if (dataResponse.success) {

        this.toastr.success(dataResponse.msg, 'Enregistrement');
        setTimeout(() => {
          if (this.idLien === '1') {
            this.router.navigate(['/dn']);
          } else {
            this.router.navigate(['/accueil-connecte']);
          }
        }, 2000);
      } else {
        this.toastr.error(dataResponse.msg, 'Erreur');
      }
    });
  }
}
