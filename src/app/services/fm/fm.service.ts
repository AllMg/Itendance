import { Injectable } from '@angular/core';
import { Headers,Http } from '@angular/http';
import { Globals } from '../Global';

@Injectable()
export class FmService {

  host: string = this.global.host;
  constructor(private http:Http,private global: Globals) { }

  demandeFm(data) {
    const msg = {
      data : data
    }
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + 'fm/demandefm', msg, {headers: headers})
      .map(res => res.json());
  }

}
