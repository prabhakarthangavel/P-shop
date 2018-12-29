import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';

import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { AuthService } from './auth.service';
import { AuthGuardService } from './auth-guard.service';
import { UserService } from './user.service';
import { CategoryService } from './category.service';
import { ProductSaveService } from './product-save.service';
import { AdminAuthGuardService } from './admin-auth-guard.service';
import { ShoppingCartService } from './shopping-cart.service';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { ProductFilterComponent } from './product/product-filter/product-filter.component';
import { ProductCardComponent } from './product-card/product-card.component';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent,
    ProductFormComponent,
    ProductFilterComponent,
    ProductCardComponent
  ],
  imports: [
    CustomFormsModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase, 'lasthope'),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    RouterModule.forRoot([
      { path: '', component:HomeComponent},
      { path: 'home', component:HomeComponent},
      { path: 'login', component:LoginComponent},
      { path: 'products', component: ProductsComponent },

      { path: 'shopping-cart', component:ShoppingCartComponent, canActivate:[AuthGuardService]},
      { path: 'app-checkout', component:CheckOutComponent, canActivate:[AuthGuardService]},
      { path: 'app-ordersuccess', component:OrderSuccessComponent, canActivate:[AuthGuardService]},
      { path: 'app-my-orders', component:MyOrdersComponent, canActivate:[AuthGuardService]},

      { path: 'admin/products/new', component:ProductFormComponent, canActivate:[AuthGuardService,AdminAuthGuardService]},
      { path: 'admin/products/:id', component:ProductFormComponent, canActivate:[AuthGuardService,AdminAuthGuardService]},
      { path: 'admin/products', component:AdminProductsComponent, canActivate:[AuthGuardService,AdminAuthGuardService]},
      { path: 'admin/orders', component:AdminOrdersComponent, canActivate:[AuthGuardService,AdminAuthGuardService]},
      
    ])
  ],
  providers: [
    AuthService,
    AuthGuardService,
    AdminAuthGuardService,
    UserService,
    CategoryService,
    ProductSaveService,
    ShoppingCartService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
