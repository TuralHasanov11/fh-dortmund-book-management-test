import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, Observable, retry, throwError } from 'rxjs';
import { Book, BookCreate } from '../interfaces/Book';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private apiUrl = "http://127.0.0.1:8000/api"

  constructor(private http: HttpClient, private errorService: ErrorService) { }

  getBooks(search: string = ''): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl + `/books`, {
      params: new HttpParams({
        fromObject: {
          search
        }
      })
    }).pipe(
      delay(1500),
      retry(1),
      catchError(this.errorHandler.bind(this)),
    )
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message)
    return throwError(() => error.message)
  }

  getBook(id: number): Observable<Book> {
    return this.http.get<Book>(this.apiUrl + `/books/${id}`)
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
