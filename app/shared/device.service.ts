import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import * as applicationSettings from "application-settings";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Device } from './device';
import { Config } from './config';

@Injectable()
export class DeviceService {

  constructor(private http: Http) {}

  update(device: Device): Observable<boolean> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization',
      'Token ' + applicationSettings.getString("Token"));

    return this.http.post(
      Config.apiUrl + 'device/',
      device,
      { headers: headers }
    ).map(response => response.json())
    .catch(this.handleErrors);
  }

  private handleErrors(error: Response | any) {
    console.dir(error);
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
