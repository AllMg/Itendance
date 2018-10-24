import { Injectable } from '@angular/core';
import {Headers, Http} from '@angular/http';
import {Globals} from '../Global';

@Injectable()
export class SoldeService {
  host: string = this.global.host;

  constructor(private http: Http,
              private global: Globals) {
  }

  listeSoldeByEmpl(id_empl: string ) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const solde = {
      id : id_empl
    };
    return this.http.post(this.host + 'solde/affiche-solde', solde, {headers: headers})
      .map(res => res.json());
  }
}
