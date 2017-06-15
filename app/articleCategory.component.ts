import { Component } from '@angular/core';
import { Page } from 'ui/page';

import { Category } from './shared/article/category';
import { CategoryService } from './shared/article/category.service';

@Component({
  selector: 'article-category',
  templateUrl: 'articleCategory.component.html',
  providers: [CategoryService],
})

export class ArticleCategoryComponent {
  categoryList: Category[]

  constructor(
    private page: Page,
    private categoryService: CategoryService){
    //this.page.actionBarHidden = false;
    this.categoryService.getList().subscribe(list=>this.categoryList=list);
  }
}
