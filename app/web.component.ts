import { Component } from '@angular/core';
import { PageRoute, RouterExtensions } from 'nativescript-angular/router';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'web',
  templateUrl: 'web.component.html'
})

export class WebComponent {
  link: string;

  constructor(
    private pageRoute: PageRoute,
    private routerExtensions: RouterExtensions,
  ) {
    this.pageRoute.activatedRoute.switchMap(
      activatedRoute => activatedRoute.params
    ).forEach((params) => { this.link = params['link']; });
  }

  goBack() {
    this.routerExtensions.back();
  }
}
