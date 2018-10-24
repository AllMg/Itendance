import { Injectable } from '@angular/core';
import {Headers, Http} from '@angular/http';
import { Globals } from '../Global';

@Injectable()
export class BanqueService {
  host: string = this.global.host;
  constructor(private http: Http,
  private global: Globals
  ) { }
  listBanque() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.host + 'banque/listBanque')
    .map(res => res.json());
  }

  listPays() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.host + 'banque/listPays')
      .map(res => res.json());
  }

  lieuAgence() {
    const banque = null;
    const msg = {
      data : banque
    }
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + 'banque/listLieuAgence', msg, {headers: headers})
      .map(res => res.json());
  }

  modifCompteBancaire(data) {
    const msg = {
      data : data
    }
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + 'banque/modifCompteBancaire', msg, {headers: headers})
      .map(res => res.json());
  }

  listAgenceByBanque(banque) {
    const msg = {
      data : banque
    }
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + 'banque/listAgenceByBanque', msg, {headers: headers})
      .map(res => res.json());
  }

  infoBanqueEmpl(id_access: string ) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const acces = {
      identifiant : id_access
    };
    return this.http.post(this.host + 'banque/infoBanqueEmpl', acces, {headers: headers})
      .map(res => res.json());
  }
  newCompte(compte) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const data = {
      data : compte
    };
    return this.http.post(this.host + 'banque/compte', data, {headers: headers})
      .map(res => res.json());
  }

}
