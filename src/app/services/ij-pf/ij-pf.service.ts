import { Injectable } from '@angular/core';
import { Globals } from '../Global';
import { Http, Headers } from '@angular/http';
import { InputTextBox } from '../ij/input-service/input-textbox';
import { InputBase } from '../ij/input-service/input-base';
@Injectable()
export class IjPfService {
  host = this.global.host;
  etat: number;

  constructor(
    private global: Globals,
    private http: Http
  ) { }

  listDmdIj(etat_dmd) {
    const msg = {
      "data": etat_dmd
    };
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + 'ij/listedemandeij', msg, { headers: headers })
      .map(res => res.json());
  }

  listchampRequisVal(dmdIj: string) {
    const msg = {
      data: dmdIj
    }
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + 'ij/champRequisVal', msg, { headers: headers })
      .map(res => res.json());
  }

  detailsDemande(idacc: string) {
    const msg = {
      data: idacc
    }
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + 'ij/detailsDemande', msg, { headers: headers })
      .map(res => res.json());
  }

  getDemandeIj(dmdIj: string) {
    const msg = {
      data: dmdIj
    }
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + 'ij/getDemandeIj', msg, { headers: headers })
      .map(res => res.json());
  }

  setValidFormDataForDynamicForms2(listForm, exception:any[]){
    const inputs:InputBase<any>[] = [];
    for (var i = 0; i < listForm.length; i++) {
      let there_is_exception = -1;
      for(var j=0;j<exception.length;j++){
        if(listForm[i].id_type_info == exception[j].id_type_info){
          there_is_exception = j;
          break;
        }
      }
      if(there_is_exception<0){
        let inputTextBox = new InputTextBox({
          key: listForm[i].id_type_info,
          label: listForm[i].refAccInfoTypMod.libelle_info,
          type: listForm[i].refAccInfoTypMod.type_champ,
          value: listForm[i].valeur,
          required : true
        });
        inputs.push(inputTextBox);
      }
      else{
        let inputTextBox = new InputTextBox({
          key: listForm[i].id_type_info,
          label: listForm[i].refAccInfoTypMod.libelle_info,
          type: listForm[i].refAccInfoTypMod.type_champ,
          value: listForm[i].valeur,
          required : exception[there_is_exception].isrequired!=null?exception[there_is_exception].isrequired:false,
          readonly : exception[there_is_exception].readonly!=null?exception[there_is_exception].readonly:false
        });
        inputs.push(inputTextBox);
      }     
    }
    return inputs;
  }

  setValidFormDataForDynamicForms(listForm) {
    const inputs: InputBase<any>[] = [];
    for (var i = 0; i < listForm.length; i++) {
      let inputTextBox = new InputTextBox({
        key: listForm[i].id_type_info,
        label: listForm[i].refAccInfoTypMod.libelle_info,
        type: listForm[i].refAccInfoTypMod.type_champ,
        value: listForm[i].valeur,
        required: true
      });
      inputs.push(inputTextBox);
    }
    return inputs;
  }

  setTecInfRec(formValue: any, id_acc: string, listTestInfRecu: any[]) {
    const keys = Object.keys(formValue);
    const tecInfRec = [];
    for (let i = 0; i < keys.length; i++) {
      if (keys[i] != "observations") {
        const x = {
          "id_acc": id_acc,
          "id_type_info": keys[i],
          "id_recu": listTestInfRecu[i].id_recu,
          "valeur": formValue[keys[i]]
        };
        tecInfRec.push(x);
      }
    }
    return tecInfRec;
  }

  changeEtatDemandeIj(etat: any) {
    const msg = {
      data: etat
    }
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + 'ij/changeEtatDemandeIj', msg, { headers: headers })
      .map(res => res.json());
  }

  saveToOP(data: any) {
    const msg = {
      data: data
    }
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + 'ij/saveop', msg, { headers: headers })
      .map(res => res.json());
  }

  listeEtatDemandeIj() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.host + 'ij/listeEtatDemandeIJ')
      .map(res => res.json());
  }

  pageCountByEtatByPrestation(data){
    const msg = {
      data : data
    }
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host +'ij/pagecount', msg, {headers: headers})
      .map(res => res.json());
  }

  saveToOPforIj(op, idDmdIj) {
    const msg = {
      data: {
        "id_acc": idDmdIj,
        "id_op": op
      }
    };
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + 'ij/saveopforij', msg, { headers: headers })
      .map(res => res.json());
  }

  getEtatDmd(idDmd){
    const msg = {
      data: idDmd
    };
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + 'ij/etatdmd', msg, { headers: headers })
      .map(res => res.json());
  }
}
