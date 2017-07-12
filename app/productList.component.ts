import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { PullToRefresh } from 'nativescript-pulltorefresh';

import { Product }            from './shared/product/product';
import { ProductService }     from './shared/product/product.service';

@Component({
  selector: 'product-list',
  providers: [ProductService],
  templateUrl: 'productList.component.html'
})

export class ProductListComponent implements OnInit, OnChanges {
  @Input() category: number;
  @Input() search: string;
  productList: Array<Product> = [];

  constructor(
    private productService: ProductService,
  ) {}

  ngOnInit() {
    this.getList();
  }

  ngOnChanges(changes) {
    this.getList();
  }

  getList() {
    this.productService.getList(this.category, this.search)
      .subscribe(list => this.productList = list);
  }

  refreshList(args) {
    let self = this;
    setTimeout(function() {
      self.getList();
      (<PullToRefresh>args.object).refreshing = false;
    }, 1000);
  }
}
