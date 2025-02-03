<?php

namespace Database\Seeders;

use App\Models\Shortener;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ShortenerSeed extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Shortener::factory(30)->create();
    }
}
