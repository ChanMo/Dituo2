import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PageRoute, RouterExtensions } from 'nativescript-angular/router';
import 'rxjs/add/operator/switchMap';

import * as utils from 'utils/utils';
import dialogs = require('ui/dialogs');

import { Product } from './shared/product/product';
import { ProductService } from './shared/product/product.service';
import { TaskService } from './shared/product/task.service';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'task-info',
  templateUrl: 'taskInfo.component.html',
  providers: [ProductService, TaskService, AuthService],
})

export class TaskInfoComponent implements OnInit {
  product: Product;
  is_received: Boolean;
  task_id: number;

  constructor(
    private router: Router,
    private pageRoute: PageRoute,
    private routerExtensions: RouterExtensions,
    private productService: ProductService,
    private taskService: TaskService,
    private authService: AuthService,
  ) {
    this.product = new Product(0,'','',0,'','','','',[]);
  }

  ngOnInit() {
    this.pageRoute.activatedRoute
      .switchMap(activatedRoute => activatedRoute.params)
      .forEach(params => this.productService.getDetail(+params['id'])
        .subscribe(detail => {
          this.product = detail;
          this.checkReceived();
        })
      );
  }

  checkReceived() {
    this.productService.checkReceived(this.product.id).subscribe(result => {
      this.is_received = result.result;
      this.task_id = result.task;
    });
  }

  showDialogs() {
    dialogs.confirm({
      message: '确定领取任务?',
      okButtonText: '确定',
      cancelButtonText: '取消',
    }).then(result => {
      if (result) {
        if (!this.authService.checkLogin()) {
          this.router.navigate(['/login']);
        } else {
          this.createTask();
        }
      }
    });
  }

  createTask() {
    this.taskService.create(
      this.product.id,
      this.product.name,
      this.product.point,
    ).subscribe(
      result => {
        dialogs.alert('任务领取成功');
        this.is_received = true;
        this.task_id = result.id;
      }
    )
  }

  goBack() {
    this.routerExtensions.back();
  }

}
