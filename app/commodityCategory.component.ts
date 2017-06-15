import { Component, OnInit } from '@angular/core';

import { Category } from './shared/commodity/category';
import { CategoryService } from './shared/commodity/category.service';

@Component({
  selector: 'commodity-category',
  providers: [CategoryService],
  templateUrl: 'commodityCategory.component.html',
  styleUrls: ['commodity.css'],
})

export class CommodityCategoryComponent implements OnInit {
  categoryList: Category[];
  selectedIndex: number;

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.selectedIndex = 0;
    this.getCategoryList();
  }

  getCategoryList() {
    this.categoryService.getList().subscribe(list=>this.categoryList = list);
  }

  onChange(args) {
    this.selectedIndex = args;
  }
}
