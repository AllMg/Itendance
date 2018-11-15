import { Injectable, Input } from '@angular/core';
import { Headers,Http } from '@angular/http';
import { Globals } from '../Global';
import { InputBase } from './input-service/input-base';
import { InputTextBox } from './input-service/input-textbox';
import { FormGroup, FormControl } from '@angular/forms';

@Injectable()
export class IjService {
  host: string = this.global.host;
  constructor(private http:Http,private global: Globals) { }

  demandeIj(data) {
    const msg = {
      data : data
    }
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + 'ij/demandeij', msg, {headers: headers})
      .map(res => res.json());
  }

  demandePen(data) {
    const msg = {
      data : data
    }
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + 'ij/demandePen', msg, {headers: headers})
      .map(res => res.json());
  }

  updateIj(data: any[]) {
    const msg = {
      data : data
    }
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + 'ij/updateij', msg, {headers: headers})
      .map(res => res.json());
  }

  updateIj2(data: any[]) {
    const msg = {
      data : data
    }
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + 'ij/updateij2', msg, {headers: headers})
      .map(res => res.json());
  }

  getRefIj(data) {
    const msg = {
      data : data
    }
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + 'ij/refij', msg, {headers: headers})
      .map(res => res.json());
  }

  getListLibelle(iddemande) {
    const msg = {
      data : iddemande
    }
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + 'ij/listeTecInfoReqLibelle', msg, {headers: headers})
      .map(res => res.json());
  }  

  getListEmployeur(idindividu) {
    const msg = {
      data : idindividu
    }
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + 'ij/listeEmployeur', msg, {headers: headers})
      .map(res => res.json());
  }

  // setTecInfRec(formValue: any, id_acc: string,TecInfNonReq: any[],){
  //   const keys = Object.keys(formValue);
  //   const tecInfRec = [];
  //   for(let i=0; i<keys.length;i++){
  //     if(keys[i]!="employeur"&&keys[i]!="demandeIjCachete"&&keys[i]!="fichePaye"){
  //       const x = {
  //         "id_acc": id_acc,
  //         "id_type_info": keys[i],
  //         "id_recu": null,
  //         "valeur" : formValue[keys[i]]
  //       };
  //       tecInfRec.push(x);
  //     }
  //   }
  //   return tecInfRec;
  // }

  setTecInfRec(formValue: any, id_acc: string,tecInfNonReq: any[],){
    const keys = Object.keys(formValue);
    console.log("no requis",tecInfNonReq)
    const tecInfRec = [];
    for(let i=0; i<keys.length;i++){
      let non_requis = 0;
      for(let j=0;j<tecInfNonReq.length;j++){
        if(keys[i]==tecInfNonReq[j]){
          non_requis++;
          break;
        }
      }
      if(non_requis==0){
        const x = {
          "id_acc": id_acc,
          "id_type_info": keys[i],
          "id_recu": null,
          "valeur" : formValue[keys[i]]
        };
        tecInfRec.push(x);
      }
    }
    return tecInfRec;
  }

  getTecPcsForMongo(formValue: any, tecInfNonReq: any[],){
    const keys = Object.keys(formValue);
    const tecPcs = [];
    for(let i=0; i<keys.length;i++){
      let non_requis = 0;
      for(let j=0;j<tecInfNonReq.length;j++){
        if(keys[i]==tecInfNonReq[j]){
          non_requis++;
          break;
        }
      }
      if(non_requis==0){
        tecPcs.push(formValue[keys[i]]);
      }
    }
    return tecPcs;
  }

  setTecPcsRec(formValue: any, id_acc: string,tecInfNonReq: any[],){
    const keys = Object.keys(formValue);
    const tecInfRec = [];
    for(let i=0; i<keys.length;i++){
      let non_requis = 0;
      for(let j=0;j<tecInfNonReq.length;j++){
        if(keys[i]==tecInfNonReq[j]){
          non_requis++;
          break;
        }
      }
      if(non_requis==0){
        const x = {
          "id_acc": id_acc,
          "id_piece": keys[i],
          "liens_fichier" : ""
        };
        tecInfRec.push(x);
      }
    }
    return tecInfRec;
  }

  setValidFormDataForDynamicForms(listForm){
    const inputs:InputBase<any>[] = [];
    for (var i = 0; i < listForm.length; i++) {
      let inputTextBox = new InputTextBox({
        key: listForm[i].id_type_info,
        label: listForm[i].libelle,
        type: listForm[i].type_champ,
        value: '',
        required : true
      });
      inputs.push(inputTextBox);
    }
    return inputs;
  }

  setValidFormDataForDynamicFormsPieces(listForm){
    const inputs:InputBase<any>[] = [];
    for (var i = 0; i < listForm.length; i++) {
      let inputTextBox = new InputTextBox({
        key: listForm[i].id_piece,
        label: listForm[i].libelle,
        type: listForm[i].type_champ,
        value: '',
        required : true
      });
      inputs.push(inputTextBox);
    }
    return inputs;
  }

  setValidFormDataForDynamicForms2(listForm, exception:any[]){
    const inputs:InputBase<any>[] = [];
    for (var i = 0; i < listForm.length; i++) {
      let there_is_exception = -1;
      for(var j=0;j<exception.length;j++){
        if(listForm[i].id_type_info == exception[j].id_type_info){
          there_is_exception = j;
        }
      }
      if(there_is_exception<0){
        let inputTextBox = new InputTextBox({
          key: listForm[i].id_type_info,
          label: listForm[i].libelle,
          type: listForm[i].type_champ,
          value: '',
          required : true
        });
        inputs.push(inputTextBox);
      }
      else{
        let inputTextBox = new InputTextBox({
          key: listForm[i].id_type_info,
          label: listForm[i].libelle,
          type: listForm[i].type_champ,
          value: exception[there_is_exception].val!=null?exception[there_is_exception].val:'',
          required : exception[there_is_exception].isrequired,
          readonly : exception[there_is_exception].readonly
        });
        inputs.push(inputTextBox);
      }     
    }
    return inputs;
  }

  setValidFormDataForDynamicForms_toKeyArray(validFormDataForDynamicForms: any[]){
    let rep = [];
    for (var i = 0; i < validFormDataForDynamicForms.length; i++) {
      rep.push(validFormDataForDynamicForms[i].key);
    }
    return rep;
  }

  getDroitDmdIj(idDmdIj: string) {
    const msg = {
      "identifiant" : idDmdIj
    };
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + 'ij/getDroitDemandeIj', msg, {headers: headers})
      .map(res => res.json());
  }

  controleIj11mois(idIndiv: string) {
    const msg = {
      identifiant : idIndiv
    };
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + 'ij/controleIJ', msg, {headers: headers})
      .map(res => res.json());
  }

  decompteIj(idDmdIj: string) {
    const msg = {
      data : idDmdIj
    };
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + 'ij/decompteij', msg, {headers: headers})
      .map(res => res.json());
  }

  decompteIj2(idDmdIj: string) {
    const msg = {
      data : idDmdIj
    };
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + 'ij/decompteij2', msg, {headers: headers})
      .map(res => res.json());
  }

  getPiecesRequise(iddemande:string){
    const msg = {
      data : iddemande
    }
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + 'ij/piecesrequis', msg, {headers: headers})
      .map(res => res.json());
  }
}
