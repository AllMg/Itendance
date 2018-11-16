import { Component, OnInit } from '@angular/core';
import {EmployeurService} from '../../services/employeur/employeur.service';
import {InfoService} from '../../services/info/info.service';
import {AtmpService} from '../../services/atmp/atmp.service';
import {ActivatedRoute, Params} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {AdresseService} from '../../services/adresse/adresse.service';
import {NotificationService} from '../../services/notification/notification.service';
import {FileService} from '../../services/file/file.service';
import {FileModel} from '../../models/file-model';
import {DynamicAtmpService} from '../../services/atmp/dynamic-atmp/dynamic-atmp.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-validation-dat',
  templateUrl: './validation-dat.component.html',
  styleUrls: ['./validation-dat.component.css']
})
export class ValidationDatComponent implements OnInit {
  id_dat: string;
  employeur: any;
  employeurAdresse: any;
  victime: any;
  victimeAdresse: any;
  dat: any;
  fileQuery = new FileModel();
  libelle: any[];
  pieceJointe: any[];

  constructor(
    private route: ActivatedRoute,
    private employeurService: EmployeurService,
    private infoService: InfoService,
    private atmpService: DynamicAtmpService,
    private toatr: ToastrService,
    private adresseService: AdresseService,
    private notificationService: NotificationService,
    private fileService: FileService,
    private sanitizer: DomSanitizer,
    private atmpOldService: AtmpService
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id_dat = params['id'];
      this.fileQuery.id_files = this.id_dat;
      console.log(this.fileQuery);
      this.fileService.readQuery(this.fileQuery).subscribe(data => {
        console.log(data);
        if (data.success) {
          this.pieceJointe = data.msg;
          for (let i = 0; i < this.pieceJointe.length; i++) {
            this.pieceJointe[i].ext = this.fileService.extensionBase64(this.pieceJointe[i].file);
            this.pieceJointe[i].type = this.fileService.typefileBase64(this.pieceJointe[i].file);
          }
        } else {
          setTimeout(() => this.toatr.warning(data.msg, 'chargement des pièce jointe'));
        }
      });
      this.atmpService.getInputValue(this.id_dat).subscribe( res => {
        if (res.success) {
          this.libelle = res.msg;
        }
      });
      this.atmpService.getDemande(this.id_dat).subscribe( data => {
        if (data.success) {
          this.dat = data.msg;
          this.infoService.infoIndiv(this.dat.matricule).subscribe( infoTravailleur => {
            if (infoTravailleur.success) {
              this.victime = infoTravailleur.msg;
              console.log(this.victime.id_empl);
              this.employeurService.infoEmployeur(this.victime.id_empl).subscribe( infoEmployeur => {
                if (infoEmployeur.success) {
                  this.employeur = infoEmployeur.msg;
                } else {
                  setTimeout(() => this.toatr.warning(infoEmployeur.msg, 'chargement des données'));
                }
              });
              this.adresseService.infoAdresseEmpl(this.victime.id_empl).subscribe(infoAdresse => {
                if (infoAdresse.success) {
                  this.employeurAdresse = infoAdresse.msg[0];
                } else {
                  setTimeout(() => this.toatr.error(infoAdresse.msg));
                }
              });
            } else {
              setTimeout(() => this.toatr.warning(infoTravailleur.msg, 'chargement des données'));
            }
          });
          this.adresseService.infoAdresse(this.dat.matricule).subscribe( infoAdresseIndividu => {
            if (infoAdresseIndividu.success) {
              this.victimeAdresse = infoAdresseIndividu.msg[0];
            } else {
              setTimeout(() => this.toatr.warning(infoAdresseIndividu.msg, 'chargement des données'));
            }
          });
        } else {
          setTimeout(() => this.toatr.warning(data.msg, 'chargement des données'));
        }
      });
    });
  }
  rejeter() {
    this.atmpService.updateEtat(this.id_dat, 9).subscribe( result => {
      if (result.success) {
        this.toatr.success('La demande AT n° ' + this.id_dat + ' a été rejeté');
        const msg = 'Bonjour, c\'est avec un sincère regret que nous vous annonçons que votre demande ' +
          'd\'accident de travail a été rejeté. Votre' +
          ' numero de demande : ' + this.dat.id_dat ;
        const content = {
          expediteur: 'System',
          destinataire: this.dat.id_individu,
          titre: 'Demande AT (D.A.T)',
          message: msg,
          typeNotif: 'DAT',
          dateEnvoi: new Date()
        };
        this.notificationService.sendNotif(this.dat.id_individu, content).then(
          () => {
            this.toatr.success('Notification envoyé');
          },
          (err) => {
            this.toatr.error('Notification non envoyé');
          }
        );
      } else {
        this.toatr.error('Une erreur s\'est produite : ' + result.msg, 'erreur');
      }
    });
  }

  convoquer() {
        const msg = 'Bonjour, vous avez été convoqué à la cnaps pour une enquête pour votre ' +
          'demande AT n° ' + this.dat.id_dat + ', veuillez de vous munir de votre CIN, merci' ;
        const content = {
          expediteur: 'System',
          destinataire: this.dat.id_individu,
          titre: 'Demande AT (D.A.T)',
          message: msg,
          typeNotif: 'Dimm',
          dateEnvoi: new Date()
        };
        this.notificationService.sendNotif(this.dat.id_individu, content).then(
          () => {
            this.toatr.success('Convocation envoyé');
          },
          (err) => {
            this.toatr.error('Convocation non envoyé');
          }
        );
  }
  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
  pec() {
    let dataDemmande: any;
    dataDemmande = {
      idIndividu: this.dat.matricule,
      idEmpl: this.victime.id_empl
    };
    for ( const lib of this.libelle) {
      if (lib.id_type_info === 67) {
        dataDemmande.heureDat = lib.valeur;
      }
      if (lib.id_type_info === 66) {
        dataDemmande.dateDat = lib.valeur;
      }
      if (lib.id_type_info === 66) {
        dataDemmande.dateDat = lib.valeur;
      }
      if (lib.id_type_info === 68) {
        dataDemmande.lieuDat = lib.valeur;
      }
      if (lib.id_type_info === 73) {
        dataDemmande.circonstanceDat = lib.valeur;
      }
      if (lib.id_type_info === 75) {
        dataDemmande.centreSoinDat = lib.valeur;
      }

    }
    this.atmpOldService.demandeAt(dataDemmande).subscribe( result => {
      if (!result.success) {
        this.toatr.error( result.msg , 'Erreur lors du sauvegarde');
      }
    })
    this.atmpService.updateEtat(this.id_dat, 8).subscribe( result => {
      if (result.success) {
        this.toatr.success('La demande AT n° ' + this.id_dat + ' a été pris en charge');
        const msg = 'Bonjour, nous vous annonçons que votre demande ' +
          'd\'accident de travail a été pris en charge. Veuillez vous munir des pièces jointes que nous allons vous demander' +
          'dans un  brief délais. Merci. Votre' +
          ' numero de demande : ' + this.dat.id_dat ;
        const content = {
          expediteur: 'System',
          destinataire: this.dat.id_individu,
          titre: 'Demande AT (D.A.T)',
          message: msg,
          typeNotif: 'DAT',
          dateEnvoi: new Date()
        };
        this.notificationService.sendNotif(this.dat.id_individu, content).then(
          () => {
            this.toatr.success('Notification envoyé');
          },
          (err) => {
            this.toatr.error('Notification non envoyé');
          }
        );
      } else {
        this.toatr.error('Une erreur s\'est produite : ' + result.msg, 'erreur');
      }
    });
  }
  onPiece(href) {
    window.open(href);
  }

}
