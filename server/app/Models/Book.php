<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Support\Facades\Storage;


class Book extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'author', 'description', 'cover_image'];

    protected function coverImage(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => url($value),
        );
    }

}
