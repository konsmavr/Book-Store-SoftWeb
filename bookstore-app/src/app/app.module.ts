import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';  // Import FormsModule

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ClientsComponent } from './clients/clients.component';
import { BooksComponent } from './books/books.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { ViewOrderComponent } from './view-order/view-order.component';
import { CartComponent } from './cart/cart.component';

import { AuthService } from './services/auth.service';
import { BookService } from './services/book.service';
import { CartService } from './services/cart.service'; 


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ClientsComponent,
    BooksComponent,
    OrderSummaryComponent,
    ViewOrderComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    
  ],
  providers: [
    AuthService,
    BookService,
    CartService 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
