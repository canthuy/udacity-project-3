import { ProductCart } from './../../models/ProductCart';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpService } from './../../services/http.service';
import { Product } from './../../models/Product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product | undefined;
  @Output() addProduct: EventEmitter<ProductCart> = new EventEmitter();
  qty: number = 1;

  quantityList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  constructor(private httpService: HttpService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit() {
    const item = {
      ...this.product,
      quantity: this.qty,
    };

    this.addProduct.emit(item as ProductCart);
  }

  onClick(id?: number) {
    this.router.navigate([`product/detail/${id}`]);
  }
}
