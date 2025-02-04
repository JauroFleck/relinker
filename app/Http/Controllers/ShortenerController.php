<?php

namespace App\Http\Controllers;

use App\Models\Shortener;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ShortenerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResponse
    {
        $request->validate([
            'per_page' => 'integer|min:5|max:20|nullable',
            'page' => 'integer|min:1|nullable',
        ]);

        $per_page = $request->input('per_page', 5);
        $page = $request->input('page', 1);

        return response()->json(
            Shortener::orderBy('clicks', 'desc')
                ->paginate($per_page, ['*'], 'page', $page)
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'original_url' => 'required|url',
            'desired_url' => 'string|nullable',
            'author_email' => 'required|email',
        ]);

        if (Shortener::where('shortened_url', $request->input('desired_url'))->count() > 0) {
            return response()->json([
                'message' => 'The desired URL is already taken.',
            ], 400);
        }

        $shortener = Shortener::create([
            'original_url' => $request->input('original_url'),
            'shortened_url' => $request->input('desired_url') ?? Shortener::generateShortenedUrl(),
            'author_email' => $request->input('author_email'),
        ]);

        return response()->json([
            'message' => 'Shortened URL created successfully.',
            'shortener' => $shortener,
        ], 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $shortener = Shortener::findOrFail($id);

        $shortener->delete();

        return response()->json([
            'message' => 'Shortened URL deleted successfully.',
        ], 200);
    }
}
