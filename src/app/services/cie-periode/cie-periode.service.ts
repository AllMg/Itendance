import { Injectable } from '@angular/core';
import {Globals} from '../Global';
import {Headers, Http} from '@angular/http';

@Injectable()
export class CiePeriodeService {
	host: string = this.global.host;

  	constructor(private http: Http,
              private global: Globals) {
  	}
  	listeCieByEmplByAnnee(id_empl: string, periode: string ) {
  		console.log("Service");
	    const headers = new Headers();
	    headers.append('Content-Type', 'application/json');
	    const cie = {
	      employeur : id_empl,
	      item : periode
	    };
	    return this.http.post(this.host + 'cie/affiche-periode', cie, {headers: headers})
	      .map(res => res.json());
  	}
}
