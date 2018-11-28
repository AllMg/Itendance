import { Injectable } from '@angular/core';
import {Headers, Http} from '@angular/http';
import { Globals } from '../Global';

@Injectable()
export class BasemodelService {
  public host: string = this.global.host;
  constructor(public http: Http, private global: Globals) { }

}
