import { Component, OnInit } from "@angular/core";
import * as platformModule from "tns-core-modules/platform";

import { Device } from './shared/device';
import { DeviceService } from './shared/device.service';
import { AuthService } from './shared/auth.service';
//import * as app from "tns-core-modules/application";
//import * as platform from "tns-core-modules/platform";
//
//console.log(app.android);
//var context = android.content.Context;
//var wifiManager = app.android.context.getSystemService(context.WIFI_SERVICE);
//var wInfo = wifiManager.getConnectionInfo();
//var mac = wInfo.getMacAddress();
//console.log(mac);

@Component({
    selector: "main",
    providers: [DeviceService, AuthService],
    templateUrl: "app.component.html",
})
export class AppComponent implements OnInit {
  device: Device;

  constructor(
    private deviceService: DeviceService,
    private authService: AuthService,
  ) {}
  ngOnInit() {
    if (this.authService.checkLogin()) {
      // if login,
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
      this.deviceService.update(this.device).subscribe(result => {
        console.log(result);
      });
    }
  }
}
