import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ShoppingCartService } from '../shopping-cart.service';
import { Observable } from 'rxjs';
import { shoppingCart } from '../shopping-cart';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  // this is observable of shoppingCart you can give like cart$: Observable<ShoppingCart>
  cart$;

  constructor(public auth:AuthService,
              private cartService:ShoppingCartService) { }

  async ngOnInit(){
    this.cart$ = await this.cartService.get();
      }

  logout(){
    this.auth.logout();
  }

}