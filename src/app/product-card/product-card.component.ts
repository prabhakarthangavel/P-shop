import { Component, Input } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { productInterface } from '../product';


@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
@Input('product') product;
@Input('show-actions') showActions = true;
  constructor(private cartService:ShoppingCartService) { }

  addToCart(product: productInterface){
    return this.cartService.getOrCreateCart();
  }
}
