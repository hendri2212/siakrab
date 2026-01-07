<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Carousel;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CarouselController extends Controller
{
    public function index()
    {
        $listCarousel = Carousel::ordered()->get();

        return Inertia::render('Admin/CarouselManagement/Index', [
            'listCarousel' => $listCarousel,
        ]);
    }

    public function store(Request $req)
    {
        $validatedData = $req->validate([
            'title' => 'nullable|string|max:255',
            'image' => 'required|image|mimes:jpg,jpeg,png,webp|max:5120',
            'link' => 'nullable|string|max:255',
            'is_active' => 'boolean',
        ], [
            'image.required' => 'Gambar carousel wajib diisi',
            'image.image' => 'File harus berupa gambar',
            'image.mimes' => 'Format gambar harus JPG, JPEG, PNG, atau WebP',
            'image.max' => 'Ukuran gambar maksimal 5MB',
        ]);

        $imagePath = null;
        if ($req->hasFile('image')) {
            $file = $req->file('image');
            $filename = time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('images/carousel'), $filename);
            $imagePath = $filename;
        }

        // Get max order
        $maxOrder = Carousel::max('order') ?? 0;

        Carousel::create([
            'title' => $validatedData['title'] ?? null,
            'image' => $imagePath,
            'link' => $validatedData['link'] ?? null,
            'order' => $maxOrder + 1,
            'is_active' => $validatedData['is_active'] ?? true,
        ]);

        return redirect()->back()->with('success', 'Carousel berhasil ditambahkan');
    }

    public function update(Request $req, $id)
    {
        $carousel = Carousel::findOrFail($id);

        $validatedData = $req->validate([
            'title' => 'nullable|string|max:255',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:5120',
            'link' => 'nullable|string|max:255',
            'is_active' => 'boolean',
        ]);

        // Handle image upload
        if ($req->hasFile('image')) {
            // Delete old image
            $oldImagePath = public_path('images/carousel/' . $carousel->image);
            if (file_exists($oldImagePath) && $carousel->image) {
                unlink($oldImagePath);
            }

            $file = $req->file('image');
            $filename = time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('images/carousel'), $filename);
            $carousel->image = $filename;
        }

        $carousel->title = $validatedData['title'] ?? $carousel->title;
        $carousel->link = $validatedData['link'] ?? $carousel->link;
        $carousel->is_active = $validatedData['is_active'] ?? $carousel->is_active;
        $carousel->save();

        return redirect()->back()->with('success', 'Carousel berhasil diupdate');
    }

    public function delete($id)
    {
        $carousel = Carousel::findOrFail($id);

        // Delete image file
        $imagePath = public_path('images/carousel/' . $carousel->image);
        if (file_exists($imagePath) && $carousel->image) {
            unlink($imagePath);
        }

        $carousel->delete();

        return redirect()->back()->with('success', 'Carousel berhasil dihapus');
    }

    public function toggleActive($id)
    {
        $carousel = Carousel::findOrFail($id);
        $carousel->is_active = !$carousel->is_active;
        $carousel->save();

        return redirect()->back();
    }
}
