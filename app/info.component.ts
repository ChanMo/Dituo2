import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from  'nativescript-angular/router';
import * as platformModule from "tns-core-modules/platform";

import { User } from './shared/user/user';
import { AuthService } from './shared/auth.service';
import { Device } from './shared/device';
import { DeviceService } from './shared/device.service';

@Component({
  selector: 'info',
  providers: [AuthService, DeviceService],
  templateUrl: './info.component.html',
})

export class InfoComponent implements OnInit {
  user: User;
  device: Device;
  constructor(
    private authService: AuthService,
    private deviceService: DeviceService,
    private routerExtensions: RouterExtensions,
  ) {
    this.user = new User();
    this.authService.getInfo().subscribe(info => this.user = info);
  }

  ngOnInit() {
    this.device = new Device(
      platformModule.device.model,
      platformModule.device.deviceType,
      platformModule.device.os,
      platformModule.device.osVersion,
      platformModule.device.sdkVersion,
      platformModule.device.language,
      platformModule.device.manufacturer,
      platformModule.device.uuid,
    );
    this.deviceService.update(this.device).subscribe();
  }

  logout(): void {
    this.authService.logout();    
    this.routerExtensions.navigate(['/'], { clearHistory: true });
  }

  goBack() {
    this.routerExtensions.back();
  }
}
