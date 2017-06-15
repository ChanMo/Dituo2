import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { Article } from './article';
import { Config } from '../config';

@Injectable()
export class ArticleService {
  private nextPage: string;
  public listEnd: boolean = false;

  constructor(private http: Http) {}

  getDetail(id: number): Observable<Article> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    //headers.append('Authorization', 'Token ' + Config.token);
    return this.http.get(
      Config.apiUrl + 'article/' + id + '/',
      { headers: headers }
    )
    .map(this.extraData)
    .catch(this.handleErrors);
  }

  getList(categoryId: number): Observable<Article[]> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    //headers.append('Authorization', 'Token ' + Config.token);

    let url:string;

    if (this.nextPage === undefined) {
      url = Config.apiUrl + 'article/';
    } else {
      url = this.nextPage;
    }


    return this.http.get(
      url + '?category=' + categoryId,
      { headers: headers }
    )
    .map((response:Response) => {
      let body = response.json();
      this.nextPage = body.next;
      if (body.next === null) {
        this.listEnd = true;
      }
      return body.results;
    })
    .catch(this.handleErrors);
  }

  private extraData(res: Response) {
    let body = res.json();
    // console.log(body.data);
    return body || { };
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
    //console.log(JSON.stringify(error.json()));
    console.log(errMsg);
    return Observable.throw(errMsg);
  }

  // getList(): Promise<Article[]> {
  //   return Promise.resolve(ARTICLES);
  // }

  //getDetail(id: number): Article {
  //  return ARTICLES[id-1];
  //  // return ARTICLES.find(detail => detail.id === 1);
  //  /** list not the array, maybe is because es5 **/
  //  //return this.getList().then(
  //  //  //list => list.find(detail => detail.id === id)
  //  //  list => list[0]
  //  //);
  //}
}
