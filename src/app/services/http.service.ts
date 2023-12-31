import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Product } from './../models/Product';
import { ProductCart } from '../models/ProductCart';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private httpClient: HttpClient) {}

  getAllProduct() {
    return this.httpClient.get<Product[]>(
      'http://localhost:4200/assets/data.json'
    );
  }

  handleCart(product: ProductCart) {
    let productList: ProductCart[] = JSON.parse(
      window.localStorage.getItem('cart') || '[]'
    );

    productList = productList ?? [];

    console.log(productList);

    const idx = productList?.findIndex((obj) => obj.id === product.id);
    if (idx === -1) {
      productList.push(product);
    } else if (product.quantity === 0) {
      productList.splice(idx, 1);
    } else {
      productList[idx].quantity =
        productList[idx].quantity + Number(product.quantity);
    }

    window.localStorage.setItem('cart', JSON.stringify(productList));
  }

  getListCart(): ProductCart[] {
    let productList: ProductCart[] = JSON.parse(
      window.localStorage.getItem('cart') || '[]'
    );
    return productList ?? [];
  }

  clearCart() {
    window.localStorage.clear();
  }
}
