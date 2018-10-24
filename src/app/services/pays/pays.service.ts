import { Injectable } from '@angular/core';
import {Headers, Http} from '@angular/http';
import { Globals } from '../Global';

@Injectable()
export class PaysService {
  host: string = this.global.host;
  constructor(private http: Http, private global: Globals) { }
  infoPays(id: string ) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const acces = {
      id : id
    };
    return this.http.post(this.host + 'indiv/infoPays', acces, {headers: headers})
      .map(res => res.json());
  }

}
