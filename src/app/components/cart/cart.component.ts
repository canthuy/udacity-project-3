import { Router } from '@angular/router';
import { HttpService } from './../../services/http.service';
import { ProductCart } from './../../models/ProductCart';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  products: ProductCart[] = [];
  totalPrice: number = 0;

  formInfo!: FormGroup;

  constructor(
    private httpService: HttpService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createFrom();
    this.getData();
  }

  private getData() {
    this.products = this.httpService.getListCart();
    this.totalPrice = this.products.reduce((total, item) => {
      const money: number = item.price * item.quantity;
      return total + money;
    }, 0);
  }

  private createFrom() {
    this.formInfo = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      address: ['', [Validators.required, Validators.minLength(6)]],
      creditCard: ['', [Validators.required, Validators.minLength(16)]],
    });
  }

  onChange(product: ProductCart, event: number) {
    const item = {
      ...product,
      quantity: event != 0 ? event - product.quantity : 0,
    };

    this.httpService.handleCart(item as unknown as ProductCart);

    this.getData();
    if (event == 0) {
      setTimeout(() => {
        window.alert('Remove from cart');
      }, 0);
    }
  }

  onSubmit() {
    const firstName = this.formInfo.value.firstName;
    this.httpService.clearCart();
    this.router.navigate(['success'], {
      queryParams: {
        firstName,
        totalPrice: this.totalPrice,
      },
    });
  }
}
