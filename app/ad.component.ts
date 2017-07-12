import { Component, OnInit, OnDestroy } from '@angular/core';
import { Page } from 'ui/page';
import { RouterExtensions } from 'nativescript-angular/router';

import { Ad } from './shared/ad';
import { AdService } from './shared/ad.service';

@Component({
  selector: 'ad',
  providers: [AdService],
  templateUrl: 'ad.component.html'
})

export class AdComponent implements OnInit, OnDestroy {
  ad: Ad;
  time: number = 5;
  timer: any;

  constructor(
    private page: Page,
    private routerExtensions: RouterExtensions,
    private adService: AdService
  ) {
    this.ad = new Ad('','','');
    this.page.actionBarHidden = true;
  }

  ngOnInit() {
    this.getDetail();
    let self = this;
    self.time = 5;
    this.timer = setInterval(function() {
      self.time--;
    }, 1000);
    setTimeout(function(){
      self.routerExtensions.navigate(['/main'], { clearHistory: true});
    }, 5000);
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

  getDetail() {
    this.adService.getDetail().subscribe(
      detail => this.ad = detail
    );
  }

  skip() {
    this.routerExtensions.navigate(['/main'], { clearHistory: true});
  }
}
