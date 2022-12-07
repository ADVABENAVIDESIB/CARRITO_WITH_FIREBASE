import { Component } from '@angular/core';
import { Producto } from '../model/producto';
import { ProductsService } from '../services/products.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public productos: Producto[];

  public procuctosEnCarrito: Producto[]=[];
  constructor(private productservice: ProductsService, private ruta: Router) {
   
   // this.productos=this.productservice.getProducts();
   this.productservice.getProductos().subscribe(
    res => {
      this.productos = res;
      console.log(this.productos);
    }
  )
  }


  public addProductById(i: number){
    this.productservice.addProductById(i);
  }

  public navigateCart(){
    this.ruta.navigate(['/view-cart']);
  }
}
