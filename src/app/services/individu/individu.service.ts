import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import {Globals} from '../Global';

@Injectable()
export class IndividuService {
  host: string = this.global.host;

  constructor(private http: Http, private global: Globals) {
  }

  infoIndiv(id_acess: string) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const acces = {
      identifiant: id_acess
    };
    return this.http.post(this.host + 'indiv/infoIndividu', acces, {headers: headers})
      .map(res => res.json());
  }

  getlastempl(id_acess: string) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.get(this.host + 'indiv/getEmployeur/' + id_acess, {headers: headers})
      .map(res => res.json());
  }

  listHistoriqueTravailleur(id_acess: string) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const acces = {
      identifiant: id_acess
    };
    return this.http.post(this.host + 'mouvementT/listhisttrav', acces, {headers: headers})
      .map(res => res.json());
  }

  lastactivitie(matricule: string) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.get(this.host + 'indiv/getActivity/' + matricule, {headers: headers})
      .map(res => res.json());
  }

  listTravailleur(id_acess: string) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const acces = {
      identifiant: id_acess
    };
    return this.http.post(this.host + 'mouvementT/listtrav', acces, {headers: headers})
      .map(res => res.json());
  }

  detailsPrestation(id) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const acces = {
      id: id
    };
    return this.http.post(this.host + 'indiv/detailsPrestation', acces, {headers: headers})
      .map(res => res.json());
  }

  listOrdLiquide(matricule: string) {

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const acces = {
      id: matricule
    };
    return this.http.get(this.host + 'indiv/histDroits/' + acces, {headers: headers})
      .map(res => res.json());
  }

  detailsListOrdLiquide(id: number) {

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const acces = {
      id: id
    };
    return this.http.post(this.host + 'indiv/histDetailsDroits', acces, {headers: headers})
      .map(res => res.json());
  }
}
