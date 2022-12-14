import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/interfaces/Book';
import { BookService } from 'src/app/services/book.service';
import { FormControl } from '@angular/forms';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})

export class BooksComponent implements OnInit {

  search = new FormControl();
  loading = false
  books: Book[] = []
  searchValue = ''

  editedBook: Book = {
    id: 0,
    title: '',
    author: '',
    description: '',
    cover_image: '',
  }

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.loading = true
    this.bookService.getBooks().subscribe(books => {
      this.books = books
      this.loading = false
    })
  }

  onDelete(book: Book) {
    this.bookService.deleteBook(book.id).subscribe(() => (this.books = this.books.filter(b => b.id !== book.id)))
  }

  addBook(book: Book) {
    this.books.unshift(book)
  }

  updateBook(book: Book) {
    this.books = this.books.map(b => {
      if (b.id == book.id) {
        return book
      }
      return b
    })
  }

  selectBookToEdit(book: Book) {
    this.editedBook = book
  }

  searchBooks() {
    this.bookService.getBooks(this.search.value).subscribe(books => (this.books = books))
  }

}
