<?php

namespace App\Imports;

use App\Models\PelakuUMKM;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Maatwebsite\Excel\Concerns\ToModel;

class PelakuUMKMImport implements ToModel
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        // return new PelakuUMKM([

        // ]);

        return new User([
            'name'     => $row[0],
            'email'    => $row[6], 
            'password' => $row[7],
        ]);
    }
}
