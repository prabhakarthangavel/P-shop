import { shoppingCartItemInterface } from './shopping-cart-item';

export class shoppingCart{
    
    constructor(public items:shoppingCartItemInterface[]){

    }
    // this is to get the total count 
    get totalItemsCount(){
        let count=0;
        for(let productId in this.items)
         count += this.items[productId].quantity;
        return count;   
    }
}