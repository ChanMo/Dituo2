import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { Page } from 'ui/page';
import * as utils from 'utils/utils';

import { User } from './shared/user/user';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'member',
  providers: [AuthService],
  templateUrl: './member.component.html',
  styleUrls: ['member.css']
})

export class MemberComponent implements OnInit {
  user: User;
  iconRight: string;

  constructor(
    private page: Page,
    private routerExtensions: RouterExtensions,
    private authService: AuthService
  ) {
    this.user = new User();
  }

  ngOnInit() {
    this.iconRight = String.fromCharCode(0xf130);
    //this.page.actionBarHidden = true;
    if (this.authService.checkLogin()) {
      this.authService.getInfo().subscribe(info => this.user = info);
    } else {
      this.user.first_name = '点击登录';
    }
  }
}
