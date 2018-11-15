import { Injectable } from '@angular/core';
import { Headers,Http } from '@angular/http';
import { Globals } from '../Global';

@Injectable()
export class DemandeRappelService {
  host: string = this.global.host;
  constructor(private http:Http,private global: Globals) { }
  
  getLibellePiecesRequise(){
    const msg = {};
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + 'pen/listeTecPcsRefLibellePen', msg, {headers: headers})
      .map(res => res.json());
  }
  getPiecesRequise(data:string){
    const msg = {
      data:data
    };
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + 'pen/listeTecPcsRefAllLibellePen', msg, {headers: headers})
      .map(res => res.json());
  }
  setTecIndividuAcc(listForm:any[],refAcc){
    let result = [];
    let Idtype:number;
    for(let data of listForm) {
      if(data.matricule != undefined){
        if(data.statut == "ENFANT"){
          Idtype = 10;
        }
        else if(data.statut == "CONJOINT"){
          Idtype = 9;
        }
        else if(data.statut == "TRAVAILLEURS"){
          Idtype = 6;
        }
        else{
          Idtype = 8;
        }
        let inputTextBox = {
          idAcc: refAcc,
          idIndividu: data.matricule,
          individuType: Idtype
        };
        result.push(inputTextBox);
      }
    }
    return result;
  }
}
