<?php

namespace App\Http\Controllers;

use App\Models\Shortener;
use App\Models\User;
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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
