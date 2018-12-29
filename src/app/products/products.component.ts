import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductSaveService } from 'src/app/product-save.service';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/switchMap'; 
import { ShoppingCartService } from '../shopping-cart.service';
import { Subscription, Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { shoppingCart } from '../shopping-cart';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit,OnDestroy{
  // product array to for the client side filter
  products:any[]=[];
  filteredProducts:any[]=[];
  category: string;
  cart:any;
  subscription: Subscription;
  cart$: Observable<shoppingCart>;

  constructor(private db:AngularFireDatabase,
              productService:ProductSaveService,
              private route:ActivatedRoute,
              private cartService:ShoppingCartService) { 
        

    productService.getAll()
      .switchMap(products => {
        this.products = products;
        return route.queryParamMap;
      })
      .subscribe(params => {
        this.category = params.get('category');
  
      // to get the filtered the products
      this.filteredProducts = (this.category) ?
          this.products.filter(p=> p.category === this.category) :
          this.products;
    });
}
  // async ngOnInit(){
  //   this.subscription = await this.cartService.get().snapshotChanges()
  //    .subscribe(cart=>this.cart =cart.payload.val());
  // } 
  async ngOnInit(){
    this.subscription = (await this.cartService.get())
    .subscribe(cart=> this.cart = cart)
    }
  
//   async ngOnInit() {
//     this.cart$ = await this.cartService.get();
// }


  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}

  

