<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductUMKM extends Model
{
    use HasFactory;

    protected $table = 'products_umkm';
    protected $guarded = ['id'];
    protected $casts = ['images'=> 'array'];

    public function pelakuUmkm() {
        return $this->belongsTo(PelakuUMKM::class, 'pelaku_umkm_id');
    }

    public function likes() {
        return $this->hasMany(likedProducts::class, 'product_id');
    }

    public function saves() {
        return $this->hasMany(ProductSave::class, 'product_id');
    }
}
