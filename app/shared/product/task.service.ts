import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import * as applicationSettings from 'application-settings';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import * as bghttp from "nativescript-background-http";
var session = bghttp.session('image-upload');

import { Task } from './task';
import { Config } from '../config';

@Injectable()
export class TaskService {
  public nextPage: string;
  public listEnd: boolean = false;

  constructor(private http: Http) {}

  create(id: number, description: string, point: number) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization',
      'Token ' + applicationSettings.getString("Token"));
    return this.http.post(
      Config.apiUrl + 'task/',
      { "product": id, "description": description, "point": point },
      { headers: headers },
    )
    .map(response => {
      return response.json();
    })
    .catch(this.handleErrors);
  }

  update(id: number) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization',
      'Token ' + applicationSettings.getString("Token"));
    return this.http.patch(
      Config.apiUrl + 'task/' + id + '/',
      { "status": 5 },
      { headers: headers },
    )
    .map(response => response.json())
    .catch(this.handleErrors);
  }

  submit(id: number, name: string, mobile: string) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization',
      'Token ' + applicationSettings.getString("Token"));
    return this.http.patch(
      Config.apiUrl + 'task/' + id + '/',
      { "status": 2, "name": name, "mobile": mobile },
      { headers: headers },
    )
    .map(response => response.json())
    .catch(this.handleErrors);
  }

  uploadImage(id: number, image: string) {
    let pattern = /[^/]*$/;
    let imageName = image.match(pattern);
    var request = {
      url: Config.apiUrl + 'upload_screenshot/' + imageName + '?pk=' + id,
      method: "PUT",
      headers: {
        "Content-Type": "application/octet-stream",
        "Authorization": "Token " + applicationSettings.getString("Token"),
        "File-Name":  imageName
      },
      description: "{'file': '" + imageName + "'}"
    };

    var task = session.uploadFile(image, request);
    //console.dir(task);

    task.on("progress", this.logEvent);
    task.on("error", this.logEvent);
    task.on("complete", this.logEvent);

    //let headers = new Headers();
    ////headers.append('Content-Type', 'application/json');
    //headers.append('Authorization', 'Token ' + Config.token);
    ////var fd = new FormData();
    ////fd.append('screenshot', image);
    //return this.http.patch(
    //  Config.apiUrl + 'task/' + id + '/',
    //  { "screenshot": image },
    //  { headers: headers },
    //)
    //.map(response => {
    //  console.dir(response.json());
    //  return response.json();
    //})
    //.catch(this.handleErrors);
  }

  logEvent(e) {
    //console.dir(e);
    //console.log(e.error);
		//context.events.push({
		//	eventTitle: e.eventName + " " + e.object.description,
		//	eventData: JSON.stringify({
		//		error: e.error ? e.error.toString() : e.error,
		//		currentBytes: e.currentBytes,
		//		totalBytes: e.totalBytes
		//	})
		//});
    //console.log("currentBytes: " + e.currentBytes);
    //console.log("totalBytes: " + e.totalBytes);
    //console.log("eventName: " + e.eventName);
  }

  getList(): Observable<Task[]> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization',
      'Token ' + applicationSettings.getString("Token"));

    let url: string;

    if (this.nextPage === undefined) {
      url = Config.apiUrl + 'task/';
    } else {
      url = this.nextPage;
    }

    return this.http.get(
      url,
      { headers: headers }
    )
    .map(response => {
      let body = response.json();
      this.nextPage = body.next;
      if (body.next === null) {
        this.listEnd = true;
      }
      return body.results;
    })
    .catch(this.handleErrors);
  }

  getDetail(id: number): Observable<Task> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization',
      'Token ' + applicationSettings.getString("Token"));
    return this.http.get(
      Config.apiUrl + 'task/' + id + '/',
      { headers: headers }
    )
    .map(response => response.json())
    .catch(this.handleErrors)
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
