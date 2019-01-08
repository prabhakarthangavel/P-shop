import { Component, Input } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { productInterface } from '../product';
import { shoppingCart } from '../shopping-cart';

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent {
 @Input('product') product:productInterface;
 @Input('shopping-Cart') shoppingCart:shoppingCart;
  constructor(private cartService:ShoppingCartService) { }
  
  addToCart(){
    //you can dirctly give this.product when you use @Input for Interface
   this.cartService.addToCart(this.product);
  }

  removeFromCart(){
    this.cartService.removeFromCart(this.product);
  }

}
