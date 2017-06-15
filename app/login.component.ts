import { Component, OnInit } from '@angular/core';
import { Page } from 'ui/page';
import { RouterExtensions } from 'nativescript-angular/router';

import { AuthService } from './shared/auth.service';

@Component({
  selector: 'login',
  providers: [AuthService],
  templateUrl: 'login.component.html',
  styleUrls: ['member.css']
})

export class LoginComponent implements OnInit {
  mobile: number;
  password: string;

  constructor(
    private page: Page,
    private routerExtensions: RouterExtensions,
    private authService: AuthService
  ) {}

  ngOnInit() {
  //this.page.actionBarHidden = true;
    //this.page.backgroundImage = 'res://bg';
  }

  login() {
    this.authService.login(this.mobile, this.password).subscribe(() => {
      if (this.authService.checkLogin()) {
        let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/';
        //this.router.navigate([redirect]);
        this.routerExtensions.navigate([redirect], { clearHistory: true });
      }
    });
  }
}
