<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductSave extends Model {
    use HasFactory;
    protected $fillable = ['product_id', 'user_id'];

    public function product() {
        return $this->belongsTo(ProductsUmkm::class, 'product_id');
    }

    public function user() {
        return $this->belongsTo(User::class);
    }
}
