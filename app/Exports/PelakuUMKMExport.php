<?php

namespace App\Exports;

use App\Models\PelakuUMKM;
use App\Models\User;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithColumnFormatting;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use PhpOffice\PhpSpreadsheet\Style\NumberFormat;

class PelakuUMKMExport implements FromCollection, WithHeadings, WithMapping, WithColumnFormatting
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return PelakuUMKM::all();
    }

    public function headings(): array
    {
        return [
            'Status',
            'Nama',
            'Email',
            'Nama Usaha',
            'Jenis Usaha',
            'Bidang Usaha',
            'Produk',
            'Merk',
            'Alamat Usaha',
            'Alamat Rumah',
            'Kecamatan',
            'Jumlah Tenaga Kerja',
            'No Ijin Usaha',
            'NPWP'
        ];
    }

    public function map($item): array
    {
        $user = User::where('id', $item->user_id)->first();

        $status = 'Pending';

        if($user->role === 'umkmAdmin'){
            $status = 'Aktif';
        }else {
            $status = 'Pending';
        }

        return [
            $status,
            $user->name,
            $user->email,
            $item->nama_usaha,
            $item->jenis_usaha,
            $item->bidang_usaha,
            $item->produk,
            $item->merk,
            $item->alamat_usaha,
            $item->alamat_rumah,
            $item->kecamatan,
            $item->jumlah_tenaga_kerja,
            $item->no_ijin_usaha,
            $item->no_npwp
        ];
    }

    public function columnFormats(): array
    {
        return [
            // 'I' => NumberFormat::FORMAT_NUMBER,
            // 'J' => NumberFormat::FORMAT_NUMBER,
            // 'K' => NumberFormat::FORMAT_NUMBER,
        ];
    }
}
