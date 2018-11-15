import { Component, OnInit } from '@angular/core';
import { PenService} from '../../services/pension/pen.service';
import { ToastrService } from 'ngx-toastr';
import { InfoService} from '../../services/info/info.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-liste-demande-pen',
  templateUrl: './liste-demande-pen.component.html',
  styleUrls: ['./liste-demande-pen.component.css']
})
export class ListeDemandePenComponent implements OnInit {
  listeDemandes:any[];
  showMessage:boolean;
  titreDemande:string;
  statu:number;
  typePrestation:string;
  prestation:any;
  demandeListe:any;
  nombrePage:number;
  typeDemande:string;
  idPage:number;
  dataIndiv:any;
  show:boolean;
  listeEtatDoss:any[];

  constructor(
    public penService:PenService,
    private toastr: ToastrService,
    private infoService: InfoService,
    private routes: Router
  ) {
    this.titreDemande = null;
    this.prestation = {
      "ASVT":{
        "type":['311','319','320'],
        "titre":"Demande DLPR"
      },
      "REVE":{
        "type":['317','318'],
        "titre":"Demande Réversion"
      },
      "REVI":{
        "type":['335'],
        "titre":"Demande Révision"
      },
      "RAP":{
        "type":['331'],
        "titre":"Demande Rappel"
      }
    }
   }

  ngOnInit() {
    this.showMessage = true;
    this.listeDemandes = [];
    this.titreDemande = null;
    this.typePrestation = "ASVT";
    this.typeDemande = "ASVT";
    this.statu = 1;
    this.idPage = 1;
    this.show = true;
    this.nombrePage = 0;
    this.getListeDemandeAll(this.prestation.ASVT.type,4,1);
    this.changeCouleurPageBtnMenu(this.typeDemande);
    this.penService.getAllEtatDoss().subscribe(data => {
      if (data.success) {
        this.listeEtatDoss = data.msg;
      }
      else {
        this.toastr.error('Erreur: list Demande Pension ' + data.msg);
      }
    });
    //this.onClickChoisDemande("ASVT");
  }

  arrayOne(n: number): any[] {
    console.log(n);
    return Array(n);
  }


  getNombrePage(prestation:string[],type:number){
    const msg = {
      "prestation":prestation,
      "type_etat":type,
      "pagination": 1
    }
    console.log("getNombrePage");
    let nbr = 0;
    this.penService.getPageDemandePen(msg).subscribe(data => {
      if (data.success) {
        this.nombrePage = data.msg;
      }
      else {
        this.toastr.error('Erreur: list Demande Pension ' + data.msg);
      }
    });
  }

  getListeDemande(prestation:string,type:number,idPage:number){
    const msg = 	{
			"prestation":prestation,
			"type_etat":type,
			"pagination":idPage
    }
    
    this.penService.getListDemandePen(msg).subscribe(data => {
      if (data.success) {
        //this.listeDemande = data.msg;
        this.demandeListe = data.msg
        if(this.demandeListe==null){
          this.showMessage = false;
        }
      }
      else {
        this.toastr.error('Erreur: list Demande Pension ' + data.msg);
      }
    });
  }

  getListeDemandeAll(prestation:string[],type:number,idPage:number){
    this.show = true;
    const msg = 	{
			"prestation":prestation,
			"type_etat":type,
			"pagination":idPage
    }
    this.penService.getListDemandeTabPen(msg).subscribe(data => {
      if (data.success) {
        console.log("msg => ",data.msg);
        this.listeDemandes = data.msg;
        this.show = false;
        this.changeCouleurPage(idPage);
        if(this.listeDemandes==null || this.listeDemandes == undefined){
          this.showMessage = false;
        }
		this.getNombrePage(prestation,type);
      }
      else {
        this.toastr.error('Erreur: list Demande Pension ' + data.msg);
      }
    });
  }

  getInfoIndiv(matricul:string,i:any){
    this.infoService.infoIndiv(matricul).subscribe(data => {
      if (data.success) {

        this.dataIndiv = data.msg;
        this.listeDemandes[i].nom_individu = (this.dataIndiv.nom+" "+this.dataIndiv.prenom);
        console.log("Individu => ",this.dataIndiv);
      } else {
        setTimeout(() => this.toastr.error(data.msg));
      }
    });
  }

  onclickModale(){
    this.showMessage = true;
  }

  onClickChoisDemande(titre:string){
    this.titreDemande = this.prestation[titre].titre;
    this.typePrestation = titre;
    this.listeDemandes = [];
    this.nombrePage = 0;
    this.idPage = 1;
    this.changeCouleurPageBtnMenu(titre);
    this.getListeDemandeAll(this.prestation[titre]['type'],this.statu,1);
  }

  onChangeStatut(statu:any){
    this.statu = statu;
    this.nombrePage = 0;
    console.log("onChangeStatut => "+statu);
    this.getListeDemandeAll(this.prestation[this.typePrestation]['type'],statu,this.idPage);
  }

  changeCouleurPage(idPage:number){
    let elementUn = document.getElementById("id"+this.idPage);
    elementUn.classList.remove("active");
    let elementDeux = document.getElementById("id"+idPage);
    elementDeux.classList.add("active");
  }

  changeCouleurPageBtnMenu(titre){
    let elementUn = document.getElementById("id"+this.typeDemande);
    elementUn.classList.remove("add-color-nav-bar");
    let elementDeux = document.getElementById("id"+titre);
    elementDeux.classList.add("add-color-nav-bar");
    this.typeDemande = titre;
  }

  onClickPage(idPage:number){
    this.idPage = idPage;
    this.getListeDemandeAll(this.prestation[this.typePrestation]['type'],this.statu,this.idPage);
  }

  onclickSuivant(){
    this.idPage = this.idPage + 1;
    console.log("onclickSuivant =>"+this.idPage);
    if(this.nombrePage > this.idPage){
      this.onClickPage(this.idPage);
    }
  }

  onclickPresedent(){
    this.idPage = this.idPage - 1;
    console.log("onclickPresedent =>"+this.idPage);
    if(this.idPage > 1){
      this.onClickPage(this.idPage);
    }
  }

  onClickDetailPen(indice) {
    this.routes.navigate(['/detail-demande-pension/' + indice]);
  }
}
