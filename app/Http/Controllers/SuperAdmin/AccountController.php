<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Exports\PelakuUMKMExport;
use App\Http\Controllers\Controller;
use App\Imports\PelakuUMKMImport;
use App\Models\PelakuUMKM;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Illuminate\Validation\Rules;
use Maatwebsite\Excel\Facades\Excel;

class AccountController extends Controller
{
    public function show()
    {
        $listUser = User::latest()->get();

        return Inertia::render("SuperAdmin/AccountManagement/Index", [
            'listUser' => $listUser
        ]);
    }

    public function store(Request $req)
    {
        $validatedData = $req->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:' . User::class,
            'password' => ['required', Rules\Password::defaults()],
            'role' => 'required'
        ]);

        User::create($validatedData);

        return redirect()->back();
    }

    public function update(Request $req, $id)
    {
        $user = User::findOrFail($id);

        $validatedData = $req->validate([
            'name' => 'required|string|max:255',
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique('users')->ignore($id),
            ],
            'password' => ['required', Rules\Password::defaults()],
            'role' => 'required'
        ]);

        $user->update($validatedData);

        return redirect()->back();
    }

    public function delete($id)
    {
        $user = User::findOrFail($id);
        $pelakuUMKM = PelakuUMKM::where('user_id', $user->id);
        $user->delete();
        $pelakuUMKM->delete();

        return redirect()->back();
    }

    public function export() 
    {
        return Excel::download(new PelakuUMKMExport, 'data.xlsx');
    }

    public function import() 
    {
        Excel::import(new PelakuUMKMImport, 'excel.xlsx');
        
        return redirect('/')->with('success', 'All good!');
    }
}
