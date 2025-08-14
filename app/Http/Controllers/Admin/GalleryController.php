<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Gallery;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Storage;

class GalleryController extends Controller
{
    public function show(): Response
    {
        $listGaleri = Gallery::all();

        return Inertia::render('Admin/GalleryManagements/Index', [
            'listGaleri' => $listGaleri
        ]);
    }

    public function store(Request $req): RedirectResponse
    {
        $req->validate([
            'gambar' => 'required|image|max:2048',
        ]);

        $file = $req->file('gambar');
        $fileName = time() .$file->getClientOriginalName();
        // $file->storeAs('public/images/uploads/gallery', $fileName);
        $file->move(public_path('/images/uploads/gallery'), $fileName);
        // $file->move(base_path('public_html/images/uploads/gallery'), $fileName);

        if (filled($req->nama)) {
            $nama = $req->nama;
        } else {
            $nama = "";
        }

        Gallery::create([
            'nama' => $nama,
            'gambar' => $fileName,
        ]);

        return redirect()->back();
    }

    public function update(Request $req, $id): RedirectResponse
    {
        $gallery = Gallery::findOrFail($id);

        if ($req->hasFile('gambar')) {
            $gambar_lama=$gallery->gambar;

            $file_path='images/uploads/gallery/'.$gambar_lama;
            if(file_exists($file_path)){ 
                unlink($file_path);
            }

            $req->validate([
                'gambar' => 'required|image|max:2048',
            ]);
            $file = $req->file('gambar');
            $fileName = time() .$file->getClientOriginalName();

            $file->move(public_path('/images/uploads/gallery'), $fileName);


        } else {
            $fileName = $gallery->gambar;

            
        }

        if (filled($req->nama)) {
            $nama = $req->nama;
        } else {
            $nama = "";
        }

        $gallery->update([
            'nama' => $nama,
            'gambar' => $fileName,
        ]);

        return redirect()->back();
    }

    public function delete($id): RedirectResponse
    {
        $gallery = Gallery::findOrFail($id);

        $gambar_lama=$gallery->gambar;
            
        $file_path='images/uploads/gallery/'.$gambar_lama;
        if(file_exists($file_path)){ 
            unlink($file_path);
        }

        $gallery->delete();

        return redirect()->back();
    }

    public function find(): Response
    {
        $listGaleri = Gallery::latest()->paginate(24);

        return Inertia::render('Finding/Gallery', [
            'listGaleri' => $listGaleri
        ]);
    }
}
