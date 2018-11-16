import { Component, OnInit } from '@angular/core';
import {DirectionService} from '../../services/direction/direction.service';
import {IndividuService} from '../../services/individu/individu.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-info-agents',
  templateUrl: './info-agents.component.html',
  styleUrls: ['./info-agents.component.css']
})
export class InfoAgentsComponent implements OnInit {
  user: any;
  indiv: any;
  constructor(private directionService: DirectionService,
              private individu: IndividuService,
              private toatr: ToastrService) { }

  ngOnInit() {
    this.infoAgent();
  }

  infoAgent() {
    const user = JSON.parse(localStorage.getItem('user'));
    this.individu.infoIndiv(user.id_acces).subscribe((data) => {
        if (data.success) {
          this.indiv = data.msg;
          /*this.user = {
            id: indiv.id_individu,
            nom: indiv.nom,
            prenom: indiv.prenoms
          }*/
          this.directionService.infoDirection(user.id_acces).subscribe((res) => {
            if (res.success) {
              const agent = res.msg;
              this.user = {
                id: this.indiv.id_individu,
                nom: this.indiv.nom,
                prenom: this.indiv.prenoms,
                service: agent[0].code_service.libelle_service,
                direction: agent[0].code_direction.libelle_direction
              };
              console.log(this.user);
            } else {
              setTimeout( () => this.toatr.error(res.msg));
            }
          }
          );
        } else {
          setTimeout( () => this.toatr.error(data.msg));
        }
      }
    );
  }

}
