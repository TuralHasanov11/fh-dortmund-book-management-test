import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/interfaces/Book';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  private router: any;
  loading: boolean = false
  book: Book = {
    id: 0,
    title: '',
    author: ''
  }

  constructor(private bookService: BookService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.router = this.route.params.subscribe(params => {
      this.loading = true
      this.bookService.getBook(+params['id']).subscribe(book => {
        this.book = book
        this.loading = false
      })
    });
  }

}
