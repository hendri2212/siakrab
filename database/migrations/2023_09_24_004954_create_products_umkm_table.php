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
        Schema::create('products_umkm', function (Blueprint $table) {
            $table->id();
            $table->string('kategori');
            $table->string('thumbnail');
            $table->json("images");
            $table->string('nama');
            $table->string('deskripsi');
            $table->string('harga_start')->nullable();
            $table->string('harga_end')->nullable();
            $table->string('harga_fix')->nullable();
            $table->json('detail')->nullable();
            $table->bigInteger('pelaku_umkm_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products_umkm');
    }
};
