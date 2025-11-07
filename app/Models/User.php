<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];


    public function pelakuUMKM()
    {
        return $this->hasOne(PelakuUMKM::class);
    }

    public function berita()
    {
        return $this->hasMany(News::class);
    }

    public function pengumuman()
    {
        return $this->hasMany(Announcement::class);
    }

    public function getRedirectRoute()
    {
        return match ($this->role) {
            "superAdmin" => 'superAdmin.dashboard',
            "admin" => 'admin.dashboard',
            "umkmAdmin" => 'umkmAdmin.dashboard',
            null => 'umkmAdmin.dashboard'
        };
    }

    public function likedProducts() {
        return $this->belongsToMany(ProductsUmkm::class, 'product_likes', 'user_id', 'product_id')
            ->withTimestamps();
    }

    public function savedProducts() {
        return $this->belongsToMany(ProductsUmkm::class, 'product_saves', 'user_id', 'product_id')
            ->withTimestamps();
    }
}
