import { Component, OnInit } from '@angular/core';
import { PageRoute } from 'nativescript-angular/router';
import { RouterExtensions } from 'nativescript-angular/router';
import 'rxjs/add/operator/switchMap';

import { Category } from './shared/product/category';
import { CategoryService } from './shared/product/category.service';

@Component({
  selector: 'product-category',
  providers: [CategoryService],
  templateUrl: 'categoryDetail.component.html'
})

export class CategoryDetailComponent implements OnInit {
  id: number;
  category: Category;

  constructor(
    private categoryService: CategoryService,
    private pageRoute: PageRoute,
    private routerExtensions: RouterExtensions,
  ) {
    this.category = new Category(0, '', '');
    this.pageRoute.activatedRoute
      .switchMap(activatedRoute => activatedRoute.params)
      .forEach((params) => this.id = +params['id']);
  }

  ngOnInit() {
    this.getDetail();
  }

  getDetail() {
    this.categoryService.getDetail(this.id)
      .subscribe(detail => this.category = detail);
  }

  goBack() {
    this.routerExtensions.back();
  }

}
