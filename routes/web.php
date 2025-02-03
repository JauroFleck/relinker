<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\ShortenerController;
use Illuminate\Support\Facades\Route;

Route::get('/', HomeController::class)->name('home');
Route::resource('shorteners', ShortenerController::class)->except(['create']);
