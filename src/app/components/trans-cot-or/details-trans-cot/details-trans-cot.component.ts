import { Component, OnInit } from '@angular/core';
import { TransfertCotisationService } from '../../../services/transfert-cotisation/transfert-cotisation.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FileModel } from '../../../models/file-model';
import { FileService } from '../../../services/file/file.service';
import { InfoService } from '../../../services/info/info.service';

@Component({
  selector: 'app-details-trans-cot',
  templateUrl: './details-trans-cot.component.html',
  styleUrls: ['./details-trans-cot.component.css']
})
export class DetailsTransCotComponent implements OnInit {

  dataTransfert: any;
  dataTransfertDN: any[];
  transfertClick: any;
  matriculeClick: any;
  etatClick: any;
  piecesRec: any[];
  fileQuery = new FileModel();
  idacc: any;
  show: boolean;
  showBtn: boolean;
  showBtnPiece: boolean;
  showBtnRejet: boolean;
  showBtnValid: boolean;
  dataUser: any;

  constructor(
    private transfertCotisationService: TransfertCotisationService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private fileService: FileService,
    private routes: Router,
    private infoService: InfoService
  ) {
    this.show = false;
    this.showBtn = false;
    this.showBtnPiece = false;
    this.showBtnRejet = false;
    this.showBtnValid = false;
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.transfertClick = params['idacc'];
      this.etatClick = params['etat'];
      this.matriculeClick = params['matricule'];
    });

    //Condition bouttons par rapport à l'état
    if (this.etatClick == 1) {
      this.showBtnPiece = true;
      this.showBtnRejet = true;
      this.showBtnValid = true;
    }
    if (this.etatClick == 2) {
      this.showBtnValid = true;
      this.showBtnPiece = true;
    }
    if (this.etatClick == 6) {
      this.showBtnValid = true;
      this.showBtnRejet = true;
    }

    //Données pièces reçues demande transfert
    this.fileQuery.id_files = this.transfertClick;
    this.fileService.readQuery(this.fileQuery).subscribe(dataMongo => {
      if (dataMongo.success) {
        this.piecesRec = dataMongo.msg;
      }
      else {
        setTimeout(() => this.toastr.error("Données pièces reçues indisponible."));
      }
    });
    //Données individu demande de transfert
    this.infoService.infoIndiv(this.matriculeClick).subscribe(dataInfo => {
      if (dataInfo.success) {
        this.dataUser = dataInfo.msg;
      }
      else {
        setTimeout(() => this.toastr.error("Données informations individu indisponible."));
      }
    });
    // Données détails info reçues demande transfert
    this.transfertCotisationService.detailTransfertCotisation(this.transfertClick).subscribe(data => {
      if (data.success) {
        this.dataTransfert = data.msg;
        //Données détails demande transfert via DN
        this.transfertCotisationService.detailTransfertCotisationDN(data.key).subscribe(dataDn => {
          if (dataDn.success) {
            this.dataTransfertDN = dataDn.msg;
          }
          else {
            setTimeout(() => this.toastr.error("Données détails DN indisponible."));
          }
        });
      }
      else {
        setTimeout(() => this.toastr.error("Données informations reçues indisponible."));
      }
    });
  }

  pieceNonConforme() {
    this.showBtn = true;
    const msg = {
      "etat": "6",
      "idacc": this.transfertClick
    };
    this.transfertCotisationService.updateEtatDemandeTransfert(msg).subscribe(data => {
      if (data.success) {
        this.toastr.success("Pièce(s) non conforme.");
        this.routes.navigate(['/liste-transfert-cotisation']);
      }
      else{
        this.toastr.error("Erreur.");
      }
    });
  }

  rejeter() {
    this.showBtn = true;
    const msg = {
      "etat": "2",
      "idacc": this.transfertClick
    };
    this.transfertCotisationService.updateEtatDemandeTransfert(msg).subscribe(data => {
      if (data.success) {
        this.toastr.success("Demande rejetée.");
        this.routes.navigate(['/liste-transfert-cotisation']);
      }
      else{
        this.toastr.error("Erreur.");
      }
    });
  }

  valider() {
    this.showBtn = true;
    const msg = {
      "etat": "3",
      "idacc": this.transfertClick
    };
    this.transfertCotisationService.updateEtatDemandeTransfert(msg).subscribe(data => {
      if (data.success) {
        this.toastr.success("Demande validée.");
        this.routes.navigate(['/liste-transfert-cotisation']);
      }
      else{
        this.toastr.error("Erreur de la validation.");
      }
    });
  }
}
