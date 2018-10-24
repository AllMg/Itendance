import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import {Globals} from '../../Global';

@Injectable()
export class DynamicAtmpService {
  host: string = this.global.host;

  constructor(private http: Http, private global: Globals) {
  }

  libelle(demande: number) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.host + 'dynamicatmp/input/libelle/' + demande, {headers: headers})
      .map(res => res.json());
  }

  piece(demande: number) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.host + 'dynamicatmp/piece/libelle/' + demande, {headers: headers})
      .map(res => res.json());
  }

  libelleDAT() {
    return this.libelle(229);
  }

  pieceDAT() {
    return this.piece(229);
  }

  getType(typeAbrev: string) {
    return 'string';
  }

  findType(typeAbrv: string) {
    switch (typeAbrv) {
      case 'C': {
        return 'text';
      }
      case 'N': {
        return 'number';
      }
      case 'D': {
        return 'date';
      }
      case 'A': {
        return 'area';
      }
      case 'H': {
        return 'time';
      }
      default: {
        return 'text';
      }
    }
  }

  reference(dr: number, prestation: number) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.host + 'dynamicatmp/reference?dr=' + dr + '&prestation=' + prestation, {headers: headers})
      .map(res => res.json());
  }

  new(demande: any) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + 'dynamicatmp/demande', demande, {headers: headers})
      .map(res => res.json());
  }

  getDemandes(etat: number, pagination: number, prestation: number, size: number) {
    console.log('do get demandes');
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const url = this.host + 'dynamicatmp/demandes?etat=' + etat +
      '+&pagination=' + pagination + '&prestation=' + prestation + '&size=' + size;
    console.log(url);
    return this.http.get(url, {headers: headers})
      .map(res => res.json());
  }

  pageSize(etat: number, pagination: number, prestation: number, size: number) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.host + 'dynamicatmp/demandes/count?etat=' + etat +
      '+&pagination=' + pagination + '&prestation=' + prestation + '&size=' + size,
      {headers: headers})
      .map(res => res.json());
  }

  type() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.host + 'dynamicatmp/types', {headers: headers})
      .map(res => res.json());
  }

  getInputValue(reference: string) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.host + 'dynamicatmp/libelle/' + reference, {headers: headers})
      .map(res => res.json());
  }

  getDemande(reference: string) {
    console.log(reference);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.host + 'dynamicatmp/demande/' + reference, {headers: headers})
      .map(res => res.json());
  }

  updateEtat(reference: string, etat: number) {
    const data = {
      data: {
        etat: etat,
        idacc: reference
      }
    };
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put(this.host + 'dynamicatmp/etat', data, {headers: headers})
      .map(res => res.json());
  }

  getPrestation(idReference: string) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.host + 'dynamicatmp/prestation/' + idReference, {headers: headers})
      .map(res => res.json());
  }

  savePrestation(reference: string, listeFils: number[], dr: number) {
    const dataList = [];
    for (let i = 0; i < dataList.length; i++) {
      dataList.push({id_tec_dmd: listeFils[i]});
    }
    const data = {
      data: {
        idAccMere: reference,
        listeRefTecDmd: dataList,
        dr: dr
      }
    };
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put(this.host + 'dynamicatmp/prestation', data, {headers: headers})
      .map(res => res.json());
  }

  getPieceInfoRequise(idPiece: string) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.host + 'dynamicatmp/piece/info/' + idPiece, {headers: headers})
      .map(res => res.json());
  }

  saveReferentielle(idAcc: string, id_fille: string) {
    const data = {
      data: {
        idAccMere: idAcc,
        idAccFils: id_fille
      }
    };
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + 'dynamicatmp/referentielle', data, {headers: headers})
      .map(res => res.json());
  }

  exist(reference: string) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.host + 'dynamicatmp/demande/exist/' + reference, {headers: headers})
      .map(res => res.json());
  }

  newFactureMere(factureMere: any) {
    console.log(factureMere);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + 'dynamicatmp/fm/mere', factureMere, {headers: headers})
      .map(res => res.json());
  }

  newFactureFille(factureFille: any) {
    console.log(factureFille);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + 'dynamicatmp/fm/fille', factureFille, {headers: headers})
      .map(res => res.json());
  }

  getinfopiece(reference: string) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.host + 'dynamicatmp/getinfo/' + reference, {headers: headers})
      .map(res => res.json());
  }
  getEntite(acces:string)
  {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.host + 'dynamicatmp/getEntite/'+acces, {headers: headers})
     .map(res => res.json());
  }


  getSme(data) {
    const acces = {
      data: data
    };
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + 'dynamicatmp/sme', acces, {headers: headers})
      .map(res => res.json());
  }

  SaveIJ(data) {
    const msg = {
      data: data
    };
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + 'dynamicatmp/saveIJ', msg, {headers: headers})
      .map(res => res.json());
  }

  getmother(idaccfils: string) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.host + 'dynamicatmp/getMother/' + idaccfils, {headers: headers})
      .map(res => res.json());
  }

  getDnindiv(data) {
    const acces = {
      data: data
    };
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + 'dynamicatmp/getDNindiv', acces, {headers: headers})
      .map(res => res.json());
  }

  SaveFD3(data) {
    const msg = {
      data: data
    };
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + 'dynamicatmp/ValidateFF', msg, {headers: headers})
      .map(res => res.json());
  }

  SaveRente1(data) {
    const msg = {
      data: data
    };
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + 'dynamicatmp/saverente1', msg, {headers: headers})
      .map(res => res.json());
  }
 
   SaveRenteIPP(data)
  {
    const msg = {
      data : data
    }
    const headers = new Headers();
     headers.append('Content-Type', 'application/json');
     return this.http.post(this.host + 'dynamicatmp/ipp' ,msg,  {headers: headers})
     .map(res => res.json());
   }

  SaveRente2(data) {
    const msg = {
      data: data
    };
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + 'dynamicatmp/saverente2', msg, {headers: headers})
      .map(res => res.json());
  }


  SaveFD1(data) {
    console.log(data);
    const msg = {
      data: data
    }; 
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + 'dynamicatmp/SafeFD1', msg, {headers: headers})
      .map(res => res.json());
  }
  
  medicamentsAcc(referenceAcc: string) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.host + 'dynamicatmp/medicaments/' + referenceAcc, {headers: headers})
      .map(res => res.json());
  }

  updateFille(fille: any[]) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const data = {
      data: fille
    };
    return this.http.put(this.host + 'dynamicatmp/medicaments', data, {headers: headers})
      .map(res => res.json());
  }

  updateMere(id_mere: string, isValide: boolean, idAcc: string) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const data = {
      data: {
        idFactureMere: id_mere,
        validate: isValide,
        idAcc: idAcc
      }
    };
    return this.http.put(this.host + 'dynamicatmp/medicaments/mere', data, {headers: headers})
      .map(res => res.json());
  }

  updateFilleMontant(fille: any[]) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const data = {
      data: fille
    };
    return this.http.put(this.host + 'dynamicatmp/medicaments/montant', data, {headers: headers})
      .map(res => res.json());
  }

  saveFM(detailsFm: any, idEmpl: string, idIndividu: string) {
    const data = {
      data : {
        detailsFm: detailsFm,
        idEmpl: idEmpl,
        idIndividu: idIndividu
      }
    };
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + 'dynamicatmp/FM', data, {headers: headers})
      .map(res => res.json());
  }


  saveFP(listeDetailProthese: any[], idEmpl, idIndividu: string) {
    const data = {
      data : {
        listeDetailProthese: listeDetailProthese,
        idEmpl: idEmpl,
        idIndividu: idIndividu
      }
    };
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + 'dynamicatmp/FP', data, {headers: headers})
      .map(res => res.json());
  }
  findProthese(libelle: string) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.host + 'dynamicatmp/protheses/' + libelle, {headers: headers})
      .map(res => res.json());
  }
  findProtheseById(id: string) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.host + 'dynamicatmp/prothese/' + id, {headers: headers})
      .map(res => res.json());
  }

}
