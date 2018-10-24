import { Injectable } from '@angular/core';
import {Headers, Http} from '@angular/http';
import { Globals } from '../Global';
import {HttpClient, HttpRequest, HttpEvent} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class DnService {
  host: string = this.global.host;
  constructor(private http: Http, private global: Globals, private httpClient: HttpClient) { }
  
  getDnByPeriode(id: string, periode: string) {
    return this.http.get(this.host + 'dn/' + id + '/' + periode)
      .map(res => res.json());
  }

  saveDn(data){
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + 'dn', data, {headers: headers})
      .map(res => res.json());
  }

  pushFileToStorage(file: File): Observable<HttpEvent<{}>> {
    let formdata: FormData = new FormData();
    formdata.append('file', file);
    const req = new HttpRequest('POST', 'http://localhost:9398/file', formdata, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.httpClient.request(req);
  }

  getHistoriqueDn(id: string, max: number, page: number){
    return this.http.get(this.host + 'dn/historique/' + id + '/' + max + '/' + page)
      .map(res => res.json());
  }
}
