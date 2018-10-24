import { Injectable } from '@angular/core';
import { Globals } from '../Global';
import { Headers, Http } from '@angular/http';

@Injectable()
export class PmdService {
  host: string = this.global.host;
  constructor(
    private http: Http,
    private global: Globals
  ) { }

  //Données pmd-mail
  pmdMailTous() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.host + 'pmd/listePmdMail', { headers: headers })
      .map(res => res.json());
  }

  //Données pmd-mail by id_empl
  pmdMailByIdEmpl(EMPLOYEUR_MATRICULE: any) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.host + 'pmd/listePmdMailByIdEmpl/' + EMPLOYEUR_MATRICULE, { headers: headers })
      .map(res => res.json());
  }
}
