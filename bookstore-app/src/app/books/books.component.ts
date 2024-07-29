import { Component, OnInit } from '@angular/core';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  books: any[] = [];
  newBook: any = { title: '', price: 0, imageUrl: '' };

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks() {
    this.bookService.getBooks().subscribe(data => {
      this.books = data;
    });
  }

  createBook() {
    if (this.newBook.title.trim() && this.newBook.price > 0) {
      this.bookService.createBook(this.newBook).subscribe(book => {
        this.books.push(book);
        this.newBook = { title: '', price: 0, imageUrl: '' };
      });
    }
  }

  editBook(id: number) {
    // Implement edit logic
  }

  deleteBook(id: number) {
    this.bookService.deleteBook(id).subscribe(() => {
      this.books = this.books.filter(book => book.id !== id);
    });
  }
}
