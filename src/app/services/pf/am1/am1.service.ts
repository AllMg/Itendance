import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Globals } from '../../Global';

@Injectable()
export class Am1Service {

  host: string = this.global.host;
  constructor(private http: Http, private global: Globals) { }

  demandeAm1(data) {
    const msg = {
      data: data
    }
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + 'am/demandeam1', msg, { headers: headers })
      .map(res => res.json());
  }
  ListDemande(data) {
    const msg = {
      data: data
    }
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + 'am/listDmd', msg, { headers: headers })
      .map(res => res.json());
  }
  getetatdem() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.host + 'am/listeEtatDemandeAM')
      .map(res => res.json());
  }
  droitAM1(ref: string) {
    const msg = {
      data: ref
    };
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + 'am/traitementAM1', msg, { headers: headers })
      .map(res => res.json());
  }
  getDroitDmdam(idDmdam: string) {
    const msg = {
      "identifiant": idDmdam
    };
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + 'am/getDroitDemandeam', msg, { headers: headers })
      .map(res => res.json());
  }
  changeEtatDemandeAm(etat: any) {
    const msg = {
      data: etat
    }
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + 'am/changeEtatDemandeam', msg, { headers: headers })
      .map(res => res.json());
  }

  saveToOPforAM(op, idDmdam) {
    const msg = {
      data: {
        "id_acc": idDmdam,
        "id_op": op
      }
    };
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + 'am/saveopforam', msg, { headers: headers })
      .map(res => res.json());
  }
  getEnfAM(idDmdAM) {
    const msg = {
      data: {
        "id_acc": idDmdAM,
        "prestation": "412"
      }
    };
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + 'am/listeEnfantAssoc', msg, { headers: headers })
      .map(res => res.json());
  }

  updateInfoAm1(data) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const acces = {
      data: data
    };
    return this.http.post(this.host + 'am/updateAm1', acces, { headers: headers })
      .map(res => res.json());
  }

}
