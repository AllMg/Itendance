import { Injectable } from '@angular/core';
import {Headers, Http} from '@angular/http';
import { Globals } from '../Global';
import {HttpClientModule} from '@angular/common/http';

@Injectable()
export class EmployeurService {
  host: string = this.global.host;
  constructor(private http: Http, private global: Globals) { }
  infoEmployeur(identifiant: string ) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const acces = {
      identifiant : identifiant
    };
    return this.http.post(this.host + 'empl/infoEmployeur', acces, {headers: headers})
      .map(res => res.json());
  }
  responsableEmployeur(identifiant: string) {
    const headers = new Headers();
    headers.append( 'Content-Type', 'application/json');
    return this.http.get(this.host + 'empl/responsableEmpl/' + identifiant, {headers: headers})
      .map(res => res.json());
  }
  updateResponsableEmployeur(data: any) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put(this.host + 'empl/responsableEmpl', data, {headers: headers})
      .map(res => res.json());
  }
  newEmployeur(data: any) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + 'empl/new', data, {headers: headers})
      .map(res => res.json());
  }

}
