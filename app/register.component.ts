import { Component } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';

import dialogs = require('ui/dialogs');

import { User } from './shared/user/user';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'register',
  providers: [AuthService],
  templateUrl: 'register.component.html',
  styleUrls: ['member.css']
})

export class RegisterComponent {
  name: string;
  mobile: number;
  code: string;
  inputCode: string;
  password: string;
  repassword: string;

  validCode: string;
  validCodeSend: boolean;
  lastTime: number = 60;

  is_prepassword_error: Boolean = false;

  constructor(
    private routerExtensions: RouterExtensions,
    private authService: AuthService
  ) {}

  checkMobile() {
    if (!this.mobile) {
      return false;
    }
    if(!(/^1[34578]\d{9}$/.test(this.mobile.toString()))){
      return false;
    } 
    return true;
  }

  getCode() {
    // valid mobile number 
    if(!this.checkMobile()) {
      dialogs.alert("请输入正确的手机号码");
      return false;
    }

    var self = this;
    this.validCodeSend = true;
    setTimeout(function(){
      self.validCodeSend = false;
    }, 60000);
    //var timer = setInterval((function(self){
    //  if(self.lastTime) {
    //    self.lastTime--;
    //  }else{
    //    self.lastTime = 60;
    //    clearInterval(timer);
    //  }
    //})(this), 1000);
    var timer = setInterval(function(){
      if(self.lastTime) {
        self.lastTime--;
      }else{
        self.lastTime = 60;
        clearInterval(timer);
      }
    }, 1000);

    this.authService.getCode(this.mobile)
      .subscribe(result => {
        this.validCode = result.code;
        dialogs.alert("验证码发送成功");
      });
  }

  register() {
    if(!this.checkMobile()) {
      dialogs.alert("请输入正确的手机号码");
      return false;
    }
    if (!this.inputCode) {
      dialogs.alert('请输入验证码');
      return false;
    }
    if (this.validCode != this.inputCode) {
      dialogs.alert("验证码错误");
      return false;
    }
    if (!this.name) {
      dialogs.alert('请输入姓名');
      return false;
    }
    if (!this.password) {
      dialogs.alert('请输入密码');
      return false;
    }
    if (this.password != this.repassword) {
      this.is_prepassword_error = true;
      return false;
    }
    this.authService.register(this.name, this.mobile, this.password, this.code)
    .subscribe(result => {
      console.log(result);
      this.routerExtensions.navigate(['/'], { clearHistory:true });
    });
  }
}
