<?php

namespace App\Http\Controllers\UMKM;

use App\Http\Controllers\Controller;
use App\Models\PelakuUMKM;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class RegisterUMKMController extends Controller
{
    public function create()
    {
        return Inertia::render('UMKM/Register/Register');
    }

    public function store(Request $req)
    {
        DB::beginTransaction();

        try {
            $validatedData = $req->validate([
                'nama' => 'required',
                'email' => 'required|email|max:255|unique:' . User::class,
                'password' => 'required',
                'namaUsaha' => 'required',
                'alamatUsaha' => 'required',
                'kecamatan' => 'required',
                'telepon' => 'required',
                'jenisUsaha' => 'required',
                'bidangUsaha' => 'required',
                'jumlahTenagaKerja' => 'required',
                'noIjinUsaha' => 'required',
                'noNPWP' => 'required',
                'nik' => 'required|digits:16|unique:pelaku_umkms,nik',
                'foto_ktp' => 'required|image|mimes:jpg,jpeg,png|max:2048',
            ]);

            $fotoKtpPath = null;
            if ($req->hasFile('foto_ktp')) {
                $fotoKtpPath = $req->file('foto_ktp')->store('ktp', 'public');
            }

            $user = User::create([
                'name' => $validatedData['nama'],
                'email' => $validatedData['email'],
                'password' => Hash::make($validatedData['password']),
            ]);

            PelakuUMKM::create([
                'nama_usaha' => $validatedData['namaUsaha'],
                'alamat_usaha' => $validatedData['alamatUsaha'],
                'kecamatan' => $validatedData['kecamatan'],
                'telepon' => $validatedData['telepon'],
                'jenis_usaha' => $validatedData['jenisUsaha'],
                'bidang_usaha' => $validatedData['bidangUsaha'],
                'jumlah_tenaga_kerja' => $validatedData['jumlahTenagaKerja'],
                'no_ijin_usaha' => $validatedData['noIjinUsaha'],
                'no_npwp' => $validatedData['noNPWP'],
                'nik' => $validatedData['nik'],
                'foto_ktp' => $fotoKtpPath,
                'user_id' => $user->id,
            ]);

            DB::commit();

            return to_route('registerUMKM.waiting');
        } catch (\Throwable $th) {
            DB::rollback();
            throw $th;
            return redirect()->back();
        }
    }

    public function waiting()
    {
        return Inertia::render('UMKM/Register/AfterRegister');
    }
}
