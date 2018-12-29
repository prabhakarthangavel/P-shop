import { Component, Input } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { productInterface } from '../product';
import { shoppingCart } from '../shopping-cart';


@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  //these are interfaces
@Input('product') product:productInterface;
@Input('show-actions') showActions = true;
@Input('shopping-Cart') shoppingCart:shoppingCart;
  constructor(private cartService:ShoppingCartService) { }

  addToCart(){
    //you can dirctly give this.product when you use @Input for Interface
   this.cartService.addToCart(this.product);
  }

  removeFromCart(){
    this.cartService.removeFromCart(this.product);
  }

  getQuantity(){
    if(!this.shoppingCart) return 0;
    let item = this.shoppingCart.items[this.product.key];
    return item ? item.quantity : 0;
  }
}
