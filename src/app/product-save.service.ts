import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class ProductSaveService {

  constructor(private db:AngularFireDatabase) { }

  // this will crete the new item in Products in firebase
  create(product){
    return this.db.list('/products').push(product);
  }

  // this will return the contents to the table for editing
  getAll(){
    return this.db.list('/products').snapshotChanges()
    .map(actions => actions.map(a => ({ key: a.key, ...a.payload.val() })));
  }

  // to get the data for the EDIT page in the products
  get(productID){
    return this.db.object('/products/' + productID);
  }

  update(productID,product){
    return this.db.object('/products/'+productID).update(product);
  }

  delete(productID){
    return this.db.object('/products/' + productID).remove();
  }
}
 