import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TransfertCotisationService } from '../../../services/transfert-cotisation/transfert-cotisation.service';
import { ToastrService } from 'ngx-toastr';
import { FileService } from '../../../services/file/file.service';
import { FileModel } from '../../../models/file-model';

@Component({
    selector: 'app-details-trans-cot-pieces',
    templateUrl: './details-trans-cot-pieces.component.html',
    styleUrls: ['./details-trans-cot-pieces.component.css']
})
export class DetailsTransCotPiecesComponent implements OnInit {

    matriculeClick: any;
    dataTransfert: any;
    libelle: any[];
    pieces: any[];
    pieceValue: FileModel[];
    show: boolean;
    show1: boolean;
    showLib: boolean;
    showRef: boolean;
    showPie: boolean;

    constructor(
        private route: ActivatedRoute,
        private transfertCotisationService: TransfertCotisationService,
        private toastr: ToastrService,
        private fileService: FileService,
        private routes: Router
    ) {
        this.show = false;
        this.show1 = false;
    }

    ngOnInit() {
        this.pieceValue = [];
        this.route.params.subscribe((params: Params) => {
            this.matriculeClick = params['matricule'];
        });
        //PIECES DE LA DEMANDE
        this.transfertCotisationService.piecesDemandeTransfertCotisation().subscribe(data => {
            if (data.success) {
                this.pieces = data.msg;
                this.toastr.success("Liste pièces affichée avec succès.");
            }
            else {
                this.toastr.error("Liste pièces indisponible.");
            }
        });
        this.transfertCotisationService.controleTransfert(this.matriculeClick).subscribe(data => {
            if (data.success) {
                this.dataTransfert = data.msg;
                this.toastr.success("Données affichées avec succès.");
            }
            else {
                this.toastr.error("Erreur de la récupération des données.");
            }
        });
    }

    //Valider les pièces
    valider() {
        this.show = true;
        this.show1 = true;
        const msg = {
            "etat": "1",
            "idacc": this.dataTransfert.dossier.accueilMod.id_acc
        };
        this.transfertCotisationService.updateEtatDemandeTransfert(msg).subscribe(data => {
            if (data.success) {
                this.show = false;
                for (let i = 0; i < this.pieceValue.length; i++) {
                    //Insertion fichier mongo
                    const condition = {
                        "id_files": this.dataTransfert.dossier.accueilMod.id_acc,
                        "name": this.pieces[i].libelle
                    };
                    this.fileService.updateFile(condition, this.pieceValue[i]).subscribe(fileResponse => {
                        if (fileResponse.success) {
                            this.toastr.success("Pièces en cours de vérification.");
                            this.show1 = false;
                            this.routes.navigate(['/accueil-connecte']);
                        } else {
                            this.toastr.error("Erreur enregistrement fichiers.");
                            this.show1 = false;
                        }
                    });
                }
            }
            else {
                this.toastr.error("Erreur changement état.");
                this.show = false;
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
            this.pieceValue[indice].id_files = this.dataTransfert.dossier.accueilMod.id_acc;
            this.pieceValue[indice].file = myReader.result.toString();
            this.pieceValue[indice].serviceName = "Demande de transfert de cotisation";
            this.pieceValue[indice].name = this.pieces[indice].libelle
        };
    }

}
