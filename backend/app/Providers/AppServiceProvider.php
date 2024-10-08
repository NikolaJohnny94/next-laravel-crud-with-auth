<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Repositories\TaskRepository;
use App\Repositories\AuthRepository;
use Illuminate\Http\Request;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(TaskRepository::class, function ($app) {
            return new TaskRepository($app->make(Request::class));
        });

        $this->app->bind(AuthRepository::class, function ($app) {
            return new AuthRepository($app->make(Request::class));
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
