import { Injectable } from '@angular/core';
import {Headers, Http} from '@angular/http';
import {Globals} from '../Global';

@Injectable()
export class ImmoService {
  
  host: string = this.global.host;
  enTete: Headers;

  constructor(private http: Http, private global: Globals) {
    this.enTete = new Headers();
    this.enTete.append('Content-Type', 'application/json');
  }

  /*
  	fonction: anaran'ny fonction an'ilay topic atsona
  	argument: ny valeur ilain'ny fonction, objet na string mety daolo
  */
  immoTopic(fonction:string, argument:any, enJSON: boolean) {
    let msg = {
      data: {
      	fonction: fonction,
        enJSON: enJSON,
      	argument: argument
      }
    };
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + 'immo/immoTopic', msg, {headers: headers})
      .map(res => res.json());
  }

  getAllRefDrhService(){
    let msg = {data: ""};
    return this.http.post(this.host + 'immo/getAllRefDrhService', msg, {headers: this.enTete})
      .map(res => res.json());
  }

  getByIdRefDrhService(refService){
    let msg = {data: refService};
    return this.http.post(this.host + 'immo/getByIdRefDrhService', msg, {headers: this.enTete})
      .map(res => res.json());
  }

  listeTypeEntrBatInt(){
    let msg = {data: ""};
    return this.http.post(this.host + 'immo/listeTypeEntrBatInt', msg, {headers: this.enTete})
      .map(res => res.json());
  }

  listeCaractEntrBatInt(){
    let msg = {data: ""};
    return this.http.post(this.host + 'immo/listeCaractEntrBatInt', msg, {headers: this.enTete})
      .map(res => res.json());
  }

  listeEnumEntrBatInt(){
    let msg = {data: ""};
    return this.http.post(this.host + 'immo/listeEnumEntrBatInt', msg, {headers: this.enTete})
      .map(res => res.json());
  }

  listeEtatDmdMobInt(){
    let msg = {data: ""};
    return this.http.post(this.host + 'immo/listeEtatDmdMobInt', msg, {headers: this.enTete})
      .map(res => res.json());
  }

  listeUtilesDmdBatInt(){
    let msg = {data: ""};
    return this.http.post(this.host + 'immo/listeUtilesDmdBatInt', msg, {headers: this.enTete})
      .map(res => res.json());
  }

  rechercheArticleInt(terme){
    let msg = {
      data: terme
    };
    return this.http.post(this.host + 'immo/rechercheArticleInt', msg, {headers: this.enTete})
      .map(res => res.json());
  }

  referenceDmdArticleInt(arg){
    let msg = {
      data: arg
    };
    return this.http.post(this.host + 'immo/referenceDmdArticleInt', msg, {headers: this.enTete})
      .map(res => res.json());
  }

  listeArticleInt(arg){
    let msg = {
      data: arg
    };
    return this.http.post(this.host + 'immo/listeArticleInt', msg, {headers: this.enTete})
      .map(res => res.json());
  }

}