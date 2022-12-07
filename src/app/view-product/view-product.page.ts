import { ProductsService } from './../services/products.service';
import { Producto } from './../model/producto';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.page.html',
  styleUrls: ['./view-product.page.scss'],
})
export class ViewProductPage implements OnInit {

  producto: Producto

  constructor(
    private activatedRoute: ActivatedRoute,
    private productsService: ProductsService
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      const res = paramMap.get('id');
      this.producto = this.productsService.getProductById(res);
    })
  }

}
