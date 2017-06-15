import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';

@Component({
  selector: 'contact',
  templateUrl: 'contact.component.html',
  styleUrls: ['contact.css']
})

export class ContactComponent implements OnInit {
  constructor(
    private routerExtensions: RouterExtensions,
  ) {}

  contactList = [];

  ngOnInit(): void {
    let qq = 'http://img.hb.aicdn.com/90a7e1196d131c39f46c689ea70fe5f064757d966d31-vRd998_fw658';
    let wechat = 'http://img.hb.aicdn.com/70190c539be94f80e6c11f7d1ff1941f0054840eb4dc-HlWsXP_fw658';
    this.contactList.push({'icon':qq,'content':'QQ 888888'});
    this.contactList.push({'icon':qq,'content':'QQ 888888'});
    this.contactList.push({'icon':qq,'content':'QQ 888888'});
    this.contactList.push({'icon':wechat,'content':'微信 888888'});
    this.contactList.push({'icon':wechat,'content':'微信 888888'});
  }

  goBack() {
    this.routerExtensions.back();
  }
}
