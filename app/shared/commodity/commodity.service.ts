import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Commodity } from './commodity';
import { Config } from '../config';

@Injectable()
export class CommodityService {
  constructor(private http: Http) {}

  getList(categoryId: number): Observable<Commodity[]> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    //headers.append('Authorization', 'Token ' + Config.token);

    let url = Config.apiUrl + 'commodity/?category=' + categoryId;
    console.log(url);
    return this.http.get(
      url,
      { headers: headers }
    )
    .map(res => res.json().results)
    .catch(this.handleErrors);
  }

  getDetail(id: number): Observable<Commodity> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(
      Config.apiUrl + 'commodity/' + id + '/',
      { headers: headers }
    ).map(response => response.json())
    .catch(this.handleErrors);
  }

  private extraData(res: Response) {
    let body = res.json();
    return body || {};
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
