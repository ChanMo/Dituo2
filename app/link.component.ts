import { Component, OnInit } from '@angular/core';
import * as utils from 'utils/utils';

@Component({
  selector: 'link',
  template: '<Label text="办信用卡"></Label>',
})

export class LinkComponent implements OnInit {
  ngOnInit() {
    utils.openUrl('http://www.baidu.com');
  }
}
