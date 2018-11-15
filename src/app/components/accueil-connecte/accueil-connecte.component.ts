import { Component, OnInit } from '@angular/core';
import { GeolocationService } from '../../services/geolocation/geolocation.service';
import { NotificationService } from '../../services/notification/notification.service';
import { DatePipe } from '@angular/common';
import { Toast, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-accueil-connecte',
  templateUrl: './accueil-connecte.component.html',
  styleUrls: ['./accueil-connecte.component.css']
})
export class AccueilConnecteComponent implements OnInit {

  estLoad: boolean = false;
  constructor(
    private geolocationService: GeolocationService,
    private notificationService: NotificationService,
    private datePipe: DatePipe,
    private toastr: ToastrService
  ) { }
  ngOnInit() {
    if (!this.estLoad) {
      this.onNotif();
    }
  }

  onNotif() {

    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.geolocationService.getPlace(position.coords.latitude, position.coords.longitude).subscribe(
          (res) => {
            const date = this.datePipe.transform(new Date(Date.now()), 'dd/MM/yyyy');
            const date1 = this.datePipe.transform(new Date(Date.now()), 'yyyy-MM-dd');
            const time = this.datePipe.transform(new Date(Date.now()), 'h:mm:ss');
            const msg = 'Votre compte CNaPS a été connecté à ' + res.results[2].formatted_address + ' le ' + date + ' à ' + time;
            const content = {
              expediteur: JSON.parse(localStorage.getItem('user')).id_acces,
              destinataire: JSON.parse(localStorage.getItem('user')).id_acces,
              titre: 'Avis de connexion',
              message: msg,
              typeNotif: '',
              dateEnvoi: date1
            }
            this.notificationService.sendNotif(JSON.parse(localStorage.getItem('user')).id_acces, content).then(
              () => {
                this.estLoad = true;
                this.toastr.success('Notification envoyé');
              },
              (err) => {
                this.toastr.error('Notification non envoyé');
              }
            );
          }
        );
      }
    );

  }

}
