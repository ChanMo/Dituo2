import { Component } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { AuthService } from './shared/auth.service';
import dialogs = require('ui/dialogs');

@Component({
  selector: 'password',
  templateUrl: 'password.component.html',
  providers: [AuthService],
})

export class PasswordComponent {
  oldPassword: string;
  newPassword: string;
  rePassword: string;

  constructor(
    private authService: AuthService,
    private routerExtensions: RouterExtensions,
  ){}

  reset() {
    if(!this.oldPassword) {
      dialogs.alert('请输入旧密码');
      return false;
    }
    if(!this.newPassword) {
      dialogs.alert('请输入新密码');
      return false;
    }
    if(!this.rePassword) {
      dialogs.alert('请输入确认密码');
      return false;
    }
    if(this.newPassword != this.rePassword) {
      dialogs.alert('新密码输入不一致');
      return false;
    }
    this.authService.resetPassword(this.oldPassword,this.newPassword).subscribe(
      result => {
        this.oldPassword = '';
        this.newPassword = '';
        this.rePassword = '';
        dialogs.alert(result.msg);
      }
    );
  }

  goBack() {
    this.routerExtensions.back();
  }
}
