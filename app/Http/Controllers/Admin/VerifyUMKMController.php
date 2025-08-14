<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PelakuUMKM;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VerifyUMKMController extends Controller
{
    public function show()
    {
        $listPelakuUMKM = PelakuUMKM::with('user')->latest()->get();

        return Inertia::render('Admin/VerifyUMKM/Index', [
            'listPelakuUMKM' => $listPelakuUMKM
        ]);
    }

    public function update(Request $req, $userId)
    {
        $user = User::findOrFail($userId);

        $user->role = $req->role;
        $user->save();

        return redirect()->back();
    }
}
