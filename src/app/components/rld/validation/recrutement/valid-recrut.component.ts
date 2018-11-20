import { Component, OnInit } from '@angular/core';
import {MouvementService} from '../../../../services/rh/mouvement.service';
import {ToastrService} from 'ngx-toastr';
import {FileService} from '../../../../services/file/file.service';
import {FileModel} from '../../../../models/file-model';
import {DomSanitizer} from '@angular/platform-browser';
import {AdresseService} from '../../../../services/adresse/adresse.service';
import {InfoService} from '../../../../services/info/info.service';
import {ServiceRhService} from '../../../../services/rh/service-rh.service';

@Component({
  selector: 'app-valid-recrut',
  templateUrl: './valid-recrut.component.html',
  styleUrls: ['./valid-recrut.component.css']
})
export class ValidRecrutComponent implements OnInit {
  attente: any[];
  preselectionne: any[];
  entretien: any[];
  decision: any[];
  data: any[];
  postule: any;
  dateEntretient: any;
  heureDebut: any;
  observation: string;
  itemsFiraisana: any[] = [];
  itemsServices: any[] = [];
  id_sexe: string;
  JSON;
  dataSexe: any[];
  constructor(
    private mouvementService: MouvementService,
    private fileService: FileService,
    private toastr: ToastrService,
    private adresseService: AdresseService,
    private infoService: InfoService,
    private sanitizer: DomSanitizer,
    private  serviceRh: ServiceRhService
  ) {
    this.data = [];
    this.JSON = JSON;
  }

  ngOnInit() {
    this.infoService.allSexe().subscribe(data => {
      if (data.success) {
        this.dataSexe = data.msg;
      } else {
        setTimeout( () => this.toastr.error(data.msg));
      }
    });
    this.mouvementService.getPostuleEtat(1).subscribe( res => {
      if (res.success) {
        this.attente = res.msg;
        this.initPC(this.attente);
      } else {
        this.toastr.error( res.msg, 'Chargement de donnée / En attente');
      }
    });
    this.mouvementService.getPostuleEtat(4).subscribe( res => {
      if (res.success) {
        this.preselectionne = res.msg;
        this.initPC(this.preselectionne);
      } else {
        this.toastr.error( res.msg, 'Chargement de donnée / Présélectionnés');
      }
    });
    this.mouvementService.getPostuleEtat(5).subscribe( res => {
      if (res.success) {
        this.entretien = res.msg;
        console.log(this.entretien);
        this.initPC(this.entretien);
      } else {
        this.toastr.error( res.msg, 'Chargement de donnée / Entretien en cours');
      }
    });
    this.mouvementService.getPostuleEtat(6).subscribe( res => {
      if (res.success) {
        this.decision = res.msg;
        console.log(this.decision);
        this.initPC(this.decision);
      } else {
        this.toastr.error( res.msg, 'Chargement de donnée / Attente de décision');
      }
    });
  }
  clickRow(event) {
    this.postule = event;
  }
  entretienTermineOnClick() {
    if (this.postule.observation !== null) {
      this.mouvementService.updatePostule(this.postule.idpostule, this.postule.nom, '', this.postule.email, this.postule.telephone,
        this.postule.idposte, this.postule.observation, 6).subscribe(  next => {
        if (next.success) {

          this.entretien.splice( this.attente.indexOf(this.postule), 1);
          this.decision.push(this.attente);
        } else {
          this.toastr.error( next.msg);
        }
      });
    } else {
      this.toastr.error('Veuillez remplir le champ d\'observation');
    }
  }
  preselectOnClick() {
    this.mouvementService.updatePostule(this.postule.idpostule, this.postule.nom, '', this.postule.email, this.postule.telephone,
      this.postule.idposte, this.postule.observation, 4).subscribe(  next => {
        if (next.success) {

          this.attente.splice( this.attente.indexOf(this.postule), 1);
          this.preselectionne.push(this.attente);
        } else {
          this.toastr.error( next.msg);
        }
    });
  }
  valideEntretient() {
    if (!this.heureDebut || !this.dateEntretient) {
      this.toastr.error('Veuillez remplir les champs d\'heure et date d\'entretien');
    } else {
      this.mouvementService.updatePostule(this.postule.idpostule, this.postule.nom, '', this.postule.email, this.postule.telephone,
        this.postule.idposte, this.postule.observation, 5).subscribe(  next => {
        if (next.success) {
          this.mouvementService.saveEntretien(this.heureDebut, undefined, this.dateEntretient, this.postule.idpostule)
            .subscribe( res => {
              if (res.success) {
                this.postule.heuredebut = this.heureDebut;
                this.postule.dateentretien = this.dateEntretient;
                this.preselectionne.splice( this.preselectionne.indexOf(this.postule), 1);
                this.entretien.push(this.postule);
              } else {
                this.toastr.error( res.msg);
              }
            });
        } else {
          this.toastr.error( next.msg);
        }
      });
    }
  }
  rejeter() {
    this.mouvementService.updatePostule(this.postule.idpostule, this.postule.nom, '', this.postule.email, this.postule.telephone,
      this.postule.idposte, this.postule.observation, 3).subscribe(  next => {
      if (next.success) {
        this.attente.splice( this.attente.indexOf(this.postule), 1);
      } else {
        this.toastr.error( next.msg);
      }
    });
  }
  initPC(liste: any[]) {
    const sizeListe = liste.length;
    for (let i = 0; i < sizeListe; i++) {
      const tempFileModel = new FileModel();
      tempFileModel.id_files = liste[i].idpostule;
      tempFileModel.serviceName = 'R.H / Postule';
      this.fileService.readQuery(tempFileModel).subscribe( next => {
        if (next.success) {
          liste[i].pieces = next.msg;
          for (let j = 0; j < liste[i].pieces.length; j++) {
            liste[i].pieces[j].ext = this.fileService.extensionBase64(liste[i].pieces[j].file);
            liste[i].pieces[j].type = this.fileService.typefileBase64(liste[i].pieces[j].file);
          }
        } else {
          this.toastr.warning(next.msg, 'Chargment des pièces jointe');
        }
      });
    }
  }
  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
  inputTypedFiraisana(source: string, text: string) {
    if (text.length >= 3) {
      this.adresseService.firaisanaByName(text).subscribe(data => {
        if (data.success) {
          this.initDataFiraisana(data.msg);
        } else {
          this.toastr.error(data.msg);
        }
      });
    }
  }
  inputTypedService(source: string, text: string) {
    if (text.length >= 3) {
      this.serviceRh.service(text).subscribe(data => {
        if (data.success) {
          this.initDataService(data.msg);
        } else {
          this.toastr.error(data.msg);
        }
      });
    }
  }
  initDataFiraisana(data: any[]) {
    this.itemsFiraisana = [];
    for (let i = 0; i < data.length; i++) {
      this.itemsFiraisana.push({id: data[i].id_firaisana, text: data[i].libelle + ' ' + data[i].fivondronana.id_fiv});
    }
  }
  initDataService(data: any[]) {
    this.itemsServices = [];
    for (let i = 0; i < data.length; i++) {
      this.itemsServices.push({id: data[i].code_service, text: data[i].libelle_service + ' - Code Service : ' + data[i].code_direction});
    }
  }
}
