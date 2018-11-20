import { Component, OnInit } from '@angular/core';
import {AdresseService} from '../../services/adresse/adresse.service';
import {InfoService} from '../../services/info/info.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-new-individus',
  templateUrl: './new-individus.component.html',
  styleUrls: ['./new-individus.component.css']
})
export class NewIndividusComponent implements OnInit {
  JSON;
  itemId: any;
  public items: any[] = [];
  dataNationalite: any[];
  dataSexe: any[];
  id_nationalite: string;
  cin: string;
  code_dr: string;
  date_cin: string;
  date_naissance: string;
  id_firaisana_rel_fkt_naiss: any;
  id_sexe: string;
  lieu_naissance: string;
  nom: string;
  nom_mere: string;
  nom_pere: string;
  prenoms: string;
  matriculeR: any;
  constructor(
    private adresseService: AdresseService,
    private infoService: InfoService,
    private toastr: ToastrService
  ) {
    this.JSON = JSON;
  }

  ngOnInit() {
    this.adresseService.nationalite(1).subscribe( data => {
      if (data.success) {
        this.dataNationalite = data.msg;
        console.log(this.dataNationalite);
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
      this.items.push({id: data[i].id_firaisana, text: data[i].libelle});
    }
  }
  public  saveIndividu() {
    const newIndividu = {
      id_nationalite: JSON.parse(this.id_nationalite),
      cin: this.cin,
      code_dr: this.code_dr,
      date_cin: this.date_cin,
      date_naissance: this.date_naissance,
      id_firaisana_rel_fkt_naiss: this.id_firaisana_rel_fkt_naiss,
      id_sexe: JSON.parse(this.id_sexe),
      lieu_naissance: this.lieu_naissance,
      nom: this.nom,
      nom_mere: this.nom_mere,
      nom_pere: this.nom_pere,
      prenoms: this.prenoms
    };
    const data = {
      data: newIndividu
    };
    console.log(data);
    this.infoService.new(data).subscribe( dataResponse => {
      if (dataResponse.success) {
        setTimeout( () => this.toastr.success(dataResponse.msg, 'Enregistrement'));
      } else {
        setTimeout(() => this.toastr.error(dataResponse.msg));
      }
    });
  }
}
