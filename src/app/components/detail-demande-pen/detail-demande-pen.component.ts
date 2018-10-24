import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FileModel } from '../../models/file-model';
import { FileService } from '../../services/file/file.service';
import { PenService} from '../../services/pension/pen.service';
import { InfoService} from '../../services/info/info.service';

@Component({
  selector: 'app-detail-demande-pen',
  templateUrl: './detail-demande-pen.component.html',
  styleUrls: ['./detail-demande-pen.component.css']
})
export class DetailDemandePenComponent implements OnInit {
  show: boolean;
  show1: boolean;
  indice: any;
  fileQuery = new FileModel();
  piecesRec: any[];
  pensionClick:any;
  infoDemande:any;
  infoDemandeur:any;
  infoAyontDroit:any[];
  titre:string;
  constructor(
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private fileService: FileService,
    private routes: Router,
    private penService:PenService,
    private infoService:InfoService
  ) { }

  ngOnInit() {
    this.infoAyontDroit = [];
    this.show = true;
    this.show1 = true;
    this.route.params.subscribe((params: Params) => {
      this.pensionClick = params['indice'];
    });
    this.penService.getTypeDemande(this.pensionClick.substring(0, 3)).subscribe(data=>{
      if (data.success) {
        this.titre = data.msg.libelle;
      }
      else {
        this.show = false;
        this.toastr.error("Données inaccessibles.");
      }
    });
    this.penService.getDetailDemandePen(this.pensionClick).subscribe(data =>{
      if (data.success) {
        this.infoDemande = data.msg;
        this.fileQuery.id_files = this.infoDemande.accueilMod.id_acc;
        console.log("Data Message Result",this.infoDemande);
        this.fileService.readQuery(this.fileQuery).subscribe(data => {
          this.indice = 0;
          if (data.success) {
            this.piecesRec = data.msg;
            
            this.show = false;
            this.toastr.success("Données détails de la demande affichées avec succès.");
            this.getInfoIndivDemandeur(this.infoDemande.accueilMod.id_individu);
            this.getInfoIndivAyant(this.infoDemande.tecIndivAccMod);
            for(let i=0;i<this.piecesRec.length;i++){
              if(this.piecesRec[i].name.length < 4 && this.piecesRec[i].name!="-"){
                this.penService.getLibellePcs(this.piecesRec[i].name).subscribe(data=>{
                  if(data.success){
                    this.piecesRec[i].name = data.msg.libelle;
                  }
                  else{
                    this.toastr.error("Données inaccessibles Piéce.");
                  }
                });
              }
            }
            this.show = false;
          } else {
            this.show = false;
            setTimeout(() => this.toastr.warning(data.msg, 'Chargement des pièce jointe'));
          }
        });
      }
      else {
        this.show = false;
        this.toastr.error("Données inaccessibles.");
      }
    });
  }

  getInfoIndivDemandeur(matricul:string){
    this.infoService.infoIndiv(matricul).subscribe(data => {
      if (data.success) {
        console.log("getInfoIndivDemandeu Data => ",data.msg);
        this.infoDemandeur = data.msg.nom + " " + data.msg.prenoms;
      } else {
        setTimeout(() => this.toastr.error(data.msg));
      }
    });
  }

  getInfoIndivAyant(ayantDroit:any[]){
    console.log("Ayant Droit => ",ayantDroit);
    let that = this;
    if(ayantDroit.length > 0){
      for(let info of ayantDroit){
        if(info.individuType == "10"){
          this.infoService.infoIndiv(info.idIndividu).subscribe(data => {
            if (data.success) {
              console.log("InfoIndivAyant => ",data.msg);
              that.infoAyontDroit.push(data.msg);
            } else {
              setTimeout(() => this.toastr.error(data.msg));
            }
          });
        }
      }
    }
    console.log("SetInfoIndivAyant=> ",that.infoAyontDroit);
  }

  pieceNonConforme(){
    this.show1 = false;
    const msg = {
      "idacc":this.pensionClick,
      "etat":6
    };
    this.penService.changerEtatDemandePension(msg).subscribe(data => {
      if (data.success) {
        this.toastr.success("Pièce(s) non conforme");
        this.routes.navigate(['/liste-demande-pension']);
      }
      else{
        this.show1 = true;
        this.toastr.error("Pièce(s) non conforme incomplet");
      }
    });
  }

  rejeter(){
    this.show1 = false;
    const msg = {
      "idacc":this.pensionClick,
      "etat":5
    };
    this.penService.changerEtatDemandePension(msg).subscribe(data => {
      if (data.success) {
        this.toastr.success("Demande rejeter.");
        this.routes.navigate(['/liste-demande-pension']);
      }
      else{
        this.show1 = true;
        this.toastr.error("Traitement incomplet");
      }
    });
  }

  valider(){
    this.show1 = false;
    const msg = {
      "idacc":this.pensionClick,
      "etat":1
    };
    this.penService.changerEtatDemandePension(msg).subscribe(data=>{
      if (data.success) {
        this.toastr.success("Demande valider.");
        this.routes.navigate(['/liste-demande-pension']);
      }
      else{
        this.show1 = true;
        this.toastr.error("Validation incomplet");
      }
    });
  }

  onClickPiece(urlPiece:any){
    window.open(urlPiece);
  }

}
