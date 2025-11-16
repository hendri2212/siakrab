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
        Schema::create('pelaku_umkms', function (Blueprint $table) {
            $table->id();
            $table->string('nama_usaha');
            $table->string('alamat_usaha');
            $table->string('kecamatan');
            $table->string('telepon');
            $table->string('jenis_usaha');
            $table->string('bidang_usaha');
            $table->string('jumlah_tenaga_kerja');
            $table->string('no_ijin_usaha');
            $table->string('no_npwp');
            $table->string('nik', 16)->nullable()->unique();
            $table->string('foto_ktp')->nullable();
            $table->foreignId('user_id')
                  ->constrained('users')
                  ->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pelaku_umkms');
    }
};
