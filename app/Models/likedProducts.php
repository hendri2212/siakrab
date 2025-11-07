<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class likedProducts extends Model {
    use HasFactory;
    protected $table = 'product_likes';
    protected $fillable = ['product_id', 'user_id'];

    public function product()
    {
        return $this->belongsTo(\App\Models\ProductUMKM::class, 'product_id');
    }

    public function user()
    {
        return $this->belongsTo(\App\Models\User::class, 'user_id');
    }
}
