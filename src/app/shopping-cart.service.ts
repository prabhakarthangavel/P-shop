import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { __await } from 'tslib';
// import 'rxjs/add/operator/take';  
import { take } from 'rxjs/operators';
import { productInterface } from './product';
import { shoppingCart } from './shopping-cart';
import { Observable, observable } from 'rxjs';
import { map } from 'rxjs/operators'


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

  // async get():Promise<Observable<shoppingCart>>{
  //   let cartId = await this.getOrCreateCartId()
  //   return this.db.object('/shopping-cart/' + cartId).snapshotChanges()
  //     .map(x => new shoppingCart(x.items));
  // }

  async get(): Promise<Observable<shoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    // need correction acation:any
    return this.db.object('/shopping-cart/' + cartId).snapshotChanges().map((action:any) => {
        // const key = action.key;
        const items = action.payload.val().items;
        return new shoppingCart(items);
    });
   }

//   async get(): Promise<Observable<shoppingCart>> {
//     let cartId = await this.getOrCreateCartId();
//     return this.db.object('/shopping-carts/' + cartId).valueChanges()
//         .pipe(map((a:any) => {
//         console.log(a);
//     return new shoppingCart(a.items);
//     }
// ));
// }


  async getOrCreateCartId():Promise<string>{
    let cartId = localStorage.getItem('cartID');
    if(cartId){
      return cartId;  
    }
    if(!cartId){
      let result = await this.create();
        // get the ID in result and store it in localStorage
        localStorage.setItem('cartID',result.key);
        return result.key;
      }
    }

  // getItem(cartId:string,productId:string){
  //   return this.db.object('/shopping-cart/' + cartId + '/items/' + productId);   
  // }

  // async addToCart(product:productInterface){
  //   
  //   const cartID = await this.getOrCreateCartId();
  //   
  //   const item$ = this.db.object('/shopping-cart/' + cartID + '/items/' + product.key);
  //   
  //   item$.snapshotChanges().pipe(take(1)).subscribe(item=>{
  //     if(item.payload.exists()) item$.update({ quantity:item.payload.numChildren() + 1});
  //     else item$.set({product:product,quantity:1});
  //   });
  // }
  // }
  // async addToCart(product: productInterface) {   
  //   // this is to get the cartID    
  //   const cartId = await this.getOrCreateCartId(); 
  //   // this is to store the items to the cart      
  //   const item$ = this.getItem(cartId,product.key);
  //   // taking data from firebase  
  //    item$.snapshotChanges().pipe(take(1)).subscribe(item => {      
  //       // item$.update({ product:product, quantity: (item.payload.numChildren() || 0) + 1 }); 
  //       if(item.payload.val()) item$.update({ quantity: item.payload.val().quantity + 1 });
  //         else item$.set({product:product,quantity:1});        
  //       });   
  // }   

  addToCart(product:productInterface){  
    this.updateItemQuantity(product, 1);
  }

  removeFromCart(product:productInterface){
    this.updateItemQuantity(product, -1);
  }

  private async updateItemQuantity(product: productInterface,change:number) {
    // await till it create the cartid using async
    const cartId = await this.getOrCreateCartId();
    // product interface will go into items and create in firebase
    const item = this.db.object('/shopping-cart/' + cartId + '/items/' + product.key);
    // item$ observable will till item creates an item in firebase
    const item$ = item.snapshotChanges();
    item$.pipe(take(1)).subscribe((data: any) => {
      // if (data.payload.val()) {
      if (data.payload.exists()) {
        const p = { key: data.payload.key, ...data.payload.val() };
        item.update({ quantity: p.quantity + change });
      } else {
        item.set({ product: product, quantity: 1 });
      }
    });
  } 
  }

