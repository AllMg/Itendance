import { Injectable } from '@angular/core';
import {Headers, Http} from '@angular/http';
import {Globals} from '../Global';

@Injectable()
export class MrService {
  host: string = this.global.host;

  constructor(private http: Http,
              private global: Globals) {
  }

  listeMrByEmpl(id_empl: string ) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const mr = {
      id : id_empl
    };
    
    return this.http.post(this.host + 'mr/affiche-mr', mr, {headers: headers})
      .map(res => res.json());
  }
  listeMrByEmplByAnnee(id_empl: string, periode: string ) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const cie = {
      employeur : id_empl,
      item : periode
    };
    return this.http.post(this.host + 'mr/affiche-mr-periode', cie, {headers: headers})
      .map(res => res.json());
  }
}
