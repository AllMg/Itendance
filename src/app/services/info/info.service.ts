import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import { Globals } from '../Global';

@Injectable()
export class InfoService {
  host: string = this.global.host;
  constructor(private http: Http, private global: Globals) { }

  infoIndiv(id_acess: string) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const acces = {
      identifiant : id_acess
    };
    return this.http.post(this.host + 'indiv/infoIndividu', acces, {headers: headers})
      .map(res => res.json());
  }

  infoCIT(id_access: string ) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const acces = {
      identifiant : id_access
    };
    return this.http.post(this.host + 'indiv/infoITCIT', acces, {headers: headers})
      .map(res => res.json());
  }
  infoBanque(id_access: string ) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const acces = {
      identifiant : id_access
    };
    return this.http.post(this.host + 'indiv/infoBanque', acces, {headers: headers})
      .map(res => res.json());
  }
  infoAdresse(id_access: string ) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const acces = {
      identifiant : id_access
    };
    return this.http.post(this.host + 'indiv/infoAdr', acces, {headers: headers})
      .map(res => res.json());
  }
  infoFamille(id_access: string ) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const acces = {
      identifiant : id_access
    };
    return this.http.post(this.host + 'indiv/infoFamille', acces, {headers: headers})
      .map(res => res.json());
  }
  infoPays(id: string ) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const acces = {
      id : id
    };
    return this.http.post(this.host + 'indiv/infoPays', acces, {headers: headers})
      .map(res => res.json());
  }
  infoFiraisana(id: string ) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const acces = {
      id : id
    };
    return this.http.post(this.host + 'indiv/infoFiraisana', acces, {headers: headers})
      .map(res => res.json());
  }
  allSexe() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.host + 'indiv/sexe', {headers: headers})
      .map(res => res.json());
  }
  new(data: any) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + 'indiv/new', data, {headers: headers})
      .map(res => res.json());
  }
  getLibelleStatus(entity: string) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.host + 'indiv/statu/' + entity,  {headers: headers})
      .map(res => res.json());
  }

  ajouterTravailleur(newData) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + 'mouvementT/ajoutTravailleur', newData, {headers: headers})
      .map(res => res.json());
  }

  newTrav(data:any){
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + 'mouvementT/newIndivSansMatricule', data, {headers: headers})
      .map(res => res.json());
  }
  

}
