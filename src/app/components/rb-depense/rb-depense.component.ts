import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BudgetService } from '../../services/budget/budget.service';
import { RbService } from '../../services/rb/rb.service';
import * as XLSX from 'xlsx';

declare var $: any;

@Component({
  selector: 'app-rb-depense',
  templateUrl: './rb-depense.component.html',
  styleUrls: ['./rb-depense.component.css']
})
export class RbDepenseComponent implements OnInit {

  @ViewChild('modalChargement') modalChargement;
  @ViewChild('modalMessageImport') modalMessageImport;

  Menu = {
    menu: "inventaire",
    sousMenu: ""
  };

  Import = {
    fichier: "Parcourir mon ordinateur",
    liste: [],
    nbTraiteAuto: 0,
    nbNonTraiteAuto: 0,
    format: ["Compte", "Cheque", "Date", "Valeur", "Libelle1", "Libelle2", "Montant", "Ref"],
    afficheErreur: false
  };

  constructor(
    private router: Router,
    private toast: ToastrService,
    private budgetService: BudgetService,
    private rbService: RbService) { }

  ngOnInit() {
  }

  clickInMenu1(lien: string) {
    this.router.navigate(['/' + lien]);
  }

  clickSousMenu(nom: string) {
    this.Menu.sousMenu = nom;
  }

  /*fichierChange($event) {
    this.afficheChargement();
    let fichier = $event.target.files[0];
    let fileReader = new FileReader();
    fileReader.onload = (e: any) => {
      let donnees = e.target.result;
      let workBook: XLSX.WorkBook = XLSX.read(donnees, { type: 'binary' });
      let feuille = workBook.SheetNames[0];
      let workSheet: XLSX.WorkSheet = workBook.Sheets[feuille];
      let liste = XLSX.utils.sheet_to_json(workSheet, { raw: true });
      if (liste.length > 0) {
        if (this.bonFormatDeDonnees(liste[0])) {
          this.Import.liste = liste;
        }
        else {
          this.Import.liste = [];
        }
      }
      this.fermeChargement();
    };
    fileReader.onerror = () => {
      this.toast.error("Lecture du fichier impossible");
      this.fermeChargement();
    };
    fileReader.readAsBinaryString(fichier);
    this.Import.fichier = fichier.name;
  }

  bonFormatDeDonnees(element) {
    let attr = [];
    for (let att in element) {
      attr.push(att);
    }
    if (attr.length != this.Import.format.length) {
      this.Import.afficheErreur = true;
      this.ouvreMessageImport();
      return false;
    }
    let nbOk = 0;
    for (let format of this.Import.format) {
      for (let att of attr) {
        if (att == format) {
          nbOk++;
        }
      }
    }
    if (nbOk == this.Import.format.length) {
      return true;
    }
    else {
      this.Import.afficheErreur = true;
      this.ouvreMessageImport();
      return false;
    }
  }*/

  ouvreMessageImport() {
    $(this.modalMessageImport.nativeElement).modal('show');
  }

  fermeMessageImport() {
    $(this.modalMessageImport.nativeElement).modal('hide');
  }

  afficheChargement() {
    $(this.modalChargement.nativeElement).modal("show");
  }

  fermeChargement() {
    $(this.modalChargement.nativeElement).modal('hide');
  }

}
