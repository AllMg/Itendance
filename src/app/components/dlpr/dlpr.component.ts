import { Component, OnInit,Input } from '@angular/core';
import { DlprService } from '../../services/dlpr/dlpr.service';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { IjService } from '../../services/ij/ij.service';
import { Router } from '@angular/router';
import { FileService } from '../../services/file/file.service';
@Component({
  selector: 'app-dlpr',
  templateUrl: './dlpr.component.html',
  styleUrls: ['./dlpr.component.css']
})
export class DlprComponent implements OnInit {

  public show: boolean;
  public refdlpr: string;
  public user: any;
  public individu:any;
  public adresseIndividu :any;
  
 
  libelle: any[];
  pieces: any[];
  pieceValue: any[];
  entity : any;
  refRec: any;
  infoRec: any[];
  piecesRec: any[];
  
  newDemande: any[];

  constructor(
  
    private ijService : IjService,
    private datePipe: DatePipe,
    private DlprService: DlprService,
    private toastr: ToastrService,
    private routes: Router,
	private fileservice : FileService
    ) {
   
    this.show=false;
  }

  ngOnInit() {
  	this.user = JSON.parse(localStorage.getItem('user'));
    this.entity = this.user.type_entite;

    console.log(this.user);

  	this.pieceValue = [];
   //reference ij
    const ref = {
      "prestation": 311,
      "dr": "42"
    }
    this.ijService.getRefIj(ref).subscribe(data => {
      if (data.success) {
        this.refRec = data.msg;
      }
      else {
        this.toastr.error('Erreur reference ij :' + data.msg);
      }
    });
    this.DlprService.piecesDlprReq("311").subscribe(data => {
      if (data.success) {
           this.pieces=data.msg;
       }
      else {
        this.toastr.error('Erreur: list Piece Requis DLPR' + data.msg);
      }
    });
    


  }
   valider() {
    
  
       //Date aujourd'hui
       const dateToday = this.datePipe.transform(new Date(Date.now()), 'yyyy-MM-dd');
       //Donnée pour l'ajout

        const vaccmod=[{
             idAcc: this.refRec,
             idIndividu: this.user.id_acces,
             individuType: "6"
           },{
            idAcc: this.refRec,
            idIndividu: this.user.id_acces,
            individuType: "8"
          }];

      /* const data = 
         { 
         "accueilMod": {
           "id_acc": this.refRec,
           "id_empl": "",
           "id_individu":this.user.id_acces,
           "id_succursale": null,
           "id_tec_dmd": "311",
           "num_doss": null,
           "date_dossier": dateToday
         },
         "tecInfoRecuMod": [],
         "tecPcsRecMod": this.piecesRec,
         "tecIndivAccMod": vaccmod
       
       };*/
       const data =  {"data":{
        "accueilMod":
        {
                "id_acc":this.refRec,
                "id_empl":null,
                "id_individu":this.user.id_acces,
                "id_succursale":null,
                "id_tec_dmd":"311",
                "num_doss":"",
                "date_dossier":dateToday
        },
        "tecInfoRecuMod":[],
        "tecPcsRecMod": [],
        "tecIndivAccMod":vaccmod
}};

      console.log(data);

       //Insertion demande
       this.DlprService.SaveDlpr(data).subscribe(data => {
         if (data.success) {
          this.toastr.success("Votre demande a été pris en charge.");
          for (let i = 0; i < this.pieceValue.length; i++) {
             this.fileservice.save(this.pieceValue[i]).subscribe(fileResponse => {
               if (fileResponse.success) {
                 this.toastr.success("Fichier"+this.pieceValue[i].name+"enregistré avec succès");
                 this.show = false;
                 this.routes.navigate(['/accueil-connecte']);
               } else {
                 this.toastr.error("Erreur enregistrement de(s) fichie(s).");
                 this.show = false;
                 this.routes.navigate(['/dlpr']);
               }
             });
           }
           this.show = true;
         
         }
         else {
           this.toastr.error("Erreur de la demande.");
           this.show = false;
           this.routes.navigate(['/dlpr']);
         }
       });
   /*}
   else
   {
   	this.toastr.error("Pièce requis  Incomplete");
   }*/
  }

  onFileChange($event, indice) {
    console.log($event);
    this.readThis($event.target, indice);
  }
  readThis(inputValue: any, indice): void {
    const file: File = inputValue.files[0];
    const myReader: FileReader = new FileReader();
    myReader.readAsDataURL(file);
    myReader.onloadend = (e) => {
      this.pieceValue[indice] = {
        id_files: this.refRec,
        file: myReader.result,
        serviceName: "Demande de Liquidation pension Retraite",
        name: this.pieces[indice].libelle
      };
    };
  }
  
}


