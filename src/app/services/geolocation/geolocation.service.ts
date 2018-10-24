import { Injectable } from '@angular/core';
import {Http} from '@angular/http';

@Injectable()
export class GeolocationService {

  constructor(private http: Http) { }

  getPlace(lat: number, long: number) {
    return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + long + '&sensor=true&key=AIzaSyB2BCmO_ChT0XBXgNy6PyZJtE3JkllrEOw')
      .map(res => res.json());
  }

}
