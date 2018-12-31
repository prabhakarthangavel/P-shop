import { productInterface } from './product';
// this is for product and quality
export class shoppingCartItemInterface {

    constructor(public product:productInterface, public quantity:number){}

    get totalPrice(){
        return this.product.price * this.quantity;
    }
}