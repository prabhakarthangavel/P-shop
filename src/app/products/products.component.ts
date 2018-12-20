import { Component } from '@angular/core';
import { ProductSaveService } from 'src/app/product-save.service';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/switchMap'; 


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent{
  // product array to for the client side filter
  products:any[]=[];
  filteredProducts:any[]=[];
  category: string;

  constructor(productService:ProductSaveService,
              private route:ActivatedRoute) { 
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
}

  

