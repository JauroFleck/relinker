<?php

namespace App\Http\Controllers;

use App\Models\Shortener;

class RedirectController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(string $shortened_url)
    {
        $shortener = Shortener::where('shortened_url', $shortened_url)->firstOrFail();
        
        $shortener->increment('clicks');
        $shortener->accesses()->create([
            'ip_address' => request()->ip(),
            'user_agent' => request()->userAgent(),
            'accessed_at' => now(),
        ]);

        return redirect($shortener->original_url);
    }
}
