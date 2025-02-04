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
        Schema::create('shortener_accesses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('shortener_id')->constrained()->onDelete('cascade');
            $table->ipAddress();
            $table->string('user_agent')->nullable();
            $table->timestamp('accessed_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('shortener_accesses');
    }
};
