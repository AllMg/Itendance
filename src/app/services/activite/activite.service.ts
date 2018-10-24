import { Injectable } from '@angular/core';
import {Headers, Http} from '@angular/http';
import { Globals } from '../Global';

@Injectable()
export class ActiviteService {
  host: string = this.global.host;
  constructor(private http: Http, private global: Globals) { }
  getActiviteByName(name: string) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.host + 'activite/name/' + name, {headers: headers})
      .map(res => res.json());
  }

}
