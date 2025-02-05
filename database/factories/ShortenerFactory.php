<?php

namespace Database\Factories;

use App\Models\Shortener;
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
            'original_url' => $this->randomRealURL(),
            'shortened_url' => Shortener::generateShortenedURL(),
            'is_enabled' => $this->faker->boolean,
            'is_valid' => $this->faker->boolean,
            'response_time' => $this->faker->randomFloat(2, 0, 1),
            'clicks' => $this->faker->numberBetween(0, 1000),
        ];
    }

    private function randomRealURL(): string
    {
        $realURLs = [
            'https://www.google.com',
            'https://www.youtube.com',
            'https://www.facebook.com',
            'https://www.twitter.com',
            'https://www.instagram.com',
            'https://www.linkedin.com',
            'https://www.pinterest.com',
            'https://www.tumblr.com',
            'https://www.reddit.com',
            'https://www.snapchat.com',
            'https://www.whatsapp.com',
            'https://www.skype.com',
            'https://www.zoom.com',
            'https://www.microsoft.com',
            'https://www.apple.com',
            'https://www.samsung.com',
            'https://www.huawei.com',
            'https://www.amazon.com',
            'https://www.ebay.com',
            'https://www.alibaba.com',
            'https://www.aliexpress.com',
            'https://www.walmart.com',
            'https://www.target.com',
        ];

        return $realURLs[rand(0, count($realURLs) - 1)];
    }
}
