<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PelakuUMKM extends Model
{
    use HasFactory;

    protected $table = "pelaku_umkms";
    protected $guarded = ['id'];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function productUmkm()
    {
        return $this->hasMany(ProductUMKM::class);
    }
}
