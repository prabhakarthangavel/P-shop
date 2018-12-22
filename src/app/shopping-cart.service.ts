import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { __await } from 'tslib';
import 'rxjs/add/operator/take';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db:AngularFireDatabase) { }

  create(){
    return this.db.list('/shopping-cart').push({
      // push the dateCreated from the default method Date()
      dateCreated: new Date().getTime()
    });
  }

  get(cartID:string){
    return this.db.object('/shopping-cart/' + cartID);
  }

  async getOrCreateCartId(){
    let cartID = localStorage.getItem('cartID');
    if(cartID){
      return cartID;  
    }
    if(!cartID){
      let result = await this.create();
        // get the ID in result and store it in localStorage
        localStorage.setItem('cartID',result.key);
        return result.key;
      }
    }

  async addToCart(product){
    // this is to get the cartID
    let cartID = await this.getOrCreateCartId();
    // this is to store the items to the cart
    let item$ = this.db.object('/shopping-cart/' + cartID + '/items/' + product.$key);
    // taking data from firebase
    item$.take(1).subscribe(item=>{
      if(item.$exists()) item$.update({ quantity:item.quantity + 1});
      else item$.set({product:product,quantity:1});
    })
  }
  }

