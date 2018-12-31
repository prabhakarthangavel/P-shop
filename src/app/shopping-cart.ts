import { shoppingCartItemInterface } from './shopping-cart-item';

export class shoppingCart{
    items:shoppingCartItemInterface[] = [];

    constructor(public itemsMap: {[productId:string]:shoppingCartItemInterface}){
        // pushing the itemsMap of productId into items, so we can iterate easily in shoppincart.html
        for(let productId in itemsMap) {
            let item = itemsMap[productId];
            // new object refers construct of shoppingCartItemInterface
            this.items.push(new shoppingCartItemInterface(item.product, item.quantity));
        }
    }
    get totalPrice(){
        let sum=0;
        for(let productId in this.items)
            sum += this.items[productId].totalPrice;
        return sum;
    }
    // this is to get the total count 
    get totalItemsCount(){
        let count=0;
        for(let productId in this.itemsMap)
         count += this.itemsMap[productId].quantity;
        return count;   
    }
}