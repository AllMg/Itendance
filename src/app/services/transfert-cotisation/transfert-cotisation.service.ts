import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Globals } from '../Global';

@Injectable()
export class TransfertCotisationService {

  host: string = this.global.host;

  constructor(private http: Http, private global: Globals) { }

  //Référence de la demande idacc
  referenceDemandeTransfertCotisation() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.host + 'transfertCotisation/refDemande', { headers: headers })
      .map(res => res.json());
  }
  ////Liste des informations requises
  libelleDemandeTransfertCotisation() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.host + 'transfertCotisation/listeTransfertlibelle', { headers: headers })
      .map(res => res.json());
  }
  //Liste des pièces requises
  piecesDemandeTransfertCotisation() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.host + 'transfertCotisation/listeTransfertPiecesRequis', { headers: headers })
      .map(res => res.json());
  }
  //Ajout nouvelle demande
  ajoutDemandeTransfertCotisation(data) {
    const msg = {
      data: data
    }
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + 'transfertCotisation/newDemandeTransfertCotisation', msg, { headers: headers })
      .map(res => res.json());
  }
  //Liste etat demande
  listeEtat() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.host + 'transfertCotisation/listeEtatDemande', { headers: headers })
      .map(res => res.json());
  }
  //Liste des demandes - Etat : Ok
  listeTransfertCotisation(data) {
    const msg = {
      data: data
    }
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + 'transfertCotisation/listeDemandeTransfertCotisation', msg, { headers: headers })
      .map(res => res.json());
  }
  //Liste des demandes sans état
  listeTransfertCotisationTous(data) {
    const msg = {
      data: data
    }
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + 'transfertCotisation/listeDemandeTransfertCotisationTous', msg, { headers: headers })
      .map(res => res.json());
  }
  //Changer état demande
  updateEtatDemandeTransfert(etat: any) {
    const msg = {
      data: etat
    }
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + 'transfertCotisation/changeEtatDemandeTransfert', msg, { headers: headers })
      .map(res => res.json());
  }
  //Détail d 'une demande
  detailTransfertCotisation(idacc: any) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.host + 'transfertCotisation/detailDemandeTransfertCotisation/' + idacc, { headers: headers })
      .map(res => res.json());
  }
  //Détail d 'une demande VIA DN
  detailTransfertCotisationDN(kay: any) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.host + 'transfertCotisation/detailDemandeTransfertCotisationDN/' + kay, { headers: headers })
      .map(res => res.json());
  }
  //Controle demande
  controleTransfert(matricule: String) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.host + 'transfertCotisation/controleDemande/' + matricule, { headers: headers })
      .map(res => res.json());
  }
}
