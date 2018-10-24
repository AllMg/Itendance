import {Injectable, Input} from '@angular/core';
import {Headers, Http} from '@angular/http';
import {Globals} from '../Global';
import {InputBase} from '../ij/input-service/input-base';
import {InputTextBox} from '../ij/input-service/input-textbox';
import {FormGroup, FormControl} from '@angular/forms';

@Injectable()
export class PenService {
  host: string = this.global.host;

  constructor(private http: Http, private global: Globals) {
  }

  getListDemandePen(iddemande) {
    const msg = {
      data: iddemande
    };
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + 'pen/listDemPen', msg, {headers: headers})
      .map(res => res.json());
  }

  getListDemandeTabPen(iddemande) {
    const msg = {
      data: iddemande
    };
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + 'pen/listDemTabPen', msg, {headers: headers})
      .map(res => res.json());
  }


  getDetailDemandePen(iddemande) {
    const msg = {
      data: iddemande
    };
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + 'pen/detailDemandePen', msg, {headers: headers})
      .map(res => res.json());
  }

  getPageDemandePen(iddemande) {
    const msg = {
      data: iddemande
    };
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + 'pen/nombrePage', msg, {headers: headers})
      .map(res => res.json());
  }

  getTypeDemande(iddemande) {
    const msg = {
      data: iddemande
    };
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + 'pen/typeDemande', msg, {headers: headers})
      .map(res => res.json());
  }

  getLibellePcs(iddemande) {
    const msg = {
      data: iddemande
    };
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + 'pen/getLibellePcsPen', msg, {headers: headers})
      .map(res => res.json());
  }

  setChangeStatuDemande(iddemande) {
    const msg = {
      data: iddemande
    };
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + 'pen/valideDemandePen', msg, {headers: headers})
      .map(res => res.json());
  }

  getAllStatuIndiv(iddemande) {
    const msg = {
      data: iddemande
    };
    console.log('Change Statu Piéce');
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + 'pen/findAllStatusPage', msg, {headers: headers})
      .map(res => res.json());
  }

  getAllEtatDoss() {
    const msg = {};
    console.log('Change Statu Piéce');
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + 'pen/etatDossierDemande', msg, {headers: headers})
      .map(res => res.json());
  }

  findIsDemandeIndividu(iddemande) {
    const msg = {
      data: iddemande
    };
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + 'pen/findIsDemandeIndividu', msg, {headers: headers})
      .map(res => res.json());
  }

  changerEtatDemandePension(iddemande) {
    const msg = {
      data: iddemande
    };
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + 'pen/changerEtatDemandePension', msg, {headers: headers})
      .map(res => res.json());
  }

  infoDemandePen(iddemande) {
    const msg = {
      data: iddemande
    };
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + 'pen/infoDemandePen', msg, {headers: headers})
      .map(res => res.json());
  }

  findSiPensionExist(iddemande) {
    const msg = {
      data: iddemande
    };
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + 'pen/verifierSiPensionExist', msg, {headers: headers})
      .map(res => res.json());
  }

}
