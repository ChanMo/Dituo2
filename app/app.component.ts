import { Component } from "@angular/core";

import { registerElement } from 'nativescript-angular/element-registry';
import { PullToRefresh } from 'nativescript-pulltorefresh';
registerElement('pullToRefresh', 
  () => require('nativescript-pulltorefresh').PullToRefresh);

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
    templateUrl: "app.component.html",
})
export class AppComponent {}
