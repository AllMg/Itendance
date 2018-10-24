import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';
import { Globals } from '../Global';

@Injectable()
export class AuthService {
  authToken: any;
  acces: any;
  user: any;
  host: string = this.global.host;
  constructor(private http: Http,
  private global: Globals
  ) { }

  authenticate(acces) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + 'auth/connexionKafka', acces, {headers: headers})
      .map(res => res.json());
  }
  newAccess(data: any) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + 'acces/new', JSON.stringify(data), {headers: headers})
      .map(res => res.json());
  }
  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }
  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }
  loggedIn() {
    return tokenNotExpired('id_token');
  }
  loggedOut() {
    return !tokenNotExpired('id_token');
  }
  logout() {
    this.acces = null;
    this.authToken = null;
    localStorage.clear();
  }
}
