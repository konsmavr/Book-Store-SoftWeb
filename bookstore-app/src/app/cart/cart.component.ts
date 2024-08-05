import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: any[] = [];
  total: number = 0;
  loading: boolean = false;
  errorMessage: string = '';

  constructor(private cartService: CartService, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {
    const username = this.authService.getUsername();
    if (username) {
      this.loading = true;
      this.cartService.getCart(username).subscribe(
        data => {
          this.cart = data;
          this.calculateTotal();
          this.loading = false;
        },
        error => {
          this.errorMessage = 'Failed to load cart. Please try again later.';
          this.loading = false;
        }
      );
    } else {
      this.errorMessage = 'No username found. Please log in first.';
    }
  }

  calculateTotal() {
    this.total = this.cart.reduce((sum, book) => sum + book.price, 0);
  }

  removeFromCart(bookId: number) {
    const username = this.authService.getUsername();
    if (username) {
      this.cartService.removeFromCart(username, bookId).subscribe(
        () => {
          this.cart = this.cart.filter(book => book.id !== bookId);
          this.calculateTotal();
        },
        error => {
          this.errorMessage = 'Failed to remove book from cart. Please try again later.';
        }
      );
    }
  }

  placeOrder() {
    const username = this.authService.getUsername();
    if (username) {
      this.cartService.placeOrder(username).subscribe(
        () => {
          this.cart = [];
          this.total = 0;
          alert('Order placed successfully!');
        },
        error => {
          this.errorMessage = 'Failed to place order. Please try again later.';
        }
      );
    } else {
      this.errorMessage = 'No username found. Please log in first.';
    }
  }
}
