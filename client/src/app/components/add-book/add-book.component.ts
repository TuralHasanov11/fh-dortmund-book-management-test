import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Book } from 'src/app/interfaces/Book';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})

export class AddBookComponent implements OnInit {

  @Output() onAddBook = new EventEmitter<Book>();

  success = false

  form = this.formBuilder.group({
    title: ['Book 2', Validators.required],
    author: ['Author 2', Validators.required],
    description: ['Description 2'],
    cover_image: [''],
  });

  constructor(private formBuilder: FormBuilder, private bookService: BookService) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.form.valid) {
      const formData: any = new FormData();
      formData.append('title', this.form.get('title')?.value);
      formData.append('author', this.form.get('author')?.value);
      formData.append('description', this.form.get('description')?.value);
      formData.append('cover_image', this.form.get('cover_image')?.value);
      this.form.reset()
      this.bookService.createBook(formData).subscribe((book) => {
        this.onAddBook.emit(book)
        this.success = true
      })
    }
  }

  uploadCoverImage(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.patchValue({
        cover_image: file
      });
    }
  }

}
