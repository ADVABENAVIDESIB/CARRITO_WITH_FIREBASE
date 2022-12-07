/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
/* eslint-disable curly */
/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable prefer-const */
/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/ban-types */
import { Injectable } from '@angular/core';
import { Producto } from '../model/producto';
 
import { map } from 'rxjs/operators'
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private productos: Producto[];
  private productosEnCarro: Producto[];
  constructor(private firestore:AngularFirestore) {
    this.productosEnCarro = [];
   /*  this.productos=[
      {
        id:"1",
        img:"https://picsum.photos/id/684/600/400",
        name:"Galletas",
        price:15,
        amount:0,
      },
      {
        id:"2",
        img:"https://picsum.photos/id/685/600/400",
        name:"Refresco",
        price:22,
        amount:0,
      },
      {
        id:"3",
        img:"https://picsum.photos/id/686/600/400",
        name:"Papas",
        price:15,
        amount:0,
      }
    ] */
    this.getProductos().subscribe(
      res => {
        this.productos = res;
        console.log(this.productos);
      }
    )
   }
   public getProducts(): Producto[]{
    return this.productos;
   }

    public getProductById(id: String): Producto {
      let item: Producto;
      item = this.productos.find( producto =>{
        return producto.id===id;
      })
      item.amount = item.amount + 1;
      return item;
    }
    public addProduct(newProduct: Producto){
      this.productos.push(newProduct);
    }

    public removeProductFromCart(ind: number){
     this.productosEnCarro.splice(ind,1);
    }

    public llenaCarro(): Producto[] {
      return this.productosEnCarro;
    }
    public addProductById(i: number) {
      this.getProductos().subscribe(
        res => {
          this.productos = res;
          console.log(this.productos);

        }
      )
      let index=-1;
      index=this.already(this.productos[i].id)
      if(index===-1){
      this.productosEnCarro.push(this.productos[i]);
      this.productosEnCarro[this.productosEnCarro.length-1].amount+=1;
      }
      else{
          this.productosEnCarro[index].amount+=1;
      }
      
    }
    public already(id: String): number {
      for (let i = 0; i < this.productosEnCarro.length; i++) {
        if(this.productosEnCarro[i].id===id)
          return i
      }
      return -1
    }
    //firebase
    public getProductos(): Observable<Producto[]> {
      return this.firestore.collection('productos').snapshotChanges().pipe(
        map(actions=> {
          return actions.map(a=>{
            console.log(a);
            const data = a.payload.doc.data() as Producto;
            console.log(data);
            const id = a.payload.doc.id;
            return { id,...data};
          })
        })
      )
    }
    public getProductoById(id: string) {
      let result= this.firestore.collection("productos").doc(id).valueChanges();
      return result;
    }
    public newProducto(producto: Producto) {
      this.firestore.collection('productos').add(producto);
    }
    public removeProducto(id: string){
      this.firestore.collection("productos").doc(id).delete();
    }

    //carrito
    public updateCarrito(productos: Producto[],id:string) {
      this.firestore.collection('students').doc(id).update(productos)
     }
     public addProductosToCart(productos: Producto[]) {
      this.firestore.collection('productosEnCarrito').add(productos);
    }
/*
    public addProductoToCart(producto: Producto) {
      this.firestore.collection('productosEnCarrito').add(producto);
    }
    public getProductosFromCart(): Observable<Producto[]> {
      
      return this.firestore.collection('productosEnCarrito').snapshotChanges().pipe(
        map(actions=> {
          return actions.map(a=>{
            console.log(a);
            const data = a.payload.doc.data() as Producto;
            console.log(data);
            const id = a.payload.doc.id;
            return { id,...data};
          })
        })
      )


    }

    public removeProductoFromCart(nombre: string){
      this.firestore.collection("productosEnCarrito").doc(nombre).delete();
    }*/
}
