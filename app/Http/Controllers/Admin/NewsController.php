<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\News;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class NewsController extends Controller
{
    public function show()
    {
        $listBerita = News::latest()->get();

        return Inertia::render('Admin/NewsManagement/Index', [
            'listBerita' => $listBerita
        ]);
    }

    public function store(Request $req)
    {
        $validatedData = $req->validate([
            'judul' => 'required',
            'konten' => 'required',
            'gambar' => 'required|image|max:2048',
        ]);

        $file = $req->file('gambar');
        $fileName = $file->getClientOriginalName();
        // $file->storeAs('public/images/uploads/news', $fileName);
        $file->move(public_path('/images/uploads/news'), $fileName);
        // $file->move(base_path('public_html/images/uploads/news'), $fileName);

        News::create([
            'judul' => $validatedData['judul'],
            'konten' => $validatedData['konten'],
            'gambar' => $fileName,
            'author_id' => Auth::user()->id
        ]);

        return redirect()->back();
    }

    public function update(Request $req, $id)
    {
        $validatedData = $req->validate([
            'judul' => 'required',
            'konten' => 'required',
        ]);

        $news = News::findOrFail($id);

        if ($req->hasFile('gambar')) {
            //hapus file lama
            $thumbnail_lama=$news->gambar;
            $file_path_thumbnail_lama='images/uploads/news/'.$thumbnail_lama;
            if(file_exists($file_path_thumbnail_lama)){ 
                unlink($file_path_thumbnail_lama);
            }


            $validatedData = $req->validate([
                'judul' => 'required',
                'konten' => 'required',
                'gambar' => 'required|image|max:2048',
            ]);
            $file = $req->file('gambar');
            $fileName = $file->getClientOriginalName();
            // $file->storeAs('public/images/uploads/news', $fileName);
            $file->move(public_path('/images/uploads/news'), $fileName);
            // $file->move(base_path('public_html/images/uploads/news'), $fileName);
        } else {
            $fileName = $news->gambar;
        }

        $news->update([
            'judul' => $validatedData['judul'],
            'konten' => $validatedData['konten'],
            'gambar' => $fileName,
            'author_id' => Auth::user()->id
        ]);

        return redirect()->back();
    }

    public function delete($id)
    {
        $news = News::findOrFail($id);
        $thumbnail_lama=$news->gambar;
        $file_path_thumbnail_lama='images/uploads/news/'.$thumbnail_lama;
        if(file_exists($file_path_thumbnail_lama)){ 
            unlink($file_path_thumbnail_lama);
        }

        $news->delete();

        return redirect()->back();
    }

    public function detail($slug)
    {
        $judulBerita = str_replace("-", " ", $slug);
        $newsDetail = News::where('judul', $judulBerita)->with('author')->first();
        $otherLatestNews = News::where('judul', '!=', $judulBerita)
            ->latest()
            ->paginate(3);

        return Inertia::render("Detail/News", [
            'newsDetail' => $newsDetail,
            'otherLatestNews' => $otherLatestNews
        ]);
    }
}
