import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Globals } from '../Global';

@Injectable()
export class Ij2Service {
  host: string = this.global.host;
  constructor(private http: Http, private global: Globals) { }

  demandeIj2(data) {
    const msg = {
      data : data
    };
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + 'ij/demandeij2', msg, {headers: headers})
      .map(res => res.json());
  }

  controledemandeIj2(data) {
    const msg = {
      data : data
    };
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + 'ij/controleij1', msg, {headers: headers})
      .map(res => res.json());
  }

  getDemande(matricule_indiv,prestation) {
    const msg = {
      data : {
        prestation: prestation,
		    id_individu: matricule_indiv
      }
    };
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + 'ij/demandeij1byindivbyprestation', msg, {headers: headers})
      .map(res => res.json());
  }

  getnombredejourij1(id_acc) {
    const msg = {
      data : id_acc
    };
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + 'ij/nombrejourij1', msg, {headers: headers})
      .map(res => res.json());
  }
}
