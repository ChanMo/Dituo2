import { Component, OnInit }      from '@angular/core';
import { Router } from '@angular/router';
import { PageRoute }              from 'nativescript-angular/router';
import { RouterExtensions } from 'nativescript-angular/router';
import 'rxjs/add/operator/switchMap';

import * as utils from 'utils/utils';
import dialogs = require('ui/dialogs');

import { Product }            from './shared/product/product';
import { AuthService }        from './shared/auth.service';
import { ProductService }     from './shared/product/product.service';
import { TaskService }        from './shared/product/task.service';

@Component({
  selector: 'product-detail',
  moduleId: module.id,
  providers: [ProductService, TaskService, AuthService],
  templateUrl: 'productDetail.component.html',
  styleUrls: ['product.css']
})

export class ProductDetailComponent implements OnInit {
  product: Product;
  is_received: Boolean;
  task_id: number;

  constructor(
    private router: Router,
    private productService: ProductService,
    private taskService : TaskService,
    private pageRoute: PageRoute,
    private routerExtensions: RouterExtensions,
    private authService: AuthService,
  ) {
    this.product = new Product(0,'','',0,'','','','',[]);
  }

  ngOnInit() {
    this.getDetail();
  }

  openUrl() {
    utils.openUrl(this.product.link);
  }

  checkReceived() {
    this.productService.checkReceived(this.product.id).subscribe(result => {
      this.is_received = result.result;
      this.task_id = result.task;
    });
  }

  showTask() {
    dialogs.confirm({
      title: "任务说明",
      message: this.product.task,
      okButtonText: this.is_received ? "查看" : "接受",
      cancelButtonText: "取消",
    }).then(result => {
      if (result) {
        if (!this.authService.checkLogin()) {
          this.router.navigate(['/login']);
        } else {
          if (this.is_received) {
            /** if already received **/
            this.router.navigate(['/task', this.task_id]);
          } else {
            this.taskService.create(
              this.product.id,
              this.product.name,
              this.product.point
            ).subscribe(
              result => {
                dialogs.alert('任务领取成功');
                this.is_received = true;
                this.task_id = result.id;
                console.log('task_id: ');
                console.log(this.task_id);
              }
            );
          }
        }
      }
    });
  }

  getDetail() {
    this.pageRoute.activatedRoute
      .switchMap(activatedRoute => activatedRoute.params)
      .forEach(params => this.productService.getDetail(+params['id'])
      .subscribe(detail => {
        this.product = detail;
        this.checkReceived();
      }));
  }

  goBack() {
    this.routerExtensions.back();
  }
}
