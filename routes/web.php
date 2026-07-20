<?php

use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::get('/run-migrations', function () {
    Artisan::call('migrate', ['--force' => true]);
    return 'Database successfully migrated!';
});


