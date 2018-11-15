import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import {GeolocationService} from '../../services/geolocation/geolocation.service';
import {DatePipe} from '@angular/common';
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
        document.getElementById('exampleModal').click();
        this.toastr.success('Connexion réussie');
        location.reload();
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
}
