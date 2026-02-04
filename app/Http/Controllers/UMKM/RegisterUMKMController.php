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
use Illuminate\Support\Facades\Http;

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
                'foto_ktp' => 'required|max:5120',
            ], [
                'nama.required' => 'Nama wajib diisi',
                'email.required' => 'Email wajib diisi',
                'email.email' => 'Format email tidak valid',
                'email.unique' => 'Email sudah terdaftar',
                'password.required' => 'Password wajib diisi',
                'namaUsaha.required' => 'Nama Usaha wajib diisi',
                'alamatUsaha.required' => 'Alamat Usaha wajib diisi',
                'kecamatan.required' => 'Kecamatan wajib diisi',
                'telepon.required' => 'Nomor Telepon wajib diisi',
                'jenisUsaha.required' => 'Jenis Usaha wajib diisi',
                'bidangUsaha.required' => 'Bidang Usaha wajib diisi',
                'jumlahTenagaKerja.required' => 'Jumlah Tenaga Kerja wajib diisi',
                'noIjinUsaha.required' => 'Nomor Ijin Usaha wajib diisi',
                'noNPWP.required' => 'Nomor NPWP wajib diisi',
                'nik.required' => 'NIK wajib diisi',
                'nik.digits' => 'NIK harus 16 digit',
                'nik.unique' => 'NIK sudah terdaftar',
                'foto_ktp.required' => 'Foto KTP wajib diisi',
                'foto_ktp.max' => 'Ukuran Foto KTP maksimal 5 MB',
            ]);

            $fotoKtpPath = null;
            if ($req->hasFile('foto_ktp')) {
                $file = $req->file('foto_ktp');
                $filename = time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
                $file->move(public_path('storage/ktp'), $filename);
                $fotoKtpPath = 'ktp/' . $filename;
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

            $adminNumbers = explode(',', env('ADMIN_WA_NUMBERS', ''));
            foreach ($adminNumbers as $number) {
                try {
                    Http::post('http://wabot.tukarjual.com/send', [
                        'to' => trim($number),
                        'message' => "Halo Admin, ada pendaftar UMKM baru.\n\nNama: {$validatedData['nama']}\nNIK: {$validatedData['nik']}\nNo Telepon: {$validatedData['telepon']}\nNama Usaha: {$validatedData['namaUsaha']}",
                    ]);
                } catch (\Throwable $th) {
                    // ignore error
                }
            }

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
