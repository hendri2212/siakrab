<?php

namespace App\Http\Controllers\UMKM;

use App\Http\Controllers\Controller;
use App\Models\PelakuUMKM;
use App\Models\ProductUMKM;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ProductUMKMController extends Controller
{
    public function show()
    {
        $userId = Auth::user()->id;
        $pelakuUMKM = PelakuUMKM::where('user_id', $userId)->first();

        $listProductsUMKM = ProductUMKM::where('pelaku_umkm_id', $pelakuUMKM->id)->latest()->get();

        return Inertia::render('UMKMAdmin/ProductsManagement/Index', [
            'listProductsUMKM' => $listProductsUMKM
        ]);
    }

    public function store(Request $req)
    {
        $validatedData = $req->validate([
            'kategori' => 'required',
            'thumbnail' => 'required|image|max:2048',
            'nama' => 'required',
            'deskripsi' => 'required',
            'images' => 'max:2048',
        ]);

        $file = $req->file('thumbnail');
        $fileName = time() .$file->getClientOriginalName();
        // $file->storeAs('public/images/uploads/products', $fileName);
        $file->move(public_path('/images/uploads/products'), $fileName);
        //$file->move(base_path('public_html/images/uploads/products'), $fileName);

        $userId = Auth::user()->id;
        $pelakuUMKM = PelakuUMKM::where('user_id', $userId)->first();

        $product = new ProductUMKM([
            'kategori' => $validatedData['kategori'],
            'thumbnail' => $fileName,
            'nama' => $validatedData['nama'],
            'deskripsi' => $validatedData['deskripsi'],
            'harga_start' => $req->harga_start,
            'harga_end' => $req->harga_end,
            'harga_fix' => $req->harga_fix,
            'pelaku_umkm_id' => $pelakuUMKM->id
        ]);

        $product->save();

        if ($req->hasFile('images')) {
            $imagesArray = [];

            foreach ($req->file('images') as $image) {
                $imageName = time() .$image->getClientOriginalName();
                // $image->storeAs('public/images/uploads/products', $imageName);
                $image->move(public_path('/images/uploads/products'), $imageName);
                // $image->move(base_path('public_html/images/uploads/products'), $imageName);
                $imagesArray[] = $imageName;
            }

            $product->update(['images' => json_encode($imagesArray)]);
        }

        return redirect()->back();
    }


    public function update(Request $req, $id)
    {

        $validatedData = $req->validate([
            'kategori' => 'required',
            'nama' => 'required',
            'deskripsi' => 'required',
            'images' => 'max:2048',
        ]);

        $product = ProductUMKM::findOrFail($id);

        // hapus foto multiple images (jika ada)
        if ($req->hasFile('images')) {
            $imagesArray = [];

            $foto_multi_lama=json_decode($product->images);//$codes as $index => $code'

            if($foto_multi_lama!=''){
                foreach($foto_multi_lama as $mydata){
                    //hapus foto lama
                    $images_lama=$mydata;
                    $file_path_images_lama='images/uploads/products/'.$images_lama;
                    if(file_exists($file_path_images_lama)){ 
                        unlink($file_path_images_lama);
                    }

                }
            }
        }

        if ($req->hasFile('thumbnail')) {
            //hapus file lama
            $thumbnail_lama=$product->thumbnail;
            $file_path_thumbnail_lama='images/uploads/products/'.$thumbnail_lama;
            if(file_exists($file_path_thumbnail_lama)){ 
                unlink($file_path_thumbnail_lama);
            }

            $validatedData = $req->validate([
                'kategori' => 'required',
                'thumbnail' => 'required|image|max:2048',
                'nama' => 'required',
                'deskripsi' => 'required',
                'images' => 'max:2048',
            ]);
            $file = $req->file('thumbnail');
            $fileName = $file->getClientOriginalName();
            $fileName = time() .$fileName;//tambahan agus
            // $file->storeAs('public/images/uploads/products', $fileName);
            $file->move(public_path('/images/uploads/products'), $fileName);
            //$file->move(base_path('public_html/images/uploads/products'), $fileName);
        } else {
            $fileName = $product->thumbnail;
        }

        $userId = Auth::user()->id;
        $pelakuUMKM = PelakuUMKM::where('user_id', $userId)->first();

        $product->update([
            'kategori' => $validatedData['kategori'],
            'thumbnail' => $fileName,
            'nama' => $validatedData['nama'],
            'deskripsi' => $validatedData['deskripsi'],
            'harga_start' => $req->harga_start,
            'harga_end' => $req->harga_end,
            'harga_fix' => $req->harga_fix,
            'pelaku_umkm_id' => $pelakuUMKM->id
        ]);

        // Upload dan simpan multiple images (jika ada)
        if ($req->hasFile('images')) {
            $imagesArray = [];

            foreach ($req->file('images') as $image) {

                $imageName = $id."-".time() .$image->getClientOriginalName();
                $image->move(public_path('/images/uploads/products'), $imageName);
                $imagesArray[] = $imageName;
            }

            // Update atribut 'images'
            $product->update(['images' => json_encode($imagesArray)]);
        }

        return redirect()->back();
    }


    public function delete($id)
    {
        $product = ProductUMKM::findOrFail($id);

        // hapus foto multiple images (jika ada)

        $foto_multi_lama=json_decode($product->images);//$codes as $index => $code'

        if($foto_multi_lama!=''){
            foreach($foto_multi_lama as $mydata){
                //hapus foto lama
                $images_lama=$mydata;
                $file_path_images_lama='images/uploads/products/'.$images_lama;
                if(file_exists($file_path_images_lama)){ 
                    unlink($file_path_images_lama);
                }

            }
        }

        $thumbnail_lama=$product->thumbnail;
        $file_path_thumbnail_lama='images/uploads/products/'.$thumbnail_lama;
        if(file_exists($file_path_thumbnail_lama)){ 
            unlink($file_path_thumbnail_lama);
        }

        $product->delete();

        return redirect()->back();
    }

    public function detail($slug)
    {
        // $namaProduct = str_replace("-", " ", $slug);

        $productDetail = ProductUMKM::where('nama', $slug)->with('pelakuUmkm.user')->first();

        return Inertia::render("Detail/Product", [
            'productDetail' => $productDetail
        ]);
    }


    public function find(Request $req)
    {
        $query = $req->query('query', '');
        $kategoris = $req->query('kategori', []);

        $queryBuilder = ProductUMKM::with('pelakuUmkm')
            ->where('nama', 'like', '%' . $query . '%');

        $kategoris = is_array($kategoris) ? $kategoris : explode(',', $kategoris);


        if (!empty($kategoris)) {
            $queryBuilder->whereIn('kategori', $kategoris);
        }

        $paginator = $queryBuilder->latest()->paginate(12);

        $results = new Collection($paginator->items());

        // dd($results);
        
        if (!$results->isEmpty()) {
            foreach ($results as $product) {
                if (!is_null($product['harga_end'])) {
                    $minPrice = $results->min('harga_start');
                    $maxPrice = $results->max('harga_end');
                }else {
                    $minPrice = $results->min('harga_fix');
                    $maxPrice = $results->max('harga_fix');
                }
            }
            
        } else {
            $minPrice = null;
            $maxPrice = null;
        }

        return Inertia::render('Finding/Products', [
            'results' => $paginator,
            'query' => $query,
            'minPrice' => $minPrice,
            'maxPrice' => $maxPrice,
            'queryKategori' => $kategoris, // Gunakan array yang sudah dibersihkan
        ]);
    }
}
