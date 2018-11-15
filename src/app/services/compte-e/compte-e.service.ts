import { Injectable } from '@angular/core';
import { Globals } from '../Global';

@Injectable()
export class CompteEService {
  host: string = this.global.host;
  constructor(private global: Globals) { }

}
