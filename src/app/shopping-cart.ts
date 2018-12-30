import { shoppingCartItemInterface } from './shopping-cart-item';

export class shoppingCart{
    items:shoppingCartItemInterface[] = [];

    constructor(public itemsMap: {[productId:string]:shoppingCartItemInterface}){
        // pushing the itemsMap of productId into items, so we can iterate easily in shoppincart.html
        for(let productId in itemsMap)
            this.items.push(itemsMap[productId]);
    }

    // this is to get the total count 
    get totalItemsCount(){
        let count=0;
        for(let productId in this.items)
         count += this.items[productId].quantity;
        return count;   
    }
}