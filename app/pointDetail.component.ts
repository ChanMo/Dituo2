import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';

import { Point } from './shared/point/point';
import { PointService } from './shared/point/point.service';

@Component({
  selector: 'point',
  providers: [PointService],
  templateUrl: 'pointDetail.component.html',
  styleUrls: ['point.css'],
})

export class PointDetailComponent implements OnInit {
  point: Point;
  constructor(
    private pointService: PointService,
    private routerExtensions: RouterExtensions,
  ) {
    this.point = new Point(0, [])
  }
  ngOnInit() {
    this.getDetail();
  }
  getDetail() {
    this.pointService.getDetail().subscribe(detail => this.point = detail);
  }

  goBack() {
    this.routerExtensions.back();
  }
}
