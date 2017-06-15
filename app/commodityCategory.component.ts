import { Component, OnInit } from '@angular/core';

import { Category } from './shared/commodity/category';
import { CategoryService } from './shared/commodity/category.service';

@Component({
  selector: 'commodity-category',
  providers: [CategoryService],
  templateUrl: 'commodityCategory.component.html'
})

export class CommodityCategoryComponent implements OnInit {
  categoryList: Category[];

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.getCategoryList();
  }

  getCategoryList() {
    this.categoryService.getList().subscribe(list=>this.categoryList = list);
  }
}
