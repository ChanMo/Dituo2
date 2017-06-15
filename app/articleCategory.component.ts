import { Component } from '@angular/core';
import { Page } from 'ui/page';

import { Category } from './shared/article/category';
import { CategoryService } from './shared/article/category.service';

@Component({
  selector: 'article-category',
  templateUrl: 'articleCategory.component.html',
  providers: [CategoryService],
  styleUrls: ['article.css'],
})

export class ArticleCategoryComponent {
  categoryList: Category[]
  selectedIndex: number;

  constructor(
    private page: Page,
    private categoryService: CategoryService){
    
    this.selectedIndex = 0;
    //this.page.actionBarHidden = false;
    this.categoryService.getList().subscribe(list=> {
	    this.categoryList=list;
    });
  }

  public onChange(args) {
    this.selectedIndex = args;
  }
}
