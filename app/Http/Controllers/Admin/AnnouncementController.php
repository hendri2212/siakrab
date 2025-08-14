<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Announcement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AnnouncementController extends Controller
{
    public function show()
    {
        $listPengumuman = Announcement::latest()->get();

        return Inertia::render('Admin/AnnouncementsManagement/Index', [
            'listPengumuman' => $listPengumuman
        ]);
    }

    public function store(Request $req)
    {
        $validatedData = $req->validate([
            'judul' => 'required',
            'konten' => 'required',
        ]);

        Announcement::create([
            'judul' => $validatedData['judul'],
            'konten' => $validatedData['konten'],
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

        $announcement = Announcement::findOrFail($id);
        $announcement->update([
            'judul' => $validatedData['judul'],
            'konten' => $validatedData['konten'],
            'author_id' => Auth::user()->id
        ]);

        return redirect()->back();
    }

    public function delete($id)
    {
        $announcement = Announcement::findOrFail($id);
        $announcement->delete();

        return redirect()->back();
    }

    public function detail($id)
    {
        $announcementDetail = Announcement::where('id', $id)->with('author')->first();
        $otherLatestAnnouncements = Announcement::where('id', '!=', $id)
            ->latest()
            ->paginate(2);
           

        return Inertia::render('Detail/Announcement', [
            'announcementDetail' => $announcementDetail,
            'otherLatestAnnouncements' => $otherLatestAnnouncements
        ]);
    }
}
