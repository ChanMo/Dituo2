import { Component } from '@angular/core';
import { SegmentedBar, SegmentedBarItem } from 'ui/segmented-bar';

@Component({
  selector: 'main',
  templateUrl: 'main.component.html'
})

export class MainComponent {
  public footerBg = '~/footer1.png';
  public items: Array<SegmentedBarItem>;
  public selectedIndex = 0;
  public visibility1 = true;
  public visibility2 = false;
  public visibility3 = false;
  public visibility4 = false;

  constructor() {
    this.items = [];
    let tmpSegmentedBar1: SegmentedBarItem = <SegmentedBarItem>new SegmentedBarItem();
    tmpSegmentedBar1.title = '';
    let tmpSegmentedBar2: SegmentedBarItem = <SegmentedBarItem>new SegmentedBarItem();
    tmpSegmentedBar2.title = '';
    let tmpSegmentedBar3: SegmentedBarItem = <SegmentedBarItem>new SegmentedBarItem();
    tmpSegmentedBar3.title = '';
    let tmpSegmentedBar4: SegmentedBarItem = <SegmentedBarItem>new SegmentedBarItem();
    tmpSegmentedBar4.title = '';
    this.items.push(tmpSegmentedBar1);
    this.items.push(tmpSegmentedBar2);
    this.items.push(tmpSegmentedBar3);
    this.items.push(tmpSegmentedBar4);
    this.selectedIndex = 0;
  }

  public onSelectedIndexChange(args) {
    let segmentedBar = <SegmentedBar>args.object;
    this.selectedIndex = segmentedBar.selectedIndex;
    //console.log(this.selectedIndex);
    switch (this.selectedIndex) {
      case 0:
        this.visibility1 = true;
        this.visibility2 = false;
        this.visibility3 = false;
        this.visibility4 = false;
        this.footerBg = '~/footer1.png';
        break;
      case 1:
        this.visibility1 = false;
        this.visibility2 = true;
        this.visibility3 = false;
        this.visibility4 = false;
        this.footerBg = '~/footer2.png';
        break;
      case 2:
        this.visibility1 = false;
        this.visibility2 = false;
        this.visibility3 = true;
        this.visibility4 = false;
        this.footerBg = '~/footer3.png';
        break;
      case 3:
        this.visibility1 = false;
        this.visibility2 = false;
        this.visibility3 = false;
        this.visibility4 = true;
        this.footerBg = '~/footer4.png';
        break;
      default:
        break;
    }
  }
}
