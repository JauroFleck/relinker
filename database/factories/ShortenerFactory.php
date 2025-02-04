<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Shortener>
 */
class ShortenerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'author_email' => $this->faker->email,
            'original_url' => $this->faker->url,
            'shortened_url' => Str::random(8),
            'is_enabled' => $this->faker->boolean,
            'is_valid' => $this->faker->boolean,
            'response_time' => $this->faker->randomFloat(2, 0, 1),
            'clicks' => $this->faker->numberBetween(0, 1000),
        ];
    }
}
