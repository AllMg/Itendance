import { Injectable } from '@angular/core';
import {BasemodelService} from '../base/basemodel.service';
import {Headers} from '@angular/http';

@Injectable()
export class ServiceRhService extends BasemodelService {
  service(name: string) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.host + 'rh-service/service/' + name)
      .map(res => res.json());
  }
  categorie() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.host + 'rh-service/categories')
      .map(res => res.json());
  }
}
