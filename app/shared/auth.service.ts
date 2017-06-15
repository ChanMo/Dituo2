import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

import { User } from './user/user';
import { Config } from './config';

@Injectable()
export class AuthService {
  redirectUrl: string;

  constructor(private http: Http) {}

  checkLogin(): boolean {
    if (Config.token) {
      return true;
    } else {
      return false;
    }
  }

  getInfo() {
    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    headers.append('Authorization', 'Token ' + Config.token);
    return this.http.get(
      Config.apiUrl + 'me/',
      { headers: headers }
    ).map(response => response.json())
    .catch(this.handleErrors);
  }

  getCode(mobile:number) {
    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.get(
      Config.apiUrl + 'send_sms/' + mobile + '/',
      { headers: headers }
    ).map(response => response.json())
    .catch(this.handleErrors);
  }

  resetPassword(
    oldPassword: string,
    newPassword: string
  ): Observable<any> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Token ' + Config.token);
    return this.http.post(
      Config.apiUrl + 'reset-password/',
      {"old_password":oldPassword,"new_password":newPassword},
      {headers:headers}
    ).map(response => {
      return response.json();
    }).catch(this.handleErrors);
  }

  login(mobile:number, password: string): Observable<boolean> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(
      Config.apiUrl + 'token-auth/',
      {username: mobile, password: password },
      { headers: headers }
    )
    .map(response => {
      let result = response.json();
      Config.token = result.token;
    })
    .catch(this.handleErrors);
  }

  register(
    name:string,
    mobile:number,
    password:string,
    code:string
  ): Observable<any> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(
      Config.apiUrl + 'register/',
      {name:name, mobile: mobile, password: password, code: code},
      {headers: headers}
    ).map(response => {
      console.log(response);
      let result = response.json();
      Config.token = result.token;
    }).catch(response => {
      let result = response.json();
      alert('手机号码已经被注册');
      return Observable.throw(result.message);
    });
  }

  logout(): void {
    Config.token = '';
  }

  private handleErrors(error: Response | any) {
    console.dir(error);
    let errMsg: string;
    let alertMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
      alertMsg = errMsg;
    } else {
      errMsg = error.message ? error.message : error.toString();
      alertMsg = 'error';
    }
    console.log(alertMsg);
    return Observable.throw(errMsg);
  }
}
