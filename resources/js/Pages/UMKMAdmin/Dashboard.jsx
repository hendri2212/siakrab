import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useForm } from "@inertiajs/react";

import UMKMAdminLayout from "@/Layouts/UMKMAdminLayout";
import Button from "@/Components/Button";
import Modal from "@/Components/Modal";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";
import Loading from "@/Components/Loading";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { FaEdit, FaSave, FaStore, FaThList } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi";

import { listKategori as jenisUsahas } from "@/Constants";
import { kecamatans } from "@/Constants";

const INITAL_VALUE = {
    namaUsaha: "",
    alamatUsaha: "",
    kecamatan: "",
    telepon: "",
    jenisUsaha: "",
    bidangUsaha: "",
    jumlahTenagaKerja: "",
    noIjinUsaha: "",
    noNPWP: "",
};

export default function Dashboard({
    auth,
    profileUMKM,
    productCounts,
    categoryCounts,
}) {
    const { data, setData, post, processing, errors } = useForm(INITAL_VALUE);
    const [showModal, setShowModal] = useState(false);
    const [selectedUsaha, setSelectedUsaha] = useState(
        data.jenisUsaha || "Pilih Jenis Usaha"
    );
    const [selectedKecamatan, setSelectedKecamatan] = useState(
        data.kecamatan || "Pilih Kecamatan"
    );

    function handleEdit() {
        setShowModal(true);
        setData({
            namaUsaha: profileUMKM?.nama_usaha,
            bidangUsaha: profileUMKM?.bidang_usaha,
            jenisUsaha: profileUMKM?.jenis_usaha,
            kecamatan: profileUMKM?.kecamatan,
            alamatUsaha: profileUMKM?.alamat_usaha,
            noIjinUsaha: profileUMKM?.no_ijin_usaha,
            noNPWP: profileUMKM?.no_npwp,
            telepon: profileUMKM?.telepon,
            jumlahTenagaKerja: profileUMKM?.jumlah_tenaga_kerja,
            produk: profileUMKM?.produk,
            merk: profileUMKM?.merk,
            alamatRumah: profileUMKM?.alamat_rumah,
        });
        setSelectedUsaha(profileUMKM?.jenis_usaha);
        setSelectedKecamatan(profileUMKM?.kecamatan);
    }

    function handleUpdate(e) {
        e.preventDefault();

        post(route("profileUMKM?.update"), {
            onSuccess: () => {
                toast.success("Berhasil memperbarui profile UMKM");
                setShowModal(false);
            },
            onError: () => {
                toast.error("Gagal memperbarui profile UMKM");
            },
        });
    }

    useEffect(() => {
        if (!auth) return;
        if (auth.user.role === null)
            toast("Akun UMKM masih menunggu persetujuan Admin!", {
                icon: (
                    <BsFillInfoCircleFill
                        size={30}
                        className="mr-3 text-primary"
                    />
                ),
            });
    }, []);

    return (
        <UMKMAdminLayout auth={auth}>
            <div>
                <section className="mb-5 w-full grid grid-cols-3 gap-5">
                    <div className="border-b-2 bg-[#9FFFFF] p-5 rounded-md relative">
                        <div className="absolute top-4 right-4">
                            <FaStore size={20} />
                        </div>
                        <h1 className="font-bold text-4xl">{productCounts}</h1>
                        <p>Total Produk</p>
                    </div>
                    <div className="border-b-2 bg-[#FBB2FF] p-5 rounded-md relative">
                        <div className="absolute top-4 right-4">
                            <FaThList size={20} />
                        </div>
                        <h1 className="font-bold text-4xl">{categoryCounts}</h1>
                        <p>Sektor Produk </p>
                    </div>
                    <div className="border-b-2 bg-[#daff7d] p-5 rounded-md relative">
                        <div className="absolute top-4 right-4">
                            <HiUserGroup size={20} />
                        </div>
                        <h1 className="font-bold text-4xl">
                            {profileUMKM?.jumlah_tenaga_kerja}
                        </h1>
                        <p>Tenaga Kerja</p>
                    </div>
                </section>
                <section className="p-5 w-full border rounded-md flex gap-5">
                    <table className="w-full mb-5">
                        <tbody>
                            <tr className="border-b mb-3">
                                <td className="py-3 font-semibold">
                                    Nama Usaha
                                </td>
                                <td className="px-2">:</td>
                                <td className="py-3">
                                    {profileUMKM?.nama_usaha}
                                </td>
                            </tr>
                            <tr className="border-b mb-3">
                                <td className="py-3 font-semibold">
                                    Bidang Usaha
                                </td>
                                <td className="px-2">:</td>
                                <td className="py-3">
                                    {profileUMKM?.bidang_usaha}
                                </td>
                            </tr>
                            <tr className="border-b mb-3">
                                <td className="py-3 font-semibold">
                                    Jenis Usaha
                                </td>
                                <td className="px-2">:</td>
                                <td className="py-3">
                                    {profileUMKM?.jenis_usaha}
                                </td>
                            </tr>
                            <tr className="border-b mb-3">
                                <td className="py-3 font-semibold">Produk</td>
                                <td className="px-2">:</td>
                                <td className="py-3">{profileUMKM?.produk}</td>
                            </tr>
                            <tr className="border-b mb-3">
                                <td className="py-3 font-semibold">Merk</td>
                                <td className="px-2">:</td>
                                <td className="py-3">{profileUMKM?.merk}</td>
                            </tr>
                            <tr className="border-b">
                                <td className="py-3 font-semibold">
                                    Kecamatan
                                </td>
                                <td className="px-2">:</td>
                                <td className="py-3">
                                    {profileUMKM?.kecamatan}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table className="w-full mb-5">
                        <tbody>
                            <tr className="border-b">
                                <td className="py-3 font-semibold">
                                    Alamat Usaha
                                </td>
                                <td className="px-2">:</td>
                                <td className="py-3">
                                    {profileUMKM?.alamat_usaha}
                                </td>
                            </tr>
                            <tr className="border-b">
                                <td className="py-3 font-semibold">
                                    Alamat Rumah
                                </td>
                                <td className="px-2">:</td>
                                <td className="py-3">
                                    {profileUMKM?.alamat_rumah}
                                </td>
                            </tr>
                            <tr className="border-b">
                                <td className="py-3 font-semibold">
                                    Nomor Ijin Usaha
                                </td>
                                <td className="px-2">:</td>
                                <td className="py-3">
                                    {profileUMKM?.no_ijin_usaha}
                                </td>
                            </tr>
                            <tr className="border-b">
                                <td className="py-3 font-semibold">
                                    Nomor NPWP
                                </td>
                                <td className="px-2">:</td>
                                <td className="py-3">{profileUMKM?.no_npwp}</td>
                            </tr>
                            <tr className="border-b">
                                <td className="py-3 font-semibold">
                                    Nomor Telepon
                                </td>
                                <td className="px-2">:</td>
                                <td className="py-3">{profileUMKM?.telepon}</td>
                            </tr>
                        </tbody>
                    </table>
                    <Button text={"Edit"} onClick={handleEdit} />
                </section>
                <Modal
                    maxWidth="lg"
                    show={showModal}
                    onClose={() => setShowModal(false)}
                >
                    <h1 className="font-semibold text-xl mb-10 flex items-center gap-x-3">
                        <FaEdit size={25} />
                        <span>Edit Profile UMKM</span>
                    </h1>
                    <form
                        onSubmit={handleUpdate}
                        className="flex flex-col gap-5"
                    >
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
                                name="namaUsaha"
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
                                onChange={(e) =>
                                    setData("produk", e.target.value)
                                }
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
                                onChange={(e) =>
                                    setData("merk", e.target.value)
                                }
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
                                    selected={
                                        selectedUsaha !== "Pilih Jenis Usaha"
                                    }
                                >
                                    <div
                                        className={
                                            selectedUsaha ===
                                            "Pilih Jenis Usaha"
                                                ? "text-gray-500"
                                                : ""
                                        }
                                    >
                                        {selectedUsaha}
                                    </div>
                                </SelectInput.Trigger>
                                <SelectInput.Content
                                    positionClass={"bottom-14"}
                                >
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
                                            selectedKecamatan ===
                                            "Pilih Kecamatan"
                                                ? "text-gray-500"
                                                : ""
                                        }
                                    >
                                        {selectedKecamatan}
                                    </div>
                                </SelectInput.Trigger>
                                <SelectInput.Content
                                    positionClass={"bottom-14"}
                                >
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
                                onChange={(e) =>
                                    setData("noNPWP", e.target.value)
                                }
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
                                onChange={(e) =>
                                    setData("telepon", e.target.value)
                                }
                            />
                            <InputError message={errors["telepon"]} />
                        </div>
                        {processing ? (
                            <Loading />
                        ) : (
                            <Button
                                variant={"primary"}
                                text={"Simpan"}
                                icon={<FaSave />}
                            />
                        )}
                    </form>
                </Modal>
            </div>
        </UMKMAdminLayout>
    );
}
