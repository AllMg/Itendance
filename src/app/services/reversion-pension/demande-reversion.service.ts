import { Injectable, Input } from '@angular/core';
import { Headers,Http } from '@angular/http';
import { Globals } from '../Global';
import { InputBase } from '../ij/input-service/input-base';
import { InputTextBox } from '../ij/input-service/input-textbox';
import { FormGroup, FormControl } from '@angular/forms';

@Injectable()
export class DemandeReversionService {
  host: string = this.global.host;
  constructor(private http:Http,private global: Globals) { }

  demandePen(data) {
    const msg = {
      data : data
    }
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + 'pen/demandePen', msg, {headers: headers})
      .map(res => res.json());
  }

  updatePen(data: any[]) {
    const msg = {
      data : data
    }
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + 'pen/updatePen', msg, {headers: headers})
      .map(res => res.json());
  }

  getRefPen(data) {
    const msg = {
      data : data
    }
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + 'pen/refPen', msg, {headers: headers})
      .map(res => res.json());
  }

  getListLibelle(iddemande) {
    const msg = {
      data : iddemande
    }
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + 'pen/listeTecInfoReqLibelle', msg, {headers: headers})
      .map(res => res.json());
  }

  getListEmployeur(idindividu) {
    const msg = {
      data : idindividu
    }
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + 'pen/listeEmployeur', msg, {headers: headers})
      .map(res => res.json());
  }

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

  setValidFormDataForDynamicFormsPieces2(listForm,nonRequi){
    const inputs:InputBase<any>[] = [];
    for (var i = 0; i < listForm.length; i++) {
      let inputTextBox = new InputTextBox({
        key: listForm[i].id_piece,
        label: listForm[i].libelle,
        type: listForm[i].type_champ,
        value: '',
        required : nonRequi[listForm[i].id_piece]!=null?
                                                      nonRequi[listForm[i].id_piece]==false?false:true
                                                      :
                                                      true
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
          value: exception[there_is_exception].val,
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

  getDroitDmdPen(idDmdPen: string) {
    const msg = {
      "identifiant" : idDmdPen
    };
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + 'pen/getDroitDemandePen', msg, {headers: headers})
      .map(res => res.json());
  }

  controlePen11mois(idIndiv: string) {
    const msg = {
      identifiant : idIndiv
    };
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + 'pen/controlePen', msg, {headers: headers})
      .map(res => res.json());
  }

  decomptePen(idDmdPen: string) {
    const msg = {
      data : idDmdPen
    };
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + 'pen/decomptePen', msg, {headers: headers})
      .map(res => res.json());
  }

  getPiecesRequise(iddemande:string){
    const msg = {
      data : iddemande
    }
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + 'pen/piecesrequis', msg, {headers: headers})
      .map(res => res.json());
  }

  ajoutAyantDroit(data) {
    const msg = {
      data : data
    }
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + 'pen/ajoutAyant', msg, {headers: headers})
      .map(res => res.json());
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
}
