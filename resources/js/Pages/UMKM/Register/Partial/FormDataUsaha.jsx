import { useState } from "react";

import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";

import { listKategori as jenisUsahas } from "@/Constants";
import { kecamatans } from "@/Constants";

export default function FormDataUsaha({
    namaUsaha,
    alamatUsaha,
    kecamatan,
    telepon,
    jenisUsaha,
    setData,
    errors,
}) {
    const [selectedKecamatan, setSelectedKecamatan] = useState(
        kecamatan || "Pilih Kecamatan"
    );
    const [selectedUsaha, setSelectedUsaha] = useState(
        jenisUsaha || "Pilih Jenis Usaha"
    );

    return (
        <div className="flex flex-col gap-y-5">
            <div>
                <TextInput
                    label="Nama Usaha"
                    placeholder={"Nama Usaha"}
                    name="namaUsaha"
                    value={namaUsaha}
                    required
                    onChange={(e) => setData("namaUsaha", e.target.value)}
                />
                <InputError message={errors["namaUsaha"]} />
            </div>
            <div>
                <TextInput
                    label="Alamat Usaha"
                    placeholder={"Alamat Usaha"}
                    name="alamatUsaha"
                    value={alamatUsaha}
                    required
                    onChange={(e) => setData("alamatUsaha", e.target.value)}
                />
                <InputError message={errors["alamatUsaha"]} />
            </div>
            <div>
                <SelectInput>
                    <SelectInput.Trigger
                        label={"Kecamatan"}
                        selected={selectedKecamatan !== "Pilih Kecamatan"}
                    >
                        <div
                            className={
                                selectedKecamatan === "Pilih Kecamatan"
                                    ? "text-gray-500"
                                    : ""
                            }
                        >
                            {selectedKecamatan}
                        </div>
                    </SelectInput.Trigger>
                    <SelectInput.Content
                        positionClass={
                            "sm:top-12 top-auto sm:bottom-auto bottom-14"
                        }
                    >
                        <div className="sm:max-h-[10rem] max-h-[12rem] overflow-auto">
                            <ul>
                                {kecamatans.map((kecamatan, i) => (
                                    <li
                                        key={i}
                                        className="py-2 rounded-md cursor-pointer hover:bg-gray-100 hover:px-4 duration-300"
                                        onClick={() => {
                                            setSelectedKecamatan(kecamatan);
                                            setData("kecamatan", kecamatan);
                                        }}
                                    >
                                        {kecamatan}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </SelectInput.Content>
                </SelectInput>
                <InputError message={errors["kecamatan"]} />
            </div>
            <div>
                <TextInput
                    type="text"
                    label="No Telepon / WA"
                    placeholder={"No Telepon / WA"}
                    name="telepon"
                    value={telepon}
                    required
                    onChange={(e) => setData("telepon", e.target.value)}
                />
                <InputError message={errors["telepon"]} />
            </div>
            <div>
                <SelectInput>
                    <SelectInput.Trigger
                        label={"Jenis Usaha"}
                        selected={selectedUsaha !== "Pilih Jenis Usaha"}
                    >
                        <div
                            className={
                                selectedUsaha === "Pilih Jenis Usaha"
                                    ? "text-gray-500"
                                    : ""
                            }
                        >
                            {selectedUsaha}
                        </div>
                    </SelectInput.Trigger>
                    <SelectInput.Content positionClass={"bottom-14"}>
                        <div className="max-h-[12rem] overflow-auto">
                            <ul>
                                {jenisUsahas.map((usaha, i) => (
                                    <li
                                        key={i}
                                        className="py-2 rounded-md cursor-pointer hover:bg-gray-100 hover:px-4 duration-300"
                                        onClick={() => {
                                            setSelectedUsaha(usaha);
                                            setData("jenisUsaha", usaha);
                                        }}
                                    >
                                        {usaha}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </SelectInput.Content>
                </SelectInput>
                <InputError message={errors["jenisUsaha"]} />
            </div>
        </div>
    );
}
