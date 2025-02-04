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
        
        $url = config('app.url').'/'.$shortener->shortened_url;

        $ch = curl_init($url);

        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HEADER, true); // Capturar cabeçalhos HTTP
        curl_setopt($ch, CURLOPT_TIMEOUT, 10);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
        curl_setopt($ch, CURLOPT_MAXREDIRS, 10);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
        curl_setopt($ch, CURLOPT_PORT, 8000);

        $start = microtime(true);
        $response = curl_exec($ch);
        $end = microtime(true);

        if ($response === false) {
            // Se houver erro, capturar mensagem de erro do cURL
            $error = curl_error($ch);
            $errorCode = curl_errno($ch);
            curl_close($ch);
            Log::error('cURL Error', [
                'error' => $error,
                'code' => $errorCode
            ]);
        }

        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $finalUrl = curl_getinfo($ch, CURLINFO_EFFECTIVE_URL);
        $responseTime = round(($end - $start) * 1000, 2); // Tempo em ms

        // Separar cabeçalhos e corpo da resposta
        $headerSize = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
        $headers = substr($response, 0, $headerSize);
        $body = substr($response, $headerSize);

        curl_close($ch);

        if ($httpCode >= 200 && $httpCode < 400) {
            $shortener->update([
                'response_time' => $responseTime,
                'is_valid' => true,
            ]);

            return response()->json([
                'message' => 'URL válida',
            ], 200);
        } else {
            $shortener->update([
                'response_time' => null,
                'is_valid' => false,
            ]);

            return response()->json([
                'message' => 'URL inválida',
            ], 400);
        }
    }
}
