import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Globals } from '../../Global';

@Injectable()
export class Am2Service {

  host: string = this.global.host;
  constructor(private http: Http, private global: Globals) { }

  demandeAm2(data) {
    const msg = {
      data: data
    }
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + 'am/demandeam2', msg, { headers: headers })
      .map(res => res.json());
  }

  listeEnfant(idDemandeAm1) {
    const msg = {
      data: idDemandeAm1
    }
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + 'am/listeEnfantAm2', msg, { headers: headers })
      .map(res => res.json());
  }

  getDemande(matricule_indiv,prestation) {
    const msg = {
      data : {
        prestation: prestation,
		    id_individu: matricule_indiv
      }
    }
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + 'ij/demandeij1byindivbyprestation', msg, {headers: headers})
      .map(res => res.json());
  }

  updateInfoAm2(data) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const acces = {
      data: data
    };
    return this.http.post(this.host + 'am/updateAm2', acces, { headers: headers })
      .map(res => res.json());
  }


}
