import { Injectable } from '@angular/core';
import {Headers, Http} from '@angular/http';
import { Globals } from '../Global';

@Injectable()
export class AtmpService {
  host: string = this.global.host;

  constructor(private http: Http, private global: Globals) { }

  demandeAt(demandeAt) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + 'atmp/demande', demandeAt, {headers: headers})
      .map(res => res.json());
  }
  listeDemandeAt(pec, page, size) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let url = 'atmp/demande/pec/' + pec + '?';
    if ( page !== undefined) {
      url = url + 'page=' + page + '&';
    }
    if ( size !== undefined) {
      url = url + 'size=' + size + '&';
    }
    return this.http.get(this.host + url, {headers: headers})
      .map(res => res.json());
  }
  getDat(id: string) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.host + 'atmp/demande/identifiant/' + id, {headers: headers})
      .map(res => res.json());
  }
  
}
