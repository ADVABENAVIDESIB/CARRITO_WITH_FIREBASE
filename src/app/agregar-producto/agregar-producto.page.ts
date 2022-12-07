/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/semi */
import { ProductsService } from './../services/products.service';
import { Producto } from './../model/producto';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { PRIMARY_OUTLET } from '@angular/router';

//import { FormControl, FormGroup, Validators } from '@angular/forms';
//aqui haremos lo de agregar
@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.page.html',
  styleUrls: ['./agregar-producto.page.scss'],
})
export class AgregarProductoPage implements OnInit {

  public producto: Producto


  constructor(
    private productsService: ProductsService,private alertController: AlertController, private toastController: ToastController
  ) {
    this.producto = {
      img:"",
      name: "",
      price: 0,
      amount: 0
    }

  }

  ngOnInit() {}
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Guardado',
      subHeader: 'Aviso: ',
      message: 'Se guardo correctamente!',
      buttons: ['OK'],
    });

    await alert.present();
  }
  async presentAlertError() {
    const alert = await this.alertController.create({
      header: 'Alerta',
      subHeader: 'Aviso: ',
      message: 'NO se guardo, ingrese todos los campos!',
      buttons: ['OK'],
    });

    await alert.present();
  }

    async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'GUARDADO CORRECTAMENTE!',
      duration: 1500,
      position,
      color:'success'
    });

    await toast.present();
  }

  public addProduct() {
    if(this.producto.name!==''&&this.producto.img!==''&&this.producto.price!=0){
     
      this.productsService.newProducto(this.producto);
     // this.productsService.addProduct(this.producto);
      this.producto = {
        img:"",
        name:"",
        price: 0,
        amount: 0
      }
      //this.presentAlert();
      this.presentToast("top")

    }else{
      this.presentAlertError()
    }
  }
}
