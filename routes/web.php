<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\RedirectController;
use App\Http\Controllers\ShortenerController;
use App\Http\Controllers\ShortenerValidationController;
use Illuminate\Support\Facades\Route;

Route::get('/', HomeController::class)->name('home');
Route::resource('shorteners', ShortenerController::class)->except(['create', 'update', 'edit', 'show']);
Route::put('/validate/{id}', ShortenerValidationController::class)->name('validateUrl');
Route::get('/{shortened_url}', RedirectController::class)->name('redirect');
