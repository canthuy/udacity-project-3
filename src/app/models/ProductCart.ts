import { Product } from './Product';

export interface ProductCart extends Product {
  quantity: number;
}
