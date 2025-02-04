<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

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

    public static function generateShortenedUrl(): string
    {
        $count = 0;
        do {
            $shortened_url = Str::random(3 + ($count / 4));
        } while (Shortener::where('shortened_url', $shortened_url)->count() > 0 && ++$count);

        return $shortened_url;
    }
}
