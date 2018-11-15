import { Injectable } from '@angular/core';
import { Globals } from '../Global';
import {Headers, Http} from '@angular/http';

@Injectable()
export class OpService {
  host: string = this.global.host;
  constructor(private http: Http, private global: Globals) { }

  getListByFlag(flag: string, page: number) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.host + 'op/flag/' + flag + '/' + page, {headers: headers})
      .map(res => res.json());
  }
  getCountPageFlag(flag: string) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.host + 'op/count/' + flag, {headers: headers})
      .map(res => res.json());
  }
  getListByFlagById(id_op: string, flag: string) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.host + 'op/flag/' + flag + '/op/' + id_op, {headers: headers})
      .map(res => res.json());
  }
  findById(id_op: string) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.host + 'op/id/' + id_op, {headers: headers})
      .map(res => res.json());
  }
  insertReglement(data) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const dataSend = {
      data : data
    }
    return this.http.post(this.host + 'op/reglement', dataSend, {headers: headers})
      .map(res => res.json());
  }
  insertReglementDetail(data: any) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const dataSend = {
      data : data
    }
    return this.http.post(this.host + 'op/reglementDetail', dataSend, {headers: headers})
      .map(res => res.json());
  }
  updateOp(data: any) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const dataSend = {
      data : data
    }
    return this.http.put(this.host + 'op', dataSend, {headers: headers})
      .map(res => res.json());
  }
  toLettre(number: number) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.host + 'op/convertion/' + number, {headers: headers})
      .map(res => res.json());
  }
}
