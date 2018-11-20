import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {MouvementService} from '../../../../services/rh/mouvement.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-liste-recrutement',
  templateUrl: './liste-mouvement-recrutement.component.html',
  styleUrls: ['./liste-mouvement-recrutement.component.css']
})
export class ListeMouvementRecrutementComponent implements OnInit {
  show = false;
  demandes: any[];
  type: any;
  type_value: string;
  id_etat: number;
  title =  'none';
  etat: any[];
  link: string;
  constructor(
    private route: ActivatedRoute,
    private activatedRoute: ActivatedRoute,
    private mouvementService: MouvementService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    this.initData();
  }
  initData() {
    this.show = true;
    this.mouvementService.getAllEtat().subscribe( res => {
      if (res.success) {
        this.etat = res.msg;
      } else {
        this.toastr.error( res.msg);
      }
    });
    this.route.queryParams.subscribe(queryParams => {
      this.id_etat = +queryParams['etat'];
      if (!this.id_etat) {
        this.id_etat = 0;
      }
      this.route.params.subscribe((params: Params) => {
        this.type_value = params['type'];
        this.mouvementService.getType(this.type_value).subscribe( res => {
          this.mouvementService.getMouvement(this.type_value, this.id_etat).subscribe( resMouvement => {
            this.show = false;
            if (resMouvement.success) {
              this.demandes = resMouvement.msg;
              console.log(this.demandes);
              const size = this.demandes.length;
              for (let i = 0; i < size; i++) {
                this.demandes[i].etat = this.etat[this.demandes[i].idetat - 1].libelle;
                this.demandes[i].datedemande = new Date(this.demandes[i].datedemande);
              }
            } else {
              this.toastr.error(resMouvement.msg);
            }
          });
          if (res.success) {
            this.title = res.msg.libelle;
          } else {
            this.toastr.error(res.msg);
          }
        });
      });
    });
  }
  redirect() {
    this.router.navigate(
      [],
      { queryParams: { etat: this.id_etat} }
    );
  }

}
