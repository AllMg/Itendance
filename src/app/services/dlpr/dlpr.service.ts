import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Globals } from '../Global';

@Injectable()
export class DlprService {


  host: string = this.global.host;

  constructor(private http: Http, private global: Globals) { }

  referenceDemDlpr(data) {
    const msg = {
      data : data
    }
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + 'dlpr/refDemande', msg, {headers: headers})
      .map(res => res.json());
  }
  SaveDlpr(data)
  {
    const msg = {
      data : data
    }
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + 'dlpr/SaveDlpr', msg, {headers: headers})
      .map(res => res.json());
  }
  libelleDlprReq(prestation:string) {
  	const msg = {
      data : prestation
    }
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + 'dlpr/listChampReq',msg, { headers: headers })
      .map(res => res.json());
  }

  piecesDlprReq(prestation:string) {
  	  const msg = {
      data : prestation
    }
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + 'dlpr/piecesrequis',msg, { headers: headers })
      .map(res => res.json());
  }
  ListDemande(data) {
    const msg = {
      data : data
    }
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + 'dlpr/getListDem', msg, {headers: headers})
      .map(res => res.json());
  }
  
  getDemandeIj(dmdIj: string){
    const msg = {
      data : dmdIj
    }
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host +'ij/getDemandeIj', msg, {headers: headers})
      .map(res => res.json());
  }


}


