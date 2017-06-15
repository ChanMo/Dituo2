import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';

import { Code } from './shared/promotion/code';
import { CodeService } from './shared/promotion/code.service';

@Component({
  selector: 'code',
  templateUrl: './code.component.html',
  providers: [CodeService]
})

export class CodeComponent implements OnInit {
  code: Code;

  constructor(
    private codeService: CodeService,
    private routerExtensions: RouterExtensions,
  ) {
    this.code = new Code('','',[],0,0);
  }

  ngOnInit() {
    this.codeService.getDetail().subscribe(detail => {
      this.code = detail;
      console.log(detail);
    });
  }

  goBack() {
    this.routerExtensions.back();
  }
}
