import { Injectable } from '@angular/core';
import {Headers, Http} from '@angular/http';
import {Globals} from '../Global';

@Injectable()
export class DemandePensionService {
  host: string = this.global.host;

  constructor(private http: Http, private global: Globals) { }

  libelle(demande: string) {
    const headers = new Headers();
    const data = {
      data: demande
    };
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + 'pension/input/libelle', data, {headers: headers})
      .map(res => res.json());
  }

  piece(demande: string) {
    const headers = new Headers();
    const data = {
      data: demande
    };
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + 'pension/piece/libelle', data, {headers: headers})
      .map(res => res.json());
  }

  libellePen(prestation: string) {
    return this.libelle(prestation);
  }

  piecePen(prestation: string) {
    return this.piece(prestation);
  }

  getType(typeAbrev: string) {
    return 'string';
  }

  findType(typeAbrv: string) {
    switch (typeAbrv) {
      case 'C': {
        return 'text';
      }
      case 'N': {
        return 'number';
      }
      case 'D': {
        return 'date';
      }
      case 'A': {
        return 'area';
      }
      case 'H': {
        return 'time';
      }
      case 'S': {
        return '';
      }
      default: {
        return 'text';      }
    }
  }

  reference(dr: number, prestation: string) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const data = {
      data: {
        dr: dr,
        prestation: prestation
      }
    };
    return this.http.post(this.host + 'pension/reference', data, {headers: headers})
      .map(res => res.json());
  }

  new(demande: any) {
    const headers = new Headers();
    const dmd = {
      data: demande
    };
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + 'pension/demande', demande, {headers: headers})
      .map(res => res.json());
  }

  list(prestation: string[], typeEtat: number, page: number) {
    const headers = new Headers();
    const dmd = {
      data: {
        prestation: prestation,
        type_etat: typeEtat,
        pagination: page
      }
    };
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + 'pension/liste', dmd, {headers: headers})
      .map(res => res.json());
  }

  nbrPage(prestation: string[], typeEtat: number, page: number) {
    const headers = new Headers();
    const dmd = {
      data: {
        prestation: prestation,
        type_etat: typeEtat,
        pagination: page
      }
    };
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + 'pension/nombre-page', dmd, {headers: headers})
      .map(res => res.json());
  }

  detail(accueil: string) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.host + 'pension/detail/' + accueil, {headers: headers})
      .map(res => res.json());
  }

  libelleDemande(prestation: string) {
    const headers = new Headers();
    const data = {
      data: prestation
    };
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + 'pension/demande-libelle', data, {headers: headers})
      .map(res => res.json());
  }

  change(idacc: string, etat: number) {
    const headers = new Headers();
    const dmd = {
      data: {
        idacc: idacc,
        etat: etat
      }
    };
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + 'pension/changer', dmd, {headers: headers})
      .map(res => res.json());
  }

  listEtat() {
    const headers = new Headers();
    const dmd = {};
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + 'pension/liste-etat', dmd, {headers: headers})
      .map(res => res.json());
  }

  saveIndiv(data: any) {
    const headers = new Headers();
    const dmd = data;
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + 'pension/ajout-enfant', dmd, {headers: headers})
      .map(res => res.json());
  }

}
