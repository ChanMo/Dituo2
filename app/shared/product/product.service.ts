import { Injectable }               from '@angular/core';
import { Http, Headers, Response }  from '@angular/http';
import { Observable }               from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Product }                  from './product';
import { Config }                   from '../config'; 

@Injectable()
export class ProductService {
  constructor(private http: Http) {}

  getList(categoryId: number): Observable<Product[]> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    //headers.append('Authorization', 'Token ' + Config.token);
    return this.http.get(
      Config.apiUrl + 'product/?category=' + categoryId,
      { headers: headers }
    )
    .map(response => response.json().results)
    .catch(this.handleErrors);
  }

  getDetail(id: number): Observable<Product> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    //headers.append('Authorization', 'Token ' + Config.token);
    return this.http.get(
      Config.apiUrl + 'product/' + id + '/',
      { headers: headers }
    )
    .map(this.extraData)
    .catch(this.handleErrors)
  }

  checkReceived(id: number) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Token ' + Config.token);
    return this.http.get(
      Config.apiUrl + 'product/' + id + '/check/',
      { headers: headers }
    )
    .map(response => {
      console.dir(response);
      return response.json()
    })
    .catch(this.handleErrors)
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
