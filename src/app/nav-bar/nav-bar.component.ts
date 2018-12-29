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
  cart$:Observable<shoppingCart>

  constructor(private auth:AuthService,
              private cartService:ShoppingCartService) { }

  async ngOnInit(){
    this.cart$ = await this.cartService.get();
      }

  logout(){
    this.auth.logout();
  }

}