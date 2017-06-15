import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Config } from '../config';
import { Code } from './code';

@Injectable()
export class CodeService {
  constructor(private http: Http) {}

  getDetail(): Observable<Code> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Token ' + Config.token);
    return this.http.get(
      Config.apiUrl + 'code/',
      { headers: headers }
    ).map(response => response.json())
    .catch(this.handleErrors);
  }

  private handleErrors(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.log(errMsg);
    return Observable.throw(errMsg);
  }
}
