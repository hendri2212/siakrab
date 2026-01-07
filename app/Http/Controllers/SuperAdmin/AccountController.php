<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Exports\PelakuUMKMExport;
use App\Http\Controllers\Controller;
use App\Imports\PelakuUMKMImport;
use App\Models\PelakuUMKM;
use App\Models\ProductUMKM;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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
        
        DB::beginTransaction();
        
        try {
            // Get PelakuUMKM data
            $pelakuUMKM = PelakuUMKM::where('user_id', $user->id)->first();
            
            if ($pelakuUMKM) {
                // Delete foto KTP file
                if ($pelakuUMKM->foto_ktp) {
                    $ktpPath = public_path('storage/' . $pelakuUMKM->foto_ktp);
                    if (file_exists($ktpPath)) {
                        unlink($ktpPath);
                    }
                }
                
                // Get all products owned by this PelakuUMKM
                $products = ProductUMKM::where('pelaku_umkm_id', $pelakuUMKM->id)->get();
                
                foreach ($products as $product) {
                    // Delete product thumbnail
                    if ($product->thumbnail) {
                        $thumbnailPath = public_path('images/uploads/products/' . $product->thumbnail);
                        if (file_exists($thumbnailPath)) {
                            unlink($thumbnailPath);
                        }
                    }
                    
                    // Delete product images
                    if ($product->images && is_array($product->images)) {
                        foreach ($product->images as $image) {
                            $imagePath = public_path('images/uploads/products/' . $image);
                            if (file_exists($imagePath)) {
                                unlink($imagePath);
                            }
                        }
                    }
                    
                    // Delete product likes and saves
                    $product->likes()->delete();
                    $product->saves()->delete();
                    
                    // Delete product
                    $product->delete();
                }
                
                // Delete PelakuUMKM
                $pelakuUMKM->delete();
            }
            
            // Delete user's liked and saved products (pivot table entries)
            DB::table('product_likes')->where('user_id', $user->id)->delete();
            DB::table('product_saves')->where('user_id', $user->id)->delete();
            
            // Delete user (News & Announcement are kept as public content)
            $user->delete();
            
            DB::commit();
            
            return redirect()->back()->with('success', 'User dan semua data terkait berhasil dihapus');
        } catch (\Throwable $th) {
            DB::rollback();
            return redirect()->back()->with('error', 'Gagal menghapus user: ' . $th->getMessage());
        }
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
