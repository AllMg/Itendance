import {Injectable} from '@angular/core';
import {Globals} from '../Global';
import {Headers, Http} from '@angular/http';

@Injectable()
export class MouvementService {
  host: string = this.global.host;

  constructor(private http: Http, private global: Globals) {
  }

  saveRecrutement(data: any) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + 'rh/mouvement/recrutement', data, {headers: headers})
      .map(res => res.json());
  }

  getType(idType: string) {
    console.log(idType + 'type ');
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.host + 'rh/mouvement/type/' + idType, {headers: headers})
      .map(res => res.json());
  }

  getAllEtat() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.host + 'rh/mouvement/etats', {headers: headers})
      .map(res => res.json());
  }

  getMouvement(idType: string, etat) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.host + 'rh/mouvement/mvts/' + idType + '?etat=' + etat, {headers: headers})
      .map(res => res.json());
  }

  newMouvement(matricule: string, datefin: any, datedebut: any, idservice: number,
               idtype: string, observation: string, idcategorie: number) {
    const data = {
      data: {
        matricule: matricule,
        idindividu: matricule,
        datefin: datefin,
        datedebut: datedebut,
        idservice: idservice,
        idtype: idtype,
        motif: observation,
        idcategorie: idcategorie
      }
    };
    console.log(data);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + 'rh/mouvement/mvt', data, {headers: headers})
      .map(res => res.json());
  }

  getDemande(reference: string) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.host + 'rh/mouvement/demande/' + reference, {headers: headers})
      .map(res => res.json());
  }

  postule(nom: string, prenom: string, email: string, telephone: string, idposte: number, idetat: number) {
    const data = {
      data: {
        nom: nom + ' ' + prenom,
        email: email,
        telephone: telephone,
        idposte: {
          idposte: idposte
        },
        idetat: idetat
      }
    };
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + 'rh/mouvement/postule/', data, {headers: headers})
      .map(res => res.json());
  }

  updatePostule(id: string, nom: string, prenom: string, email: string, telephone: string, idposte: number,
                observation: string, idetat: number) {
    const data = {
      data: {
        idpostule: id,
        nom: nom + ' ' + prenom,
        email: email,
        telephone: telephone,
        idposte: {
          idposte: idposte
        },
        observation: observation,
        idetat: idetat
      }
    };
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + 'rh/mouvement/postule/', data, {headers: headers})
      .map(res => res.json());
  }

  delete(id: string) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.delete(this.host + 'rh/mouvement/postule/ ' + id, {headers: headers})
      .map(res => res.json());
  }

  getPostuleEtat(etat: number) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.host + 'rh/mouvement/postule/etat/' + etat, {headers: headers})
      .map(res => res.json());
  }

  saveEntretien(heuredebut: string, heurefin: string, dateentretient: Date, idpostule) {
    const data = {
      data: {
        heuredebut: heuredebut,
        heurefin: heurefin,
        dateentretien: dateentretient,
        idpostule: idpostule
      }
    };
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + 'rh/mouvement/entretien', data, {headers: headers})
      .map(res => res.json());
  }

  newAgent(data: any) {
    const dataSend = {
      data: data
    };
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + 'rh/mouvement/agent', dataSend, {headers: headers})
      .map(res => res.json());
  }
}
