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
  categories() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.host + 'rh-service/categories')
      .map(res => res.json());
  }
  classes() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.host + 'rh-service/classes')
      .map(res => res.json());
  }
  echellons() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.host + 'rh-service/echellons')
      .map(res => res.json());
  }
  fonction(name: string) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.host + 'rh-service/fonction/' + name)
      .map(res => res.json());
  }
}
