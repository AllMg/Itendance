import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { Globals } from '../Global';

@Injectable()
export class ChartService {
  host: string = this.global.host;
  constructor(private http: Http,
  private global: Globals
  ) {

   }
   camembert(debut, fin) {
     const data = {
       debut: debut,
       fin: fin
     };
      const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + 'chart/indicateur', data, {headers: headers})
      .map(res => res.json());
   }
   histo(annee) {
    const data = {
      annee: annee
    };

    const headers = new Headers();
   headers.append('Content-Type', 'application/json');
   return this.http.post(this.host + 'chart/histogramme', data, {headers: headers})
     .map(res => res.json());
  }
  soldeAnnee(debut, fin) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.host + 'chart/solde/annee/debut/' + debut + '/fin/' + fin,  {headers: headers})
      .map(res => res.json());
  }
  solde(debut, fin) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.host + 'chart/solde/debut/' + debut + '/fin/' + fin,  {headers: headers})
      .map(res => res.json());
  }
  soldePeriode(debut, fin) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.host + 'chart/solde/periode/debut/' + debut + '/fin/' + fin,  {headers: headers})
      .map(res => res.json());
  }
}
