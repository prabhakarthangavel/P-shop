import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/category.service';
import { ProductSaveService } from 'src/app/product-save.service';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  //used to get assign the values from categories
  categories$;
  product:any={};  
  id;

  constructor(private router:Router,
              private route:ActivatedRoute,
              categoryService:CategoryService,
              private productService:ProductSaveService) {
    this.categories$ = categoryService.getCategories();

    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id) this.productService.get(this.id).valueChanges().take(1).subscribe(p=>this.product = p);
   }
   
  // update item with product id and product contents or create the new product
  save(product){
    if(this.id) this.productService.update(this.id,product);
    else this.productService.create(product);
    
    this.router.navigate(['/admin/products']);
  }

  delete(){
    if(!confirm("Are you sure you want to delete this?")) return;
    
    this.productService.delete(this.id);

    this.router.navigate(['/admin/products']);
  }

  ngOnInit() {
  }
  

}
