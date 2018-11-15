import { Injectable } from '@angular/core';
import { Globals } from '../Global';
import {Headers, Http} from '@angular/http';
import {FileModel} from '../../models/file-model';
import { FormArray } from '@angular/forms';
@Injectable()
export class FileService {
  host: string = this.global.host;
  constructor(private http: Http, private global: Globals) { }
  save(file: any ) {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user !== null) {
      file.matricule = user.id_access;
    } else {
      file.matricule = 'No user';
    }
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const data = {
      data : file
    };
    return this.http.post(this.host + 'file/upload', data, {headers: headers})
      .map(res => res.json());
  }
  read(idFile: string) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.host + 'file/readByIdFile/' + idFile, {headers: headers})
      .map(res => res.json());
  }
  readQuery(fileQuery: FileModel) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const data = {
      data : fileQuery
    };
    return this.http.post( this.host + 'file/readFile', data,  {headers: headers})
      .map(res => res.json());
  }
  typeBase64(encoded: string) {
    let result = null;

    if (typeof encoded !== 'string') {
      return result;
    }

    const mime = encoded.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);

    if (mime && mime.length) {
      result = mime[1];
    }

    return result;
  }
  extensionBase64(base64) {
    const type = this.typeBase64(base64);
    const result = type.split('/');
    return result[1];
  }
  typefileBase64(base64) {
    const type = this.typeBase64(base64);
    const result = type.split('/');
    return result[0];
  }
  convertBase64(file: File, idDmd, key, callback) {
    const result = {
      file: null,
      key: null,
      idDmd: null
    };
    const myReader: FileReader = new FileReader();
    myReader.readAsDataURL(file);
    myReader.onloadend = (err) => {
      result.file = myReader.result;
      result.key = key;
      result.idDmd = idDmd;
      callback(result);
    };
  }
  updateFile(condition: any, set: FileModel) {
    const msg = {
      'condition': condition,
      'set': set
    };
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put(this.host + 'file/update', msg, { headers: headers })
      .map(res => res.json());
  }
}
