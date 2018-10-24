import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { IjService } from '../../services/ij/ij.service';
import { IndividuService } from '../../services/individu/individu.service';
import { IjPfService } from '../../services/ij-pf/ij-pf.service';
import { EmployeurService } from '../../services/employeur/employeur.service';
import { AdresseService } from '../../services/adresse/adresse.service';
import { OpService } from '../../services/op/op.service';

@Component({
  selector: 'app-decompte',
  templateUrl: './decompte.component.html',
  styleUrls: ['./decompte.component.css']
})
export class DecompteComponent implements OnInit {
  idDmdIJ: string;
  dmdIJ: any;
  decompte: any;
  employeur: any;
  individu: any;
  dateNow: any;
  adresseIndividu: any;
  idop: string;

  constructor(
    private route: ActivatedRoute,
    private ijService: IjService,
    private ijpfService: IjPfService,
    private indivService: IndividuService,
    private employeurService: EmployeurService,
    private adresseService: AdresseService,
    private opService: OpService
  ) { }

  ngOnInit() {
    this.dateNow = new Date();
    console.log("dateNow", this.dateNow)

    this.route.params.subscribe((params: Params) => {
      this.idop = params['id'];

      this.opService.findById(this.idop).subscribe(data => {
        if (data.success) {
          console.log(this.idop)
          this.idDmdIJ = data.msg.id_acc;
          console.log("iddmdij",this.idDmdIJ)
          this.ijService.decompteIj(this.idDmdIJ).subscribe(data => {
            if (data.success) {
              this.decompte = data.msg;
              this.decompte.salaire = parseFloat(this.decompte.salaire).toFixed(2);
              this.decompte.demisalaire = parseFloat(this.decompte.demisalaire).toFixed(2);
              this.decompte.ij1 = parseFloat(this.decompte.ij1).toFixed(2);
              this.decompte.postnatale = parseFloat(this.decompte.postnatale).toFixed(2);
              this.decompte.prenatale = parseFloat(this.decompte.prenatale).toFixed(2);
              console.log('decompte', this.decompte)
            } else {
              alert('error get decompte');
            }
          });

          this.ijpfService.getDemandeIj(this.idDmdIJ).subscribe(data => {
            if (data.success) {
              this.dmdIJ = data.msg;
              console.log(this.dmdIJ)
              this.adresseService.infoAdresse(this.dmdIJ.id_individu).subscribe(data => {
                if (data.success) {
                  this.adresseIndividu = data.msg[0];
                } else {
                  alert('adresse indiv decompte error')
                }
              });

              this.indivService.infoIndiv(this.dmdIJ.id_individu).subscribe(data => {
                if (data.success) {
                  this.individu = data.msg;
                } else {
                  alert('error get indiv decompte');
                }
              });

              this.employeurService.infoEmployeur(this.dmdIJ.id_empl).subscribe(data => {
                if (data.success) {
                  this.employeur = data.msg.employeur_matricule;
                } else {
                  alert('error get employeur decompte');
                }
              });
            } else {
              alert('error get demande ij');
            }
          });
        } else {
          alert('error findbyid op');
        }
      });
    });
  }
}
