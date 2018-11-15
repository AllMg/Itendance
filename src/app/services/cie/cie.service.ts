import { Injectable } from '@angular/core';
import {Globals} from '../Global';
import {Headers, Http} from '@angular/http';

@Injectable()
export class CieService {

  host: string = this.global.host;

  constructor(private http: Http,
              private global: Globals) {
  }

  listeCieByEmpl(id_empl: string ) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const cie = {
      id : id_empl
    };
    return this.http.post(this.host + 'cie/affiche-cie', cie, {headers: headers})
      .map(res => res.json());
  }
  listeCieByEmplByAnnee(id_empl: string, periode: string ) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const cie = {
      employeur : id_empl,
      item : periode
    };
    return this.http.post(this.host + 'cie/affiche-cie-periode', cie, {headers: headers})
      .map(res => res.json());
  }
}
