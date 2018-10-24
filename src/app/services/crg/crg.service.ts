import { Injectable } from '@angular/core';
import {Headers, Http} from '@angular/http';
import {Globals} from '../Global';

@Injectable()
export class CrgService {
  host: string = this.global.host;

  constructor(private http: Http,
              private global: Globals) {
  }

  listeCrgByEmpl(id_empl: string ) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const crg = {
      id : id_empl
    };
    
    return this.http.post(this.host + 'crg/affiche-crg', crg, {headers: headers})
      .map(res => res.json());
  }
  listeCrgByEmplByAnnee(id_empl: string, periode: string ) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const cie = {
      employeur : id_empl,
      item : periode
    };
    return this.http.post(this.host + 'crg/affiche-crg-periode', cie, {headers: headers})
      .map(res => res.json());
  }
}
