import { Component, Input, OnInit, OnChanges, ViewChild, ElementRef } from '@angular/core';

import { PullToRefresh } from 'nativescript-pulltorefresh';

import { Commodity } from './shared/commodity/commodity';
import { CommodityService } from './shared/commodity/commodity.service';
import { Category } from './shared/commodity/category';

@Component({
  selector: 'commodity-list',
  providers: [CommodityService],
  templateUrl: 'commodityList.component.html'
})

export class CommodityListComponent implements OnInit, OnChanges {
  @Input() category: number;
  @Input() search: string;

  commodityList: Commodity[];

  constructor(
    private commodityService: CommodityService,
  ) {}

  ngOnInit() {
    this.getList();
  }

  ngOnChanges(changes) {
    this.getList();
  }

  getList() {
    this.commodityService.getList(this.category, this.search)
      .subscribe(list => this.commodityList = list);
  }

  refreshList(args) {
    let self = this;
    setTimeout(function() {
      self.getList();
      (<PullToRefresh>args.object).refreshing = false;
    }, 1000);
  }
}
