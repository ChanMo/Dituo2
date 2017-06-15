import { Component, ElementRef, OnInit } from '@angular/core';
import { PageRoute } from 'nativescript-angular/router';
import { RouterExtensions } from 'nativescript-angular/router';
import 'rxjs/add/operator/switchMap';

import { Page } from 'ui/page';

import { Product }            from './shared/product/product';
import { Category }           from './shared/product/category';
import { ProductService }     from './shared/product/product.service';
import { CategoryService }    from './shared/product/category.service';

@Component({
  selector: 'product-list',
  providers: [ProductService, CategoryService],
  templateUrl: 'productList.component.html'
})

export class ProductListComponent implements OnInit {
  id: number;
  category: Category;
  productList: Array<Product> = [];

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private pageRoute: PageRoute,
    private routerExtensions: RouterExtensions,
  ) {
    this.pageRoute.activatedRoute
      .switchMap(activatedRoute => activatedRoute.params)
      .forEach((params) => { this.id = +params['id']; });
    this.category = new Category(0,'','');
  }

  ngOnInit() {
    this.getCategory();
    this.getList();
  }

  getCategory() {
    this.categoryService.getDetail(this.id)
      .subscribe(detail => this.category = detail);
  }

  getList() {
    this.productService.getList(this.id)
      .subscribe(list => this.productList = list);
  }

  goBack() {
    this.routerExtensions.back();
  }
}
