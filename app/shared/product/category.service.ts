import { Injectable }               from '@angular/core';
import { Http, Headers, Response }  from '@angular/http';
import { Observable }               from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { Category }                 from './category';
import { Config }                   from '../config';

@Injectable()
export class CategoryService {
  constructor(private http: Http) {}

  getList(): Observable<Category[]> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    //headers.append('Authorization', 'Token ' + Config.token);

    return this.http.get(
      Config.apiUrl + 'product/category/',
      { headers: headers }
    )
    .map(res => res.json())
    .catch(this.handleErrors);
  }

  getDetail(id: number): Observable<Category> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    //headers.append('Authorization', 'Token ' + Config.token);

    //console.log(id);
    return this.http.get(
      Config.apiUrl + 'product/category/' + id + '/',
      { headers: headers }
    )
    .map(this.extraData)
    //.map(res => res.json())
    //.map(data => new Category(
    //  data.id,
    //  data.name,
    //  data.cover
    //))
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
    //console.log(errMsg);
    return Observable.throw(errMsg);
  }
}
