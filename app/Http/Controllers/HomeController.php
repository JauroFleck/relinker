<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Shortener;

class HomeController extends Controller
{
    public function __invoke()
    {
        return Inertia::render('Welcome', [
            'shorteners' => Shortener::query()
                ->orderBy('clicks', 'desc')
                ->limit(5)
                ->get()
                ->map(function ($shortener) {
                    return [
                        'id' => $shortener->id,
                        'original_url' => $shortener->original_url,
                        'shortened_url' => $shortener->shortened_url,
                        'author_email' => $shortener->author_email,
                        'clicks' => $shortener->clicks,
                        'is_enabled' => $shortener->is_enabled,
                        'is_valid' => $shortener->is_valid,
                    ];
                }),
        ]);
    }
}
