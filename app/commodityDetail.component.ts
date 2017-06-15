import { Component, OnInit } from '@angular/core';
import { PageRoute } from 'nativescript-angular/router';
import { RouterExtensions } from 'nativescript-angular/router';
import 'rxjs/add/operator/switchMap';

import { Commodity } from './shared/commodity/commodity';
import { CommodityService } from './shared/commodity/commodity.service';

@Component({
  selector: 'commodity-detail',
  providers: [CommodityService],
  templateUrl: 'commodityDetail.component.html'
})

export class CommodityDetailComponent implements OnInit {
  id: number;
  commodity: Commodity;

  constructor(
    private commodityService: CommodityService,
    private pageRoute: PageRoute,
    private routerExtensions: RouterExtensions,
  ) {
    this.commodity = new Commodity(0,'','',0,'');
    this.pageRoute.activatedRoute.switchMap(
      activatedRoute => activatedRoute.params
    ).forEach((params) => { this.id = params['id']; });
  }

  ngOnInit(): void {
    this.commodityService.getDetail(this.id).subscribe(
      detail => this.commodity = detail
    );
  }

  goBack() {
    this.routerExtensions.back();
  }
}
