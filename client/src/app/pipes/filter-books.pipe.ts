import { Pipe, PipeTransform } from '@angular/core';
import { Book } from '../interfaces/Book';

@Pipe({
  name: 'filterBooks'
})
export class FilterBooksPipe implements PipeTransform {

  transform(books: Book[], search: string): Book[] {
    return books.filter(b => b.title.toLowerCase().includes(search.toLowerCase()));
  }

}
