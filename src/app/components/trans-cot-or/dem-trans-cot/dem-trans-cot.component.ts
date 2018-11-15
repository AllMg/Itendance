import { Component, OnInit } from '@angular/core';
import { TransfertCotisationService } from '../../../services/transfert-cotisation/transfert-cotisation.service';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { FileService } from '../../../services/file/file.service';
import { GeolocationService } from '../../../services/geolocation/geolocation.service';
import { NotificationService } from '../../../services/notification/notification.service';
import { Router } from '@angular/router';
import { FileModel } from '../../../models/file-model';

@Component({
  selector: 'app-dem-trans-cot',
  templateUrl: './dem-trans-cot.component.html',
  styleUrls: ['./dem-trans-cot.component.css']
})
export class DemTransCotComponent implements OnInit {

  public show: boolean;
  public showRef: boolean;
  public showLib: boolean;
  public showPie: boolean;
  private user: any;

  ref: any;
  libelle: any[];
  pieces: any[];
  pieceValue: FileModel[];

  infoRec: any[];
  piecesRec: any[];

  newDemande: any[];

  constructor(
    private transfertCotisationService: TransfertCotisationService,
    private toatr: ToastrService,
    private datePipe: DatePipe,
    private fileService: FileService,
    private geolocationService: GeolocationService,
    private notificationService: NotificationService,
    private toastr: ToastrService,
    private routes: Router,
  ) {
    this.show = false;
    this.showRef = false;
    this.showLib = false;
    this.showPie = false;
  }

  ngOnInit() {
    this.showRef = true;
    this.showLib = true;
    this.showPie = true;
    this.pieceValue = [];
    this.user = JSON.parse(localStorage.getItem('user'));
    //REFERENCE DE LA DEMANDE
    this.transfertCotisationService.referenceDemandeTransfertCotisation().subscribe(data => {
      if (data.success) {
        this.ref = data.msg;
        this.showRef = false;
        this.toastr.success("Référence de la demande affichée avec succès.");
      }
    });
    //LIBELLES DE LA DEMANDE
    this.transfertCotisationService.libelleDemandeTransfertCotisation().subscribe(data => {
      if (data.success) {
        this.libelle = data.msg;
        this.showLib = false;
        this.toastr.success("Liste libellés affichée avec succès.");
      }
    });
    //PIECES DE LA DEMANDE
    this.transfertCotisationService.piecesDemandeTransfertCotisation().subscribe(data => {
      if (data.success) {
        this.pieces = data.msg;
        this.showPie = false;
        this.toastr.success("Liste pièces affichée avec succès.");
      }
    });
  }

  valider() {
    this.show = true;
    this.infoRec = [];
    this.piecesRec = [];
    for (let i = 0; i < this.libelle.length; i++) {
      this.infoRec.push({
        id_type_info: this.libelle[i].id_type_info,
        valeur: this.libelle[i].value,
        id_recu: "",
        id_acc: this.ref
      });
    }
    for (let i = 0; i < this.pieces.length; i++) {
      this.piecesRec.push({
        id_acc: this.ref,
        id_piece: this.pieces[i].id_piece,
        liens_fichier: this.pieces[i].value
      });
    }
    //Date aujourd'hui
    const dateToday = this.datePipe.transform(new Date(Date.now()), 'yyyy-MM-dd');
    //Donnée pour l'ajout
    const msg = {
      "accueilMod": {
        "id_acc": this.ref,
        "id_empl": "",
        "id_individu": this.user.id_acces,
        "id_succursale": null,
        "id_tec_dmd": "351",
        "num_doss": null,
        "date_dossier": dateToday
      },
      "tecInfoRecuMod": this.infoRec,
      "tecPcsRecMod": this.piecesRec
    };

    //Insertion demande
    this.transfertCotisationService.ajoutDemandeTransfertCotisation(msg).subscribe(data => {
      if (data.success) {
        for (let i = 0; i < this.pieceValue.length; i++) {
          //Insertion fichier mongo
          this.fileService.save(this.pieceValue[i]).subscribe(fileResponse => {
            if (fileResponse.success) {
              this.toatr.success("Votre demande a été pris en charge.");
              this.show = false;
              this.routes.navigate(['/accueil-connecte']);
            } else {
              this.toatr.error("Erreur enregistrement fichiers.");
              this.show = false;
              this.routes.navigate(['/demande-transfert-cotisation']);
            }
          });
        }
      }
      else {
        this.toatr.error("Erreur enregistrement informations.");
        this.show = false;
        this.routes.navigate(['/demande-transfert-cotisation']);
      }
    });
  }

  onFileChange($event, indice) {
    this.readThis($event.target, indice);
  }
  readThis(inputValue: any, indice): void {
    const file: File = inputValue.files[0];
    const myReader: FileReader = new FileReader();
    myReader.readAsDataURL(file);
    myReader.onloadend = (e) => {
      this.pieceValue[indice] = new FileModel();
      this.pieceValue[indice].id_files = this.ref;
      this.pieceValue[indice].file = myReader.result.toString();
      this.pieceValue[indice].serviceName = "Demande de transfert de cotisation";
      this.pieceValue[indice].name = this.pieces[indice].libelle
    };
  }
  onNotif() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.geolocationService.getPlace(position.coords.latitude, position.coords.longitude).subscribe(
          (res) => {
            const date = this.datePipe.transform(new Date(Date.now()), 'dd/MM/yyyy');
            const date1 = this.datePipe.transform(new Date(Date.now()), 'yyyy-MM-dd');
            const time = this.datePipe.transform(new Date(Date.now()), 'h:mm:ss');
            const msg = ' Nouvelle demande de transfert de cotisation le ' + date + ' à ' + time;
            const content = {
              expediteur: JSON.parse(localStorage.getItem('user')).id_acces,
              destinataire: JSON.parse(localStorage.getItem('user')).id_acces,
              titre: 'Demande de transfert de cotisation',
              message: msg,
              typeNotif: '',
              dateEnvoi: date1
            }
            this.notificationService.sendNotif(JSON.parse(localStorage.getItem('user')).id_acces, content).then(
              () => {
                this.toastr.success('Notification demande de transfert de cotisation envoyé');
              },
              (err) => {
                this.toastr.error('Notification demande de transfert de cotisation non envoyé');
              }
            );
          }
        );
      }
    );
  }
}
