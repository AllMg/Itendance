import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import {DatePipe} from '@angular/common';
import {GeolocationService} from '../../services/geolocation/geolocation.service';
import {NotificationService} from '../../services/notification/notification.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {

  identifiant: String;
  pass: String;
  agent: String;
  public show: boolean;
  message: String;
  isAuth: boolean;
  constructor(
    private router: Router,
    private authService: AuthService,
    private routes: Router,
    private toastr: ToastrService,
    private geolocationService: GeolocationService,
    private notificationService: NotificationService,
    private datePipe: DatePipe
  ) {
    this.show = false;
  }

  ngOnInit() {
  }

  onLoginCLick() {
    this.show = true;
    this.isAuth = false;
    this.message = '';
    if (!this.agent) {
        this.agent = undefined;
    }
    const acces = {
      matricule: this.identifiant,
      pass: this.pass,
      agent: this.agent
    };
    this.authService.authenticate(acces).subscribe(data => {
      if (data.success === true) {
        this.show = false;
        this.isAuth = true;
        const idAcces = JSON.parse(data.data);
        this.authService.storeUserData(data.token, idAcces);
        this.pass = '';
        document.getElementById('close').click();
        this.toastr.success('Connexion réussie');
        // location.reload();

        this.router.navigate(['/accueil-connecte']);
      } else {
        this.show = false;
        this.message = 'Connexion refusée / ' + data.msg;
        this.isAuth = false;
      }
    });
  }
  onClickDimm(){
    document.getElementById('exampleModal').click();
    this.routes.navigate(['/dimm']);
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
              referenceNotif: 'Connexion',
              message: msg,
              typeNotif: '',
              dateEnvoi: date1
            }
            this.notificationService.sendNotif(JSON.parse(localStorage.getItem('user')).id_acces, content).then(
              () => {
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
