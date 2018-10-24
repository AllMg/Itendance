import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {DynamicAtmpService} from '../../../services/atmp/dynamic-atmp/dynamic-atmp.service';
import {NotificationService} from '../../../services/notification/notification.service';

@Component({
  selector: 'app-prestation-choix',
  templateUrl: './prestation-choix.component.html',
  styleUrls: ['./prestation-choix.component.css']
})
export class PrestationChoixComponent implements OnInit {
  reference: string;
  prestation: number[];
  dat: any;
  constructor(
    private route: ActivatedRoute,
    private toatr: ToastrService,
    private atmpService: DynamicAtmpService,
    private notificationService: NotificationService) {
    this.prestation = [];
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.reference = params['id'];
      this.atmpService.getDemande(this.reference).subscribe( data => {
        if (data.success) {
          this.dat = data.msg;
        } else {
          setTimeout(() => this.toatr.warning(data.msg, 'chargement des données'));
        }
      });
    });
  }
  change($event) {
    console.log($event);
    if ($event.target.checked) {
      this.prestation.push(+$event.target.value);
    } else {
      const index = this.prestation.indexOf(+$event.target.value, 0);
      if (index > -1) {
        this.prestation.splice(index, 1);
      }
    }
  }
  save() {
    if (this.prestation.length === 0 ) {
      this.toatr.error('Aucune prestation n\'a été sélectionné');
    } else {
      this.atmpService.savePrestation(this.reference, this.prestation, 42).subscribe( result => {
        if ( result.success) {
          this.toatr.success('Les prestations ont été sauvegardé avec succes');
          for (let i = 0; i < this.prestation.length; i++) {
            this.atmpService.getPrestation(this.prestation[i].toString()).subscribe( name => {
              if (name.success) {
                const nameResult = name.msg.libelle;
                this.atmpService.piece(this.prestation[i]).subscribe( resultPiece => {
                  if (resultPiece.success) {
                    let msg = 'Bonjour, afin de continuer la traitement pour obtenir ' + nameResult + ', veuillez-vous munir des ' +
                      'pièces suivante : ';
                    for (let j = 0; j < resultPiece.msg.length; j++) {
                      msg = msg + resultPiece.msg[i].libelle + ', ';
                    }

                    const content = {
                      expediteur: 'System',
                      destinataire: this.dat.matricule,
                      titre: 'Demande AT (D.A.T)',
                      message: msg,
                      typeNotif: 'DAT',
                      dateEnvoi: new Date()
                    };
                    this.notificationService.sendNotif(this.dat.id_individu, content).then(
                      () => {
                        this.toatr.success('Notification envoyé');
                      },
                      (err) => {
                        this.toatr.error('Notification non envoyé');
                      }
                    );
                  }
                });
              }
            });
          }
        } else {
          this.toatr.error( result.msg);
        }
      });
    }
  }
}
