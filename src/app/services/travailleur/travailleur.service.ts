import { Injectable } from '@angular/core';
import {Headers, Http} from '@angular/http';
import { Globals } from '../Global';

@Injectable()
export class TravailleurService {
  host: string = this.global.host;
  constructor(private http: Http,private global: Globals) { }
  infoTravailleur(identifiant: string ) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const acces = {
      identifiant : identifiant
    };
    return this.http.post(this.host + 'empl/infoEmployeur', acces, {headers: headers})
      .map(res => res.json());
  }

  

}
