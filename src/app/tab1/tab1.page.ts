import { Component,ChangeDetectorRef } from '@angular/core';
import { BluetoothSerial } from '@awesome-cordova-plugins/bluetooth-serial/ngx';
import { AlertController ,ToastController} from '@ionic/angular';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
 devices;
 dataSend = "";
 idaddress="";
 isConnected=false;
 Datosrecivido:String="no hay Datos";
  constructor(private cdr: ChangeDetectorRef,private toastCtrl: ToastController,private alertCtrl: AlertController,private alertController:AlertController,private bluetoothSerial: BluetoothSerial) {

  	this.ActivarBluetooh()
  	this.Readdato()  
  }
 Readdato(){
 	 this.bluetoothSerial.subscribeRawData().subscribe((data)=>{

  this.bluetoothSerial.read().then((dd) => {
 	if(dd)
    //this.showError("se lee  "+dd)
	this.Datosrecivido = dd
    this.cdr.detectChanges(); // either here
    return;
   });
 })

}
verifica(){
	this.bluetoothSerial.isConnected().then((dat)=>{

  		this.isConnected=true
  		this.cdr.detectChanges();
  	},err=>{
  		this.showToast(err)
  	})
}
  ActivarBluetooh(){
  	this.bluetoothSerial.isEnabled().then(res=>{ 
  	  		//console.log("esta encendido")
  	  		this.showToastErr("bluetooth encendido "+res)
  	  		this.verifica()
  	  		this.DevicesList()
  	  		this.bluetoothSerial.readRSSI().then((data)=>{
			this.showError(data)
		})
  	  		}).catch(err=>{
  	  			this.showToastErr("bluetooth no encendido"+err)
  	  		//	console.log("esta apagado")
  	  		})
  }
  connect(address:string) {

this.bluetoothSerial.connect(address).subscribe(success => {
this.deviceConnected();
this.idaddress=address;
this.verifica()
this.isEnabled("Conectado correctamente");
}, error => {
this.showToastErr("No se ha podido conectar, algo ha fallado."+address);
this.verifica()
})
}
deviceConnected() {
this.bluetoothSerial.subscribe("\n").subscribe(success => {
this.handleData(success);
//this.showToast("Conectado correctamente")
}, error => {
this.showToastErr(error); 
})
}
handleData(data) {
//Montar aquí el sistema para tratar la entrada desde el dispositivo al que nos hemos conectado.
this.showToast(data);
}
sendData(dataToSend: String) {
this.dataSend = "\n";
this.dataSend += ["dataToSend","1"];
this.bluetoothSerial.write(this.dataSend).then(success => {
this.showToast(success);
}, error => {
this.showError(error);
})
} 
async showError(msg) {
const alert = await this.alertController.create({
      cssClass: 'my-custom-class',  
      header: 'Alert',
      subHeader: 'Message',
      message: ''+msg,
      buttons: ['OK']
    });

    await alert.present();
}
async showToast(message) {
let toast = await this.toastCtrl.create({
	position:'top',
	color:'success',
message: message,
duration: 5000
});
await toast.present();
}
async showToastErr(message) {
let toast = await this.toastCtrl.create({
	position:'bottom',
	color:'danger',
message: message,
duration: 5000
});
await toast.present();
}
  DevicesList(){
  	this.bluetoothSerial.list().then(res=>{
 	this.devices = res
 	console.log(res)
  	}).catch(err=>{
  		this.isEnabled("list "+err)
  	

  	})
  }
  Desconectar(){
  	this.bluetoothSerial.disconnect()
  }

  async isEnabled(msg){
  	  const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      subHeader: 'Subtitle',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

}
