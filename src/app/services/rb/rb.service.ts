import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Globals } from '../Global';

@Injectable()
export class RbService {

  host: string = this.global.host;

  constructor(private http: Http, private global: Globals) { }

  /*
  	fonction: anaran'ny fonction an'ilay topic atsona
  	argument: ny valeur ilain'ny fonction, objet na string mety daolo
  */
  rappBancTopic(fonction: string, argument: any, enJSON: boolean) {
    let msg = {
      data: {
        fonction: fonction,
        enJSON: enJSON,
        argument: argument
      }
    };
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + 'rappBanc/rappBancTopic', msg, { headers: headers })
      .map(res => res.json());
  }

  getGLDR(filtre){
    let msg = {data: filtre};
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + 'rappBanc/getGLDR', msg, {headers: headers})
      .map(res => res.json());
  }

}
