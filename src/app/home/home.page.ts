import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  message = '';
  messages = [];
  currentUser = '';
  uidsocket = '';
  constructor(private socket: Socket) { }

  ngOnInit() {
    this.socket.connect();

    let name = `user-${new Date().getTime()}`;
    this.currentUser = name;

    this.socket.emit('set-name', name);
    this.socket.on('esrconectado', (users: any) => {
      this.uidsocket = users;
      console.log(users)
    })
    this.socket.on('actuaGPS', (dta: any) => {
      console.log(dta)
    })
  }
  ionViewWillLeave() {
    this.socket.disconnect();
  }

}
