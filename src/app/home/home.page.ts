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
  public productoAuxiliar:Producto;

  public listaAuxProductosEnCarro:Producto[];
  public productoAuxiliarCarrito:Producto;

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


/*   public addProductById(i: number){
    this.productservice.addProductById(i);
  } */
  public addProductoToCart(producto: Producto){
    this.productoAuxiliar={
      img: producto.img,
      name: producto.name,
      price: producto.price,
      amount: 1
      
    }
    this.productservice.addProductoToCart(this.productoAuxiliar);  

    /*
    var yaExistia=false;
    this.productservice.getProductosFromCart().subscribe(
      res => {
        this.listaAuxProductosEnCarro = res;
        var contador=0
        console.log(this.listaAuxProductosEnCarro.length+ "longitud");
        
        for (let index = 0; index < this.listaAuxProductosEnCarro.length; index++) {
          if(producto.name===this.listaAuxProductosEnCarro[index].name){
            //si el producto que estoy mandando agregar, ya existe aumento el precio y la cantidad
            //lo comparo por el nombee ya que el precio y cantidad cambian con el carrito
            yaExistia=true;
            this.listaAuxProductosEnCarro[index].amount+=1;
            this.listaAuxProductosEnCarro[index].price+=producto.price;
            this.productoAuxiliarCarrito=this.listaAuxProductosEnCarro[index];
          }else{
            console.log("nothing");
            
          }

        }
        if(yaExistia){
          this.productservice.updateCarrito(this.productoAuxiliarCarrito,this.productoAuxiliarCarrito.id);
        }else{
          this.productoAuxiliar={
            img: producto.img,
            name: producto.name,
            price: producto.price,
            amount: 1
            
          }
          this.productservice.addProductoToCart(this.productoAuxiliar);   

        }  
      }
    )*/
  }
  

  public navigateCart(){
    this.ruta.navigate(['/view-cart']);
  }
}
