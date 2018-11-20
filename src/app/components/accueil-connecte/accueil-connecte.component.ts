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

  estLoad = false;
  constructor(
    private geolocationService: GeolocationService,
    private notificationService: NotificationService,
    private datePipe: DatePipe,
    private toastr: ToastrService
  ) { }
  ngOnInit() {
    if (!this.estLoad) {
     /* this.onNotif();*/
    }
  }

}
