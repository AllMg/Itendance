import { Injectable } from '@angular/core';
import { AdresseService } from '../adresse/adresse.service';
import { Globals } from '../Global';
import { Headers, Http } from '@angular/http';
import { GeolocationService } from '../geolocation/geolocation.service';
import { ToastrService } from 'ngx-toastr';
import { getMatIconFailedToSanitizeError } from '@angular/material';

@Injectable()
export class NotificationService {

  host: string = this.global.host;

  constructor(private http: Http,
    private global: Globals,
    private adresse: AdresseService,
    private adresseService: AdresseService) { }

  sendSMS(content: any) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const sms = {
      numero: content.numero,
      message: content.message
    };
    return this.http.post(this.host + 'notification/sendSMS', sms, { headers: headers })
      .map(res => res.json());
  }

  sendEmail(content: any) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const email = {
      email: content.email,
      subject: content.subject,
      message: content.message
    };
    return this.http.post(this.host + 'notification/sendEmail', email, { headers: headers })
      .map(res => res.json());
  }

  addNotif(content: any) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const data = {
      expediteur: content.expediteur,
      destinataire: content.destinataire,
      referenceNotif: content.referenceNotif,
      titre: content.titre,
      message: content.message,
      typeNotif: content.typeNotif,
      dateEnvoi: content.dateEnvoi
    };
    return this.http.post(this.host + 'notification/ajoutNotif', data, { headers: headers })
      .map(res => res.json());
  }

  listeNotif(destinataire) {
    const headers = new Headers();
    const data = {
      data: destinataire
    };
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + 'notification/listNotif', data, { headers: headers })
      .map(res => res.json());
  }


  detailsNotif(id) {
    const headers = new Headers();
    const data = {
      data: id
    };
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + 'notification/detailsNotif', data, { headers: headers })
      .map(res => res.json());
  }

  sendNotif(id: string, content: any) {
    return new Promise(
      (resolve, reject) => {
        this.adresseService.infoAdresse(id).subscribe(
          (adr) => {
            const adress = adr.msg;
            // adress[0].adresse_e_mail et adress[0].adresse_telephone;
            const sms = {
              // numero: '0342656574',
              // numero: '0340392296',
               numero: '0349759678',
              // numero: '0341536309',
              message: content.message
            };
            this.sendSMS(sms).subscribe(
              (ms) => {
                console.log(ms);
              }
            );
            const emailMsg = {
              // email: 'ranaivosonhajatiana@gmail.com',
              // email: 'ginonandry@gmail.com',
               email: 'diary.rasolofomanana@gmail.com',
              // email: 'niavosanda@gmail.com',
              subject: content.titre,
              message: content.message
            };
            this.sendEmail(emailMsg).subscribe(
              (mss) => {
                console.log(mss);
              }
            );
            this.addNotif(content).subscribe(
              (res) => {
                console.log(res);
              });
            resolve(true);
          }
        );
      }
    );
  }

  envoyerNotification(id: string, content: any, num: string, mail: string) {
    return new Promise(
      (resolve, reject) => {
        this.adresseService.infoAdresse(id).subscribe(
          (adr) => {
            const adress = adr.msg;
            const sms = {
              numero: num,
              message: content.message
            };
            this.sendSMS(sms).subscribe(
              (ms) => {
                console.log(ms);
              }
            );
            const emailMsg = {
              email: mail,
              subject: content.titre,
              message: content.message
            };
            this.sendEmail(emailMsg).subscribe(
              (mss) => {
                console.log(mss);
              }
            );
            this.addNotif(content).subscribe(
              (res) => {
                console.log(res);
              });
            resolve(true);
          }
        );
      }
    );
  }

}
