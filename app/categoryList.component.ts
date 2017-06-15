import { Component, OnInit }  from '@angular/core';
import { Category }           from './shared/product/category';
import { CategoryService }    from './shared/product/category.service';

@Component({
  selector: 'category-list',
  providers: [CategoryService],
  templateUrl: 'categoryList.component.html',
  styleUrls: ['product.css'],
})

export class CategoryListComponent implements OnInit {
  categoryList: Array<Category> = [];

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.getList();
  }

  getList() {
    this.categoryService.getList()
      .subscribe(list => {
        this.categoryList = list;
      })
  }
}
