/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/type-annotation-spacing */
/* eslint-disable radix */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/prefer-for-of */
import { ProductsService } from './../services/products.service';
import { Producto } from './../model/producto';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.page.html',
  styleUrls: ['./view-cart.page.scss'],
})
export class ViewCartPage implements OnInit {

  productList: Producto[];

  public total:number=0;
  constructor(
    private productsService: ProductsService,
    private activatedRoute: ActivatedRoute
  ) {
    this.total = 0;
    this.productList=[{
      id: "",
      img: "",
      name: "ss",
      price: 0,
      amount: 0,
    }]
  }

  ngOnInit() {
   this.activatedRoute.queryParams.subscribe((params) => {
      this.productList = this.productsService.llenaCarro();
    });
    for (let i = 0; i < this.productList.length; i++) {
      this.total+=(this.productList[i].price*this.productList[i].amount);
    } 
/*     this.productsService.getProductosFromCart().subscribe(
      res => {
        this.productList = res;
        console.log(this.productList);
        console.log("hola carrito");
      }
    ) */

  }
  public removeProductoFromCart(id: number){    
    this.total=0;
    this.productsService.removeProductFromCart(id);
    for (let index = 0; index < this.productList.length; index++) {
      let price = this.productList[index].price;
      let amount = this.productList[index].amount;
      this.total += price * amount;
      console.log(id);
    }
  }

}
