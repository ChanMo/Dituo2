import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core'
import { Page } from 'ui/page';

import { PullToRefresh } from 'nativescript-pulltorefresh';
import { Article } from './shared/article/article';
import { ArticleService } from './shared/article/article.service';

@Component({
  selector: 'article-list',
  providers: [ArticleService],
  templateUrl: 'articleList.component.html',
  styleUrls: ['article.css'],
})

export class ArticleListComponent implements OnInit, OnChanges {
  @Input() category: number;
  @Input() search: string;

  articleList: Article[];

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    this.getList();
  }

  ngOnChanges(changes) {
    this.articleService.listEnd = false;
    this.articleService.nextPage = undefined;
    this.getList();
  }

  getList(): void {
    this.articleService.getList(this.category, this.search)
      .subscribe(list => this.articleList = list);
  }

  loadMoreItems() {
    if (this.articleService.listEnd == false) {
      this.articleService.getList(this.category, this.search)
        .subscribe(list => this.articleList = this.articleList.concat(list));
    }
  }

  refreshList(args) {
    let self = this;
    setTimeout(function() {
      self.articleService.listEnd = false;
      self.articleService.nextPage = undefined;
      self.getList();
      (<PullToRefresh>args.object).refreshing = false;
    }, 1000);
  }
}
