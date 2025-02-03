<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Shortener;

class HomeController extends Controller
{
    public function __invoke()
    {
        return Inertia::render('Welcome');
    }
}
