import { Component, OnInit } from '@angular/core';
import { AdresseService } from '../../services/adresse/adresse.service';
import { Router } from '@angular/router';
import { InfoService } from '../../services/info/info.service';
import { Adresse } from '../../models/Adresse';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ajout-adresse',
  templateUrl: './ajout-adresse.component.html',
  styleUrls: ['./ajout-adresse.component.css'],
  providers: [AdresseService]
})
export class AjoutAdresseComponent implements OnInit {
  public show: boolean;
  numero: any;
  libelle: any;
  quartier: any;
  adresse_e_mail: any;
  adresse_fax: any;
  adresse_telephone: any;
  private user: any;
  dataAdresse: any;
  entity: string;
  acces: any;
  dataType: any;
  itemsFokotany: any[] = [];
  fokontany: string;
  type_adresse: string;
  type_lieu: string;
  JSON;
  constructor(private infoService: InfoService, private adresse: AdresseService, private toastr: ToastrService, private router: Router) {
    this.JSON = JSON;
    this.show = false;
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.entity = this.user.type_entite;
    if (this.entity === 'T') {
      this.infoService.infoAdresse(this.user.id_acces).subscribe(data => {
        if (data.success) {

          this.dataAdresse = data.msg[0];
          // console.log(data.msg[0]);
          // this.dataAdresse = this.dataAdresse[0];
          if (this.dataAdresse) {
            this.numero = this.dataAdresse.numero;
            this.libelle = this.dataAdresse.libelle;
            this.quartier = this.dataAdresse.adresse_quartier;
            this.adresse_fax = this.dataAdresse.adresse_fax;
            this.adresse_e_mail = this.dataAdresse.adresse_e_mail;
            this.adresse_telephone = this.dataAdresse.adresse_telephone;
          }
        } else {
          setTimeout( () => this.toastr.error(data.msg));
        }
      });
    } else if (this.entity === 'E') {
      this.adresse.infoAdresseEmpl(this.user.id_acces).subscribe(data => {
        console.log(data);
        if (data.success) {
          this.dataAdresse = data.msg[0];
          // this.dataAdresse = this.dataAdresse[0];
          if (this.dataAdresse) {
            this.numero = this.dataAdresse.numero;
            this.libelle = this.dataAdresse.libelle;
            this.quartier = this.dataAdresse.adresse_quartier;
            this.adresse_fax = this.dataAdresse.adresse_fax;
            this.adresse_e_mail = this.dataAdresse.adresse_e_mail;
            this.adresse_telephone = this.dataAdresse.adresse_telephone;
          }
        } else {
          setTimeout( () => this.toastr.error(data.msg));
        }
      });
    }
    this.adresse.getTypeAdresse().subscribe(data => {
      if (data.success) {
        this.dataType = data.msg;
      } else {
        setTimeout( () => this.toastr.error(data.msg));
      }
    });

  }

  public inputTyped(source: string, text: string) {
    if (text.length >= 3) {
      this.adresse.listFokontany(text).subscribe(data => {
        if (data.success) {
          this.initData(data.msg);
        } else {
          this.toastr.error( data.msg);
        }
      });
    }
  }

  private initData(data: any[]) {
    this.itemsFokotany = [];
    for (let i = 0; i < data.length; i++) {
      this.itemsFokotany.push({ id: data[i].id_fokontany, text: data[i].libelle + ' ' + data[i].firaisana.fivondronana.id_fiv });
    }
  }

  ajoutAdresse() {
    this.show = true;
    const complement = this.type_lieu + ' ' + this.numero + ' ' + this.libelle;
    const fkt = {
      id_fokontany: this.fokontany
    };
    const typeAdr = {
      id_type: this.type_adresse
    };
    const today = Date.now();
    const date = new Date(today);
    const month = (date.getMonth()) + 1;
    const date_adr = date.getFullYear() + '-' + month + '-' + date.getDate();
    // console.log(this.dataAdresse.id_adresse);
    /*if( this.dataAdresse.hasOwnProperty("dataAdresse")){
      console.log('test');
    }*/
    if (this.entity === 'T') {
      this.acces = {
        adresse_quartier: this.quartier,
        adresse_telephone: this.adresse_telephone,
        adresse_e_mail: this.adresse_e_mail,
        adresse_fax: this.adresse_fax,
        fokontany: fkt,
        id_type: typeAdr,
        adresse_date: date_adr,
        id_individu: this.user.id_acces,
        // id_succursale: this.dataAdresse.id_succursale,
        // id_adresse: this.dataAdresse.id_adresse,
       // id_adresse: this.dataAdresse.id_adresse,
        type: this.type_lieu,
        numero: this.numero,
        libelle: this.libelle,
        complement: complement
        // id_adresse:'215629'
      };
    } else if (this.entity === 'E') {
      this.acces = {
        adresse_quartier: this.quartier,
        adresse_telephone: this.adresse_telephone,
        adresse_e_mail: this.adresse_e_mail,
        adresse_fax: this.adresse_fax,
        fokontany: fkt,
        id_type: typeAdr,
        adresse_date: date_adr,
        id_empl: this.user.id_acces,
        // id_adresse: this.dataAdresse.id_adresse,
        type: this.type_lieu,
        numero: this.numero,
        libelle: this.libelle,
        complement: complement
        // id_adresse:'215629'
      };
    }
    const data = {
      data: this.acces
    };
    this.adresse.ajoutAdresse(data).subscribe(
      dataResponse => {
        if (dataResponse.success) {
          setTimeout( () => this.toastr.success('Modification effectuée', 'Mise à jour'));
          this.router.navigate(['/accueil-connecte']);

        } else {
          setTimeout( () => this.toastr.error(dataResponse.msg, 'Erreur'));
        }
      }
    );
  }


}
