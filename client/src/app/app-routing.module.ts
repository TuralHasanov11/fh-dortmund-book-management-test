import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { BooksComponent } from './components/books/books.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  { path: '', component: BooksComponent, title: 'Books', },
  { path: ':id', component: BookDetailComponent },
  { path: 'redirect', redirectTo: '', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent, title: 'Not Found', }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
