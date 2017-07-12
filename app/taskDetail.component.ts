declare var android: any;
import { Component, OnInit } from '@angular/core';
import { PageRoute } from 'nativescript-angular/router';
import { RouterExtensions } from 'nativescript-angular/router';
import 'rxjs/add/operator/switchMap';

import * as platformModule from "tns-core-modules/platform";
import dialogs = require('ui/dialogs');

var observable = require('data/observable');
var permissions = require("nativescript-permissions");
var imagepickerModule = require("nativescript-imagepicker");
var fs = require('file-system');

import { Task } from './shared/product/task';
import { TaskService } from './shared/product/task.service';

@Component({
  selector: 'task-detail',
  providers: [TaskService],
  templateUrl: 'taskDetail.component.html',
  styleUrls: ['task.css']
})

export class TaskDetailComponent implements OnInit {
  id: number;
  task: Task;
  image: string;
  imagePath: string;
  imageFile: any;
  name: string;
  mobile: string;

  constructor(
    private pageRoute: PageRoute,
    private taskService: TaskService,
    private routerExtensions: RouterExtensions,
  ) {
    this.task = new Task(0,'',0,'',0,'',0,'','','','');
    this.pageRoute.activatedRoute.switchMap(
      activatedRoute => activatedRoute.params
    ).forEach((params) => { this.id = params['id']; });
  }

  ngOnInit() {
    this.getDetail();
  }

  getDetail() {
    this.taskService.getDetail(+this.id).subscribe(
      detail => this.task = detail
    );
  }

  getPoint() {
    this.taskService.update(this.task.id).subscribe(result => {
      this.task.status = 5;
      dialogs.alert("领取成功");
    });
  }

  submit() {
    this.taskService.submit(this.task.id, this.name, this.mobile)
      .subscribe(result => {
      this.task.status = 2;
      dialogs.alert("提交成功");
    });
  }

  uploadImage() {
    this.taskService.uploadImage(this.task.id, this.imagePath);
    dialogs.alert("提交成功");
    this.task.status = 2;
    this.image = '';
  }

  choiceImage() {
    let context = imagepickerModule.create({
      mode: "single"
    });
    let obj = this;

    if (platformModule.device.os === "Android" && parseInt(platformModule.device.sdkVersion) >= 23) {
      permissions.requestPermission(
        android.Manifest.permission.READ_EXTERNAL_STORAGE,
        "需要访问您的图片信息"
      )
      .then(function() {
        console.log('pass');
        obj.startSelection(context); // can not use this
      })
      .catch(function() {
        console.log('refuse');
      });
    } else {
      this.startSelection(context);
    }
  }

  startSelection(context) {
    context.authorize().then(() => {
      return context.present();
    }).then((selection) => {
      this.image = selection[0].thumb;
      this.imagePath = selection[0].fileUri;
      this.imageFile = selection[0];
    }).catch((e) => {
      console.log(e);
    });
  }

  goBack() {
    this.routerExtensions.back();
  }
}
