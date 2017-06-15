import { Component } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';

@Component({
  selector: 'version',
  templateUrl: 'version.component.html',
})

export class VersionComponent {

  constructor(
    private routerExtensions: RouterExtensions,
  ) {}

  goBack() {
    this.routerExtensions.back();
  }
}
