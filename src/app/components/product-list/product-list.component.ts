import { ProductCart } from './../../models/ProductCart';
import { Component, OnInit } from '@angular/core';
import { HttpService } from './../../services/http.service';
import { Product } from './../../models/Product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  public products: Product[] = [];
  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.httpService.getAllProduct().subscribe((data) => {
      this.products = data;
    });
  }

  addToCart(product: ProductCart) {
    this.httpService.handleCart(product);

    window.alert('Added to cart');
  }
}
