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
        Schema::table('pelaku_umkms', function (Blueprint $table) {
            $table->string('produk')->nullable()->default(null);
            $table->string('merk')->nullable()->default(null);
            $table->string('alamat_rumah')->nullable()->default(null);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('pelaku_umkms', function (Blueprint $table) {
            $table->dropColumn('produk');
            $table->dropColumn('merk');
            $table->dropColumn('alamat_rumah');
        });
    }
};
