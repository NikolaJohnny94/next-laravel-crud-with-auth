<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;


/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        return [
            'title' =>  $title = fake()->sentence(2),
            'slug' => Str::slug($title),
            'description' => fake()->sentence(20),
            'finished' => fake()->boolean(),
            'category' => fake()->randomElement(['work', 'personal', 'other']),
        ];
    }
}
