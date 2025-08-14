<?php

namespace App\Http\Controllers\UMKM;

use App\Http\Controllers\Controller;
use App\Models\PelakuUMKM;
use Illuminate\Http\Request;

use function PHPUnit\Framework\isEmpty;

class ProfileUMKMController extends Controller
{
    public function update(Request $req){
        
        $validatedData = $req->validate([
            'namaUsaha' => 'required',
            'alamatUsaha' => 'required',
            'kecamatan' => 'required',
            'telepon' => 'required',
            'jenisUsaha' => 'required',
            'bidangUsaha' => 'required',
            'jumlahTenagaKerja' => 'required',
            'noIjinUsaha' => 'required',
            'noNPWP' => 'required',
        ]);
        
        
        if($req->filled('id')){
            $profileUMKM = PelakuUMKM::findOrFail($req->id);
        }else {
            $profileUMKM = PelakuUMKM::where('user_id', auth()->user()->id)->first();
        }

        $profileUMKM->nama_usaha = $validatedData['namaUsaha'];
        $profileUMKM->alamat_usaha = $validatedData['alamatUsaha'];
        $profileUMKM->kecamatan = $validatedData['kecamatan'];
        $profileUMKM->telepon = $validatedData['telepon'];
        $profileUMKM->jenis_usaha = $validatedData['jenisUsaha'];
        $profileUMKM->bidang_usaha = $validatedData['bidangUsaha'];
        $profileUMKM->jumlah_tenaga_kerja = $validatedData['jumlahTenagaKerja'];
        $profileUMKM->no_ijin_usaha = $validatedData['noIjinUsaha'];
        $profileUMKM->no_npwp = $validatedData['noNPWP'];
        $profileUMKM->produk = $req->produk;
        $profileUMKM->merk = $req->merk;
        $profileUMKM->alamat_rumah = $req->alamatRumah;
        
        $profileUMKM->save();

        return redirect()->back();
    }
}
