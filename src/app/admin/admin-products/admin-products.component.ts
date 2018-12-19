import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductSaveService } from 'src/app/product-save.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html', 
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products;
  filteredProducts: any[];
  subscription: Subscription;

  constructor(private productService:ProductSaveService) { 
    this.subscription = this.productService.getAll()
      .subscribe(products => this.filteredProducts = this.products = products);
  }

  // Filtering based on the product title
  filter(query:string){
    this.filteredProducts = (query) ?
      this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
      this.products;

  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
 
  ngOnInit() {
  }

}
