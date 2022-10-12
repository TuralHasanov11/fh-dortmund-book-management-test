<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Book;
use App\Http\Requests\BookRequest;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class BookController extends Controller
{
    
   
    public function index(Request $request)
    {
        if($search = $request->query('search')){
            $books = Book::where('title', 'ilike', '%'.$search.'%')->get();
        }else{
            $books = Book::all();
        }

        return response($books);
    }


    public function store(BookRequest $request)
    {   
        $validated = $request->validated();
        $book = new Book;
        $book->title = $validated['title'];
        $book->author = $validated['author'];
        $book->description = $validated['description'];

        if ($request->hasFile('cover_image')) {
            $coverImage = $request->file('cover_image')->storeAs('images/books', Str::slug($validated['title']).'-'.Str::uuid()->toString().'.'.$request->file('cover_image')->extension());
            $book->cover_image = $coverImage;
        }

        $book->save();

        return response($book);
    }

   
    public function show($id)
    {
        $book = Book::find($id);
        return response($book);
    }

    
    public function update(BookRequest $request, $id)
    {   

        $validated = $request->validated();

        $book = Book::find($id);
        $book->title = $validated['title'];
        $book->author = $validated['author'];
        $book->description = $validated['description'];

        if ($request->hasFile('cover_image')) {
            $coverImage = $request->file('cover_image')->storeAs('images/books', Str::slug($validated['title']).'-'.Str::uuid()->toString().'.'.$request->file('cover_image')->extension());
            Storage::delete($book->cover_image);
            $book->cover_image = $coverImage;
        }

        $book->save();

        return response($book);
    }

    
    public function destroy($id)
    {
        $book = Book::find($id);
        
        if($book->cover_image != 'default.jpg'){
            Storage::delete($book->cover_image);
        }

        $book->delete();

        return response($book);
    }
}
