import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BluetoothSerial } from '@awesome-cordova-plugins/bluetooth-serial/ngx';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { AuthService } from './auth.service';

const param = window.localStorage.getItem("token");
const config: SocketIoConfig = { url: 'http://192.168.1.8:1313', options: { query: { "token": param } } };


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [HttpClientModule, BrowserModule, FormsModule, ReactiveFormsModule, SocketIoModule.forRoot(config), IonicModule.forRoot(), AppRoutingModule],
  providers: [AuthService, BluetoothSerial, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule { }
