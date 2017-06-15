import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';

import { Commodity } from './shared/commodity/commodity';
import { CommodityService } from './shared/commodity/commodity.service';
import { Category } from './shared/commodity/category';

@Component({
  selector: 'commodity-list',
  providers: [CommodityService],
  templateUrl: 'commodityList.component.html'
})

export class CommodityListComponent implements OnInit {
  @Input() category: number;
  commodityList: Commodity[];

  constructor(
    private commodityService: CommodityService,
  ) {}

  ngOnInit() {
    this.getList();
  }

  getList() {
    this.commodityService.getList(this.category)
      .subscribe(list => this.commodityList = list);
  }
}
