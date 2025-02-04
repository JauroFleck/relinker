<?php

namespace App\Http\Controllers;

use App\Models\Shortener;

class ShortenerValidationController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(int $id)
    {
        $shortener = Shortener::findOrFail($id);
        
        $url = $shortener->shortened_url;

        $start = microtime(true);
        $response = file_get_contents(config('app.url') .'/'. $url);
        $end = microtime(true);

        $responseTime = $end - $start;

        if ($response !== false) {
            $httpCode = $http_response_header[0];
            dd ($httpCode);
            if (strpos($httpCode, '200') !== false || strpos($httpCode, '2') === 9) {
                // HTTP status is 2XX
                // Do something with the response time if needed
            } else {
                // HTTP status is not 2XX
            }
        } else {
            // Failed to access the URL
        }

    }
}
