import { Component } from '@angular/core';
import { RouterExtensions } from  'nativescript-angular/router';

import { User } from './shared/user/user';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'info',
  providers: [AuthService],
  templateUrl: './info.component.html',
})

export class InfoComponent {
  user: User;
  constructor(
    private authService: AuthService,
    private routerExtensions: RouterExtensions,
  ) {
    this.user = new User();
    this.authService.getInfo().subscribe(info => this.user = info);
  }

  logout(): void {
    this.authService.logout();    
    this.routerExtensions.navigate(['/'], { clearHistory: true });
  }

  goBack() {
    this.routerExtensions.back();
  }
}
