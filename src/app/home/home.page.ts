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
  constructor(private socket:Socket) { }

  ngOnInit() {
  	this.socket.connect()
  }
    ionViewWillLeave() {
    this.socket.disconnect();
  }

}
