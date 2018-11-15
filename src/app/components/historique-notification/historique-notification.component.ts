import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../services/notification/notification.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-historique-notification',
  templateUrl: './historique-notification.component.html',
  styleUrls: ['./historique-notification.component.css']
})
export class HistoriqueNotificationComponent implements OnInit {

  private user: any;
  histoNofit: any;
  constructor(private notifService: NotificationService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.detailsNotif(this.route.snapshot.params['id']);

  }

  detailsNotif(id) {
    this.notifService.detailsNotif(id).subscribe(
      (dataRes) => {
        this.histoNofit = dataRes.msg;
        console.log(this.histoNofit);
      }
    );
  }

}
