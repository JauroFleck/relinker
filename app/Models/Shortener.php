<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Shortener extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'author_email',
        'original_url',
        'shortened_url',
        'is_enabled',
        'is_valid',
        'response_time',
        'clicks',
    ];

    public $timestamps = false;

    public function casts(): array
    {
        return [
            'is_enabled' => 'boolean',
            'is_valid' => 'boolean',
            'clicks' => 'integer',
        ];
    }

    public function accesses()
    {
        return $this->hasMany(ShortenerAccess::class);
    }
}
