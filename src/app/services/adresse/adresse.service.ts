import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import {Adresse} from '../../models/Adresse';
import { Globals } from '../Global';

@Injectable()
export class AdresseService {

  adresse: Adresse;
  host: string = this.global.host;

  constructor(private http: Http,
  private global: Globals) {
  }

  infoAdresse(id_access: string ) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const acces = {
      identifiant : id_access
    };
    return this.http.post(this.host + 'indiv/infoAdresse', acces, {headers: headers})
      .map(res => res.json());
  }

  ajoutAdresse(newAdresse) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + 'indiv/ajoutAdresse', newAdresse, {headers: headers})
      .map(res => res.json());
  }

  listFokontany(nom: string) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.host + 'adresse/fokontany/name/' + nom, {headers: headers})
      .map(res => res.json());
  }

  infoFiraisana(id: string ) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const acces = {
      id : id
    };
    return this.http.post(this.host + 'indiv/infoFiraisana', acces, {headers: headers})
      .map(res => res.json());
  }
  infoAdresseEmpl(id: string ) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const acces = {
      identifiant : id
    };
    return this.http.post(this.host + 'adresse/adresseEmpl', acces, {headers: headers})
      .map(res => res.json());
  }
  nationalite(page: number) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.host + 'adresse/nationalite/' + page, {headers: headers})
      .map(res => res.json());
  }
  firaisanaByName(name: string) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.host + 'adresse/firaisana/name/' + name, {headers: headers})
      .map(res => res.json());
  }
  getTypeAdresse() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.host + 'adresse/type', {headers: headers})
      .map(res => res.json());
  }
  getAdresseByEmplAndType(id_empl: string, type: string ) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.host + 'adresse/employeur/' + id_empl + '/type/' + type, {headers: headers})
      .map(res => res.json());
  }
  getAdressByTravailleurAndType(id_empl: string, type: string ) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.host + 'adresse/travailleur/' + id_empl + '/type/' + type, {headers: headers})
      .map(res => res.json());
  }
}
