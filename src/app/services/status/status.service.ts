import { Injectable } from '@angular/core';
import {Headers, Http} from '@angular/http';
import { Globals } from '../Global';


@Injectable()
export class StatusService {
  host: string = this.global.host;
  constructor(private http: Http, private global: Globals) { }
  getAllStatusEmployeur() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.host + 'status/employeur', {headers: headers})
      .map(res => res.json());
  }
}
