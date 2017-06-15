import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
// import 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Category } from './category';
import { Config } from '../config';

@Injectable()
export class CategoryService {
  constructor(private http: Http) {}

  getList(): Observable<Category[]> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    //headers.append('Authorization', 'Token ' + Config.token);

    return this.http.get(
      Config.apiUrl + 'article/category/',
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
    //console.log(errMsg);
    return Observable.throw(errMsg);
  }
}
