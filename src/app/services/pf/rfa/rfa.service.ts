import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Globals } from '../../Global';

@Injectable()
export class RfaService {

  host: string = this.global.host;
  constructor(private http: Http, private global: Globals) { }

  listeDemandeRfa(estValide) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const acces = {
      data: estValide
    };
    return this.http.post(this.host + 'rfa/liste_demande_rfa', acces, { headers: headers })
      .map(res => res.json());
  }

  infoEmpl(id_empl) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const acces = {
      data: id_empl
    };
    return this.http.post(this.host + 'empl/infoEmployeur', acces, { headers: headers })
      .map(res => res.json());
  }

  smeRfa(dateDebutSme, regime) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const acces = {
      data: {
        "dateDebutSme": dateDebutSme,
        "smeRegime": regime
      }
    };
    return this.http.post(this.host + 'rfa/sme_rfa', acces, { headers: headers })
      .map(res => res.json());
  }

  validerSME(data) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const acces = {
      data: data
    };
    return this.http.post(this.host + 'rfa/validerSME', acces, { headers: headers })
      .map(res => res.json());
  }

  detailsRfa(data) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const acces = {
      data: data
    };
    return this.http.post(this.host + 'rfa/detailsRfa', acces, { headers: headers })
      .map(res => res.json());
  }

  droitRFA(data) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const acces = {
      data: data
    };
    return this.http.post(this.host + 'rfa/droitRfa', acces, { headers: headers })
      .map(res => res.json());
  }

  updateRfa(data) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const acces = {
      data: data
    };
    return this.http.post(this.host + 'rfa/updateRfa', acces, { headers: headers })
      .map(res => res.json());
  }



}
