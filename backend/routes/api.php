<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\TaskController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post("/login", [AuthController::class, "login"]);
Route::post("/registration", [AuthController::class, "registration"]);

// Protected routes
Route::middleware(['auth:sanctum'])->group(function () {
    // Tasks
    Route::resource('tasks', TaskController::class);
    Route::get('/tasks/search/{title}', [TaskController::class, 'search']);
    // Auth
    Route::post("/logout", [AuthController::class, "logout"]);
    // User
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});
