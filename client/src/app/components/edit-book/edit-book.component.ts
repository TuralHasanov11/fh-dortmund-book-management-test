import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Book } from 'src/app/interfaces/Book';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {

  @Input() book: Book = {
    id: 0,
    title: '',
    author: '',
    description: '',
    cover_image: ''
  }

  @Output() onUpdateBook = new EventEmitter();

  success = false

  form = this.formBuilder.group({
    title: [this.book.title, Validators.required, Validators.maxLength(255)],
    author: [this.book.author, Validators.required, Validators.maxLength(255)],
    description: new FormControl<string>('', [
      Validators.required
    ]),
    cover_image: new FormControl('', []),
  });

  get title() {
    return this.form.controls.title as FormControl
  }

  ngOnChanges(changes: SimpleChanges) {
    this.form.patchValue({
      title: changes["book"].currentValue.title,
      author: changes["book"].currentValue.author,
      description: changes["book"].currentValue.description,
    })
  }

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
      this.bookService.updateBook(this.book, formData).subscribe((book) => {
        this.onUpdateBook.emit(book)
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
