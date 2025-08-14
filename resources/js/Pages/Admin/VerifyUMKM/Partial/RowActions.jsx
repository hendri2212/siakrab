import { useState } from "react";
import { useForm } from "@inertiajs/react";
import { toast } from "react-hot-toast";
import { TruncateText } from "@/Utils/truncateText";

import Modal from "@/Components/Modal";
import SelectInput from "@/Components/SelectInput";
import MyButton from "@/Components/Button";
import Loading from "@/Components/Loading";
import { MdVerified } from "react-icons/md";
import { BiBlock } from "react-icons/bi";
import { FaCheck } from "react-icons/fa6";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";

import { listKategori as jenisUsahas } from "@/Constants";
import { kecamatans } from "@/Constants";
import { FaEdit, FaSave } from "react-icons/fa";

const INITAL_VALUE = {
    id: "",
    namaUsaha: "",
    alamatUsaha: "",
    kecamatan: "",
    telepon: "",
    jenisUsaha: "",
    bidangUsaha: "",
    jumlahTenagaKerja: "",
    noIjinUsaha: "",
    noNPWP: "",
    role: "",
    produk: "",
    merk: "",
    alamatRumah: "",
};

export default function RowActions({ row }) {
    const pelakuUMKM = row.original;

    const [showModal, setShowModal] = useState(false);
    const [showModalUpdate, setShowModalUpdate] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState("Pilih Status");
    const { data, setData, post, processing, errors } = useForm(INITAL_VALUE);
    const [selectedUsaha, setSelectedUsaha] = useState(
        data.jenisUsaha || "Pilih Jenis Usaha"
    );
    const [selectedKecamatan, setSelectedKecamatan] = useState(
        data.kecamatan || "Pilih Kecamatan"
    );

    function handleVerify() {
        setShowModal(true);
    }

    function onSubmit(e) {
        e.preventDefault();

        post(route("verifyUMKM.update", pelakuUMKM.user_id), {
            onSuccess: () => {
                if (selectedStatus === "Terima") {
                    toast.success(
                        "Berhasil memverifikasi pendaftaran UMKM. dengan status diterima."
                    );
                } else {
                    toast.success(
                        "Berhasil memverifikasi pendaftaran UMKM. dengan status ditolak."
                    );
                }
                setShowModal(false);
                reset();
            },
            onError: () => {
                toast.promise("Gagal memverifikasi pendaftaran UMKM.");
            },
        });
    }

    function handleEdit() {
        setShowModalUpdate(true);
        setData({
            id: pelakuUMKM.id,
            namaUsaha: pelakuUMKM.nama_usaha,
            bidangUsaha: pelakuUMKM.bidang_usaha,
            jenisUsaha: pelakuUMKM.jenis_usaha,
            kecamatan: pelakuUMKM.kecamatan,
            alamatUsaha: pelakuUMKM.alamat_usaha,
            noIjinUsaha: pelakuUMKM.no_ijin_usaha,
            noNPWP: pelakuUMKM.no_npwp,
            telepon: pelakuUMKM.telepon,
            jumlahTenagaKerja: pelakuUMKM.jumlah_tenaga_kerja,
            produk: pelakuUMKM.produk,
            merk: pelakuUMKM.merk,
            alamatRumah: pelakuUMKM.alamat_rumah,
        });
        setSelectedUsaha(pelakuUMKM.jenis_usaha);
        setSelectedKecamatan(pelakuUMKM.kecamatan);
    }

    function handleUpdate(e) {
        e.preventDefault();

        post(route("pelakuUMKM.update"), {
            onSuccess: () => {
                toast.success("Berhasil memperbarui profile UMKM");
                setShowModalUpdate(false);
            },
            onError: () => {
                toast.error("Gagal memperbarui profile UMKM");
            },
        });
    }

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem
                        onClick={() =>
                            navigator.clipboard.writeText(pelakuUMKM.user.email)
                        }
                    >
                        Copy email
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleEdit(pelakuUMKM)}>
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleVerify}>
                        Verifikasi
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <Modal
                maxWidth="lg"
                show={showModal}
                onClose={() => setShowModal(false)}
            >
                <>
                    <div className="mb-10">
                        <h1 className="font-semibold text-xl flex items-center gap-x-3">
                            <MdVerified size={25} />
                            <span>Verifikasi</span>
                        </h1>
                        <p className="mt-3">
                            Verifikasi akun UMKM{" "}
                            <span className="text-primary">
                                {pelakuUMKM.user.name}
                            </span>
                        </p>
                    </div>
                    <form onSubmit={onSubmit}>
                        <SelectInput>
                            <SelectInput.Trigger>
                                {selectedStatus}
                            </SelectInput.Trigger>
                            <SelectInput.Content>
                                <ul>
                                    <li
                                        className="py-2 rounded-md cursor-pointer duration-300 hover:px-4 hover:bg-gray-100"
                                        onClick={() => {
                                            setSelectedStatus("Terima");
                                            setData("role", "umkmAdmin");
                                        }}
                                    >
                                        Terima
                                    </li>
                                    <li
                                        className="py-2 rounded-md cursor-pointer duration-300 hover:px-4 hover:bg-gray-100"
                                        onClick={() => {
                                            setSelectedStatus("Tolak");
                                            setData("role", "rejected");
                                        }}
                                    >
                                        Tolak
                                    </li>
                                </ul>
                            </SelectInput.Content>
                        </SelectInput>
                        {selectedStatus !== "Pilih Status" &&
                            (processing ? (
                                <Loading />
                            ) : (
                                <div className="mt-10 flex gap-x-3">
                                    <MyButton
                                        type={"button"}
                                        text={"Batal"}
                                        icon={<BiBlock />}
                                        className="w-full border hover:bg-gray-100"
                                        onClick={() => setShowModal(false)}
                                    />
                                    <MyButton
                                        variant={"primary"}
                                        text="Konfirmasi"
                                        icon={<FaCheck />}
                                        className="w-full
                            "
                                    />
                                </div>
                            ))}
                    </form>
                </>
            </Modal>

            <Modal
                maxWidth="lg"
                show={showModalUpdate}
                onClose={() => setShowModalUpdate(false)}
            >
                <h1 className="font-semibold text-xl mb-10 flex items-center gap-x-3">
                    <FaEdit size={25} />
                    <span>Edit Profile UMKM</span>
                </h1>
                <form onSubmit={handleUpdate} className="flex flex-col gap-5">
                    <div>
                        <TextInput
                            label="Nama Usaha"
                            placeholder={"Nama Usaha"}
                            name="namaUsaha"
                            value={data.namaUsaha}
                            required
                            onChange={(e) =>
                                setData("namaUsaha", e.target.value)
                            }
                        />
                        <InputError message={errors["namaUsaha"]} />
                    </div>
                    <div>
                        <TextInput
                            label="Bidang Usaha"
                            placeholder={"Bidang Usaha"}
                            name="bidangUsaha"
                            value={data.bidangUsaha}
                            required
                            onChange={(e) =>
                                setData("bidangUsaha", e.target.value)
                            }
                        />
                        <InputError message={errors["bidangUsaha"]} />
                    </div>
                    <div>
                        <TextInput
                            label="Produk"
                            placeholder={"Produk"}
                            name="produk"
                            value={data.produk}
                            required
                            onChange={(e) => setData("produk", e.target.value)}
                        />
                        <InputError message={errors["produk"]} />
                    </div>
                    <div>
                        <TextInput
                            label="Merk"
                            placeholder={"Merk"}
                            name="merk"
                            value={data.merk}
                            required
                            onChange={(e) => setData("merk", e.target.value)}
                        />
                        <InputError message={errors["merk"]} />
                    </div>
                    <div>
                        <TextInput
                            type="number"
                            label="Jumlah Tenaga Kerja"
                            placeholder={"Jumlah Tenaga Kerja"}
                            name="jumlahTenagaKerja"
                            value={data.jumlahTenagaKerja}
                            required
                            onChange={(e) =>
                                setData("jumlahTenagaKerja", e.target.value)
                            }
                        />
                        <InputError message={errors["jumlahTenagaKerja"]} />
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
                                                    setData(
                                                        "jenisUsaha",
                                                        usaha
                                                    );
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
                    <div>
                        <SelectInput>
                            <SelectInput.Trigger
                                label={"Kecamatan"}
                                selected={
                                    selectedKecamatan !== "Pilih Kecamatan"
                                }
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
                            <SelectInput.Content positionClass={"bottom-14"}>
                                <div className="sm:max-h-[10rem] max-h-[12rem] overflow-auto">
                                    <ul>
                                        {kecamatans.map((kecamatan, i) => (
                                            <li
                                                key={i}
                                                className="py-2 rounded-md cursor-pointer hover:bg-gray-100 hover:px-4 duration-300"
                                                onClick={() => {
                                                    setSelectedKecamatan(
                                                        kecamatan
                                                    );
                                                    setData(
                                                        "kecamatan",
                                                        kecamatan
                                                    );
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
                            label="Alamat Usaha"
                            placeholder={"Alamat Usaha"}
                            name="alamatUsaha"
                            value={data.alamatUsaha}
                            required
                            onChange={(e) =>
                                setData("alamatUsaha", e.target.value)
                            }
                        />
                        <InputError message={errors["alamatUsaha"]} />
                    </div>
                    <div>
                        <TextInput
                            label="Alamat Rumah"
                            placeholder={"Alamat Rumah"}
                            name="alamatRumah"
                            value={data.alamatRumah}
                            required
                            onChange={(e) =>
                                setData("alamatRumah", e.target.value)
                            }
                        />
                        <InputError message={errors["alamatRumah"]} />
                    </div>
                    <div>
                        <TextInput
                            label="Nomor Ijin Usaha"
                            placeholder={"Nomor Ijin Usaha"}
                            name="noIjinUsaha"
                            value={data.noIjinUsaha}
                            required
                            onChange={(e) =>
                                setData("noIjinUsaha", e.target.value)
                            }
                        />
                        <InputError message={errors["noIjinUsaha"]} />
                    </div>
                    <div>
                        <TextInput
                            label="Nomor NPWP"
                            placeholder={"Nomor NPWP"}
                            name="noNPWP"
                            value={data.noNPWP}
                            required
                            onChange={(e) => setData("noNPWP", e.target.value)}
                        />
                        <InputError message={errors["noNPWP"]} />
                    </div>
                    <div>
                        <TextInput
                            type="text"
                            label="No Telepon / WA"
                            placeholder={"No Telepon / WA"}
                            name="telepon"
                            value={data.telepon}
                            required
                            onChange={(e) => setData("telepon", e.target.value)}
                        />
                        <InputError message={errors["telepon"]} />
                    </div>
                    {processing ? (
                        <Loading />
                    ) : (
                        <MyButton
                            variant={"primary"}
                            text={"Simpan"}
                            icon={<FaSave />}
                        />
                    )}
                </form>
            </Modal>
        </>
    );
}
