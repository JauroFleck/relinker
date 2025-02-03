<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ShortenerAccess extends Model
{
    protected $fillable = [
        'shortener_id',
        'ip_address',
        'user_agent',
        'accessed_at',
    ];

    public $timestamps = false;

    public function casts(): array
    {
        return [
            'accessed_at' => 'datetime',
        ];
    }

    public function shortener()
    {
        return $this->belongsTo(Shortener::class);
    }
}
