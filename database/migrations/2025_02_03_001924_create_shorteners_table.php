<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('shorteners', function (Blueprint $table) {
            $table->id();
            $table->string('author_email');
            $table->string('original_url');
            $table->string('shortened_url')->index();
            $table->boolean('is_enabled')->default(true);
            $table->boolean('is_valid')->nullable();
            $table->double('response_time')->nullable();
            $table->unsignedBigInteger('clicks')->default(0);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('shorteners');
    }
};
