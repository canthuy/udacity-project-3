import { ProductCart } from './../../models/ProductCart';
import { Product } from './../../models/Product';
import { HttpService } from './../../services/http.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.css'],
})
export class ProductItemDetailComponent implements OnInit {
  private id: number | null = null;
  public product: Product | undefined;
  qty: number = 1;

  quantityList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  constructor(
    private route: ActivatedRoute,
    private httpService: HttpService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      this.id = Number(param['id']);
    });

    this.httpService.getAllProduct().subscribe((data) => {
      this.product = data.find((o) => o.id == this.id);
    });
  }

  onSubmit() {
    const item = {
      ...this.product,
      quantity: this.qty,
    };

    this.httpService.handleCart(item as ProductCart);

    window.alert('Added to cart');
  }
}
