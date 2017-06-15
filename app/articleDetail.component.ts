import { Component, OnInit } from '@angular/core';
import { PageRoute } from 'nativescript-angular/router';
import { RouterExtensions } from 'nativescript-angular/router';
import 'rxjs/add/operator/switchMap';

import { Article } from './shared/article/article';
import { ArticleService } from './shared/article/article.service';

@Component({
  selector: 'article_detail',
  providers: [ArticleService],
  templateUrl: 'articleDetail.component.html',
  styleUrls: ['article.css']
})

export class ArticleDetailComponent implements OnInit {
  id: number;
  article: Article;

  constructor(
    private articleService: ArticleService,
    private pageRoute: PageRoute,
    private routerExtensions: RouterExtensions,
  ) {
    this.article = new Article(0,'','','','');
    this.pageRoute.activatedRoute.switchMap(
      activatedRoute => activatedRoute.params
    ).forEach((params) => { this.id = params['id']; });
  }

  ngOnInit(): void {
    this.getDetail();
  }

  getDetail(): void {
    this.articleService.getDetail(this.id).subscribe(
      detail => this.article = detail
    );
  }

  goBack() {
    this.routerExtensions.back();
  }
}
