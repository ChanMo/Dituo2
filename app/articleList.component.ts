import { Component, Input } from '@angular/core'
import { Page } from 'ui/page';

import { Article } from './shared/article/article';
import { ArticleService } from './shared/article/article.service';

@Component({
  selector: 'article-list',
  providers: [ArticleService],
  templateUrl: 'articleList.component.html',
  styleUrls: ['article.css'],
})

export class ArticleListComponent {
  @Input() category: number;
  articleList: Article[];

  constructor(
    private articleService: ArticleService,
    ) {
    console.log(this.category);
    }

  ngOnInit(): void {
    this.getList();
  }

  getList(): void {
    this.articleService.getList(this.category)
      .subscribe(list => this.articleList = list);
  }

  loadMoreItems() {
    if (this.articleService.listEnd == false) {
      this.articleService.getList(this.category)
        .subscribe(list => this.articleList = this.articleList.concat(list));
    }else {
      //console.log('over');
    }
  }
}
