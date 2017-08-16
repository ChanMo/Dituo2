import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { Shortcut } from './shortcut';

@Injectable()
export class ShortcutService {
  constructor(private http: Http) {}

  getList(): Observable<Shortcut[]> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(
      'http://dituo.chirongkeji.com/shortcut/user/',
      { headers: headers }
    )
    .map(res => res.json())
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
    return Observable.throw(errMsg);
  }
}
