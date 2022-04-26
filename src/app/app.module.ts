import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BluetoothSerial } from '@awesome-cordova-plugins/bluetooth-serial/ngx';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

const config: SocketIoConfig = { url: 'http://localhost:1313', options: {} };


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,SocketIoModule.forRoot(config), IonicModule.forRoot(), AppRoutingModule],
  providers: [BluetoothSerial,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
