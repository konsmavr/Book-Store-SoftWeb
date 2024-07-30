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
  editBookData: any = { id: null, title: '', price: 0, imageUrl: '' };
  isEditing: boolean = false;

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

  startEdit(book: any) {
    this.isEditing = true;
    this.editBookData = { ...book };
  }

  editBook() {
    if (this.editBookData.title.trim() && this.editBookData.price > 0) {
      this.bookService.editBook(this.editBookData.id, this.editBookData).subscribe(updatedBook => {
        const index = this.books.findIndex(b => b.id === updatedBook.id);
        if (index !== -1) {
          this.books[index] = updatedBook;
        }
        this.isEditing = false;
        this.editBookData = { id: null, title: '', price: 0, imageUrl: '' };
      });
    }
  }

  cancelEdit() {
    this.isEditing = false;
    this.editBookData = { id: null, title: '', price: 0, imageUrl: '' };
  }

  deleteBook(id: number) {
    this.bookService.deleteBook(id).subscribe(() => {
      this.books = this.books.filter(book => book.id !== id);
    });
  }
}
