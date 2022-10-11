import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book, BookCreate } from '../interfaces/Book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private apiUrl = "http://127.0.0.1:8000/api"

  constructor(private http: HttpClient) { }

  getBooks(search: string = ''): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl + `/books`, {
      params: {
        search
      }
    })
  }

  getBook(id: number): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl + `/books/${id}`)
  }

  deleteBook(id: number): Observable<string> {
    return this.http.delete<string>(this.apiUrl + `/books/${id}`)
  }

  createBook(book: any): Observable<Book> {
    return this.http.post<Book>(this.apiUrl + `/books`, book)
  }

  updateBook(book: Book, data: any): Observable<Book> {
    return this.http.post<Book>(this.apiUrl + `/books/${book.id}`, data)
  }


}
