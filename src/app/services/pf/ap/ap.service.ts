import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Globals } from '../../Global';

@Injectable()
export class ApService {

  host: string = this.global.host;
  constructor(private http: Http, private global: Globals) { }

  demandeAp(data) {
    const msg = {
      data: data
    }
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + 'ap/demandeap', msg, { headers: headers })
      .map(res => res.json());
  }

  listeDemandeAp(id: string) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const acces = {
      identifiant: id
    };
    return this.http.post(this.host + 'ap/listeDemandeAp', acces, { headers: headers })
      .map(res => res.json());
  }

  detailsAp(id: string) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const acces = {
      identifiant: id
    };
    return this.http.post(this.host + 'ap/detailsAp', acces, { headers: headers })
      .map(res => res.json());
  }

  droitAp() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.host + 'ap/traitementAP', { headers: headers })
      .map(res => res.json());
  }

  updateInfoAp(data) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const acces = {
      data: data
    };
    return this.http.post(this.host + 'ap/updateAp', acces, { headers: headers })
      .map(res => res.json());
  }

}
