import { Injectable } from '@angular/core';
import {Headers, Http} from '@angular/http';
import {Globals} from '../Global';


@Injectable()
export class DirectionService {
  host: string = this.global.host;
  constructor(private http: Http, 
              private global: Globals) { }

  infoDirection(id_access: string) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const acces = {
      identifiant : id_access
    };
    return this.http.post(this.host +'direction/infoAgent', acces, {headers: headers})
      .map(res => res.json());
  }

}
