<?php

namespace App\Http\Controllers;

use App\Models\Shortener;
use Illuminate\Support\Facades\Log;

class ShortenerValidationController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(int $id)
    {
        $shortener = Shortener::findOrFail($id);
        
        $url = config('app.internal_url').'/'.$shortener->shortened_url;

        Log::info("Validating URL: $url");

        $ch = curl_init($url);

        curl_setopt($ch, CURLOPT_HEADER, false);
        curl_setopt($ch, CURLOPT_NOBODY, true);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
        curl_setopt($ch, CURLOPT_MAXREDIRS, 5);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);

        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);
        curl_setopt($ch, CURLOPT_TIMEOUT_MS, 10000);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        curl_exec($ch);

        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $ttfb = curl_getinfo($ch, CURLINFO_TOTAL_TIME) * 1000;

        curl_close($ch);

        if ($httpCode >= 200 && $httpCode < 400) {
            $shortener->update([
                'response_time' => $ttfb,
                'is_valid' => true,
            ]);

            return response()->json([
                'httpCode' => $httpCode,
                'message' => 'URL válida',
            ], 200);
        } else {
            $shortener->update([
                'response_time' => null,
                'is_valid' => false,
            ]);

            return response()->json([
                'message' => 'URL inválida',
                'httpCode' => $httpCode,
            ], 400);
        }
    }
}
