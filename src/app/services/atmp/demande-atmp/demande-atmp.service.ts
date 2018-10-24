import { Injectable } from '@angular/core';
import {Headers, Http} from '@angular/http';
import { Globals } from '../../Global';

@Injectable()
export class DemandeAtmpService {
  host: string = this.global.host;

  constructor(private http: Http, private global: Globals) { }
  libelle(demande: number) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.host + 'demandeATMP/input/libelle/' + demande, {headers: headers})
      .map(res => res.json());
  }
  piece(demande: number) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.host + 'demandeATMP/piece/libelle/' + demande, {headers: headers})
      .map(res => res.json());
  }
  libelleDAT() {
    return this.libelle(229);
  }
  pieceDAT() {
    return this.piece(229);
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
      default: {
        return 'text';      }
    }
  }

  reference(dr: number, prestation: number) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.host + 'demandeATMP/reference?dr=' + dr + '&prestation=' + prestation, {headers: headers})
      .map(res => res.json());
  }
  new(demande: any) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + 'demandeATMP/demande', demande, {headers: headers})
      .map(res => res.json());
  }

}
