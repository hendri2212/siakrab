import { useState } from "react";
import { useForm } from "@inertiajs/react";
import { toast } from "react-hot-toast";

import AdminLayout from "@/Layouts/AdminLayout";
import Button from "@/Components/Button";
import Modal from "@/Components/Modal";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import TextArea from "@/Components/TextArea";
import Loading from "@/Components/Loading";
import InputError from "@/Components/InputError";
import Checkbox from "@/Components/Checkbox";
import { FaSave } from "react-icons/fa";
import { BsPlusLg } from "react-icons/bs";
import { TbArrowsExchange2 } from "react-icons/tb";
import { DataTable } from "./Partial/DataTable";

import { listKategori } from "@/Constants";

export default function ProductsManagement({ auth, listProductsUMKM }) {
    const [showModal, setShowModal] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        kategori: "",
        thumbnail: null,
        images: null,
        nama: "",
        deskripsi: "",
        harga_start: "",
        harga_end: "",
        harga_fix: "",
        detail: {},
    });
    const [selectedKategori, setSelectedKategori] = useState("Pilih Kategori");
    const [hargaType, setHargaType] = useState("");
    const [thumbnail, setThumbnail] = useState(null);
    const [thumbnailName, setThumbnailName] = useState("");
    const [images, setImages] = useState([]);
    const [imagesName, setImagesName] = useState([]);

    function handleImageUpload(e) {
        const file = e.target.files[0];
        setData("thumbnail", file);

        if (file) {
            const reader = new FileReader();

            reader.onload = (e) => {
                setThumbnail(e.target.result);
            };

            reader.readAsDataURL(file);
            setThumbnailName(file.name);
        }
    }

    const handleMultipleImageUpload = (e) => {
        const files = e.target.files;

        setData("images", files);

        if (files) {
            const imagesArray = [];

            const filesArray = [...files];

            filesArray.forEach((file) => {
                const reader = new FileReader();

                reader.onload = (e) => {
                    imagesArray.push(e.target.result);
                    setImagesName((prev) => [...prev, file.name]);
                };

                reader.readAsDataURL(file);
            });

            setImages(imagesArray);
        }
    };

    function handleStore(e) {
        e.preventDefault();

        post(route("productUMKM.store"), {
            onSuccess: () => {
                toast.success("Berhasil menyimpan data produk.");
                setShowModal(false);
                reset();
                setSelectedKategori("Pilih Kategori");
                setThumbnail(null);
                setThumbnailName("");
                setHargaType("");
            },
            onError: () => {
                toast.error("Gagal menyimpan data produk");
            },
        });
    }

    return (
        <AdminLayout auth={auth}>
            <div className="max-w-[75vw] overflow-auto">
                <DataTable data={listProductsUMKM} />
            </div>

            <Modal
                maxWidth="lg"
                show={showModal}
                onClose={() => setShowModal(false)}
            >
                <h1 className="font-semibold text-xl mb-10 flex items-center gap-x-3">
                    <>
                        <BsPlusLg size={25} />
                        <span>Tambah Produk</span>
                    </>
                </h1>
                <form onSubmit={handleStore} className="flex flex-col gap-y-5">
                    <div>
                        <SelectInput>
                            <SelectInput.Trigger
                                label={"Kategori Produk"}
                                selected={selectedKategori !== "Pilih Kategori"}
                            >
                                <div
                                    className={
                                        selectedKategori === "Pilih Kategori"
                                            ? "text-gray-500"
                                            : ""
                                    }
                                >
                                    {selectedKategori}
                                </div>
                            </SelectInput.Trigger>
                            <SelectInput.Content positionClass={"top-12"}>
                                <div className="max-h-[12rem] overflow-auto">
                                    <ul>
                                        {listKategori.map((kategori, i) => (
                                            <li
                                                key={i}
                                                className="py-2 rounded-md cursor-pointer hover:bg-gray-100 hover:px-4 duration-300"
                                                onClick={() => {
                                                    setSelectedKategori(
                                                        kategori
                                                    );
                                                    setData(
                                                        "kategori",
                                                        kategori
                                                    );
                                                }}
                                            >
                                                {kategori}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </SelectInput.Content>
                        </SelectInput>
                        <InputError message={errors["kategori"]} />
                    </div>
                    <div>
                        <label>
                            <div className="rounded-md border border-dashed border-gray-300 h-[4rem] w-full flex justify-center items-center cursor-pointer hover:bg-gray-50 duration-300">
                                <div className="flex items-center gap-x-3 text-gray-500">
                                    {thumbnail ? (
                                        <TbArrowsExchange2 />
                                    ) : (
                                        <BsPlusLg />
                                    )}
                                    <span>
                                        {thumbnail ? "Ganti" : "Upload"} Gambar
                                        (Thumbnail)
                                    </span>
                                </div>
                            </div>
                            <input
                                type="file"
                                hidden
                                onChange={handleImageUpload}
                            />
                        </label>
                        <InputError message={errors["thumbnail"]} />
                        {thumbnail && (
                            <div className="p-3 border rounded-md mt-3">
                                <div className="h-[5rem] flex gap-x-5">
                                    <div>
                                        <img
                                            src={thumbnail}
                                            alt="Preview"
                                            className="h-full"
                                        />
                                    </div>
                                    <p className="text-gray-500">
                                        {thumbnailName}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                    <div>
                        <label>
                            <div className="rounded-md border border-dashed border-gray-300 h-[4rem] w-full flex justify-center items-center cursor-pointer hover:bg-gray-50 duration-300">
                                <div className="flex items-center gap-x-3 text-gray-500">
                                    {images.length > 0 ? (
                                        <TbArrowsExchange2 />
                                    ) : (
                                        <BsPlusLg />
                                    )}
                                    <span>
                                        {images.length > 0 ? "Ganti" : "Upload"}{" "}
                                        Gambar Lainnya
                                    </span>
                                </div>
                            </div>
                            <input
                                type="file"
                                hidden
                                onChange={handleMultipleImageUpload}
                                multiple
                            />
                        </label>
                        <InputError message={errors["images"]} />
                        {images.length > 0 &&
                            images.map((image, i) => (
                                <div
                                    key={i}
                                    className="p-3 border rounded-md mt-3"
                                >
                                    <div className="h-[5rem] flex gap-x-5">
                                        <div>
                                            <img
                                                src={image}
                                                alt="Preview"
                                                className="h-full"
                                            />
                                        </div>
                                        <p className="text-gray-500">
                                            {imagesName[i]}
                                        </p>
                                    </div>
                                </div>
                            ))}
                    </div>
                    <div>
                        <TextInput
                            label="Nama Produk"
                            placeholder="Nama Produk"
                            value={data.nama}
                            onChange={(e) => setData("nama", e.target.value)}
                        />
                        <InputError message={errors["nama"]} />
                    </div>
                    <div>
                        <TextArea
                            label="Deskripsi"
                            placeholder="Deskripsi"
                            value={data.deskripsi}
                            onChange={(e) =>
                                setData("deskripsi", e.target.value)
                            }
                        />
                        <InputError message={errors["deskripsi"]} />
                    </div>
                    <div className="flex gap-x-5">
                        <div className="flex items-center gap-x-3">
                            <Checkbox
                                id="hargaRange"
                                checked={hargaType === "range"}
                                onChange={() => setHargaType("range")}
                            />
                            <label htmlFor="hargaRange">Harga Range</label>
                        </div>
                        <div className="flex items-center gap-x-3">
                            <Checkbox
                                id="hargaFix"
                                checked={hargaType === "fix"}
                                onChange={() => setHargaType("fix")}
                            />
                            <label htmlFor="hargaFix">Harga Tetap</label>
                        </div>
                    </div>
                    <div>
                        {hargaType !== "" && <p>Rp. </p>}
                        {hargaType === "range" && (
                            <section className="grid grid-cols-2 gap-5">
                                <TextInput
                                    type="number"
                                    label="Dari Harga"
                                    placeholder="Dari Harga"
                                    value={data.harga_start}
                                    onChange={(e) =>
                                        setData("harga_start", e.target.value)
                                    }
                                />
                                <InputError message={errors["harga_start"]} />
                                <TextInput
                                    type="number"
                                    label="Hingga Harga"
                                    placeholder="Hingga Harga"
                                    value={data.harga_end}
                                    onChange={(e) =>
                                        setData("harga_end", e.target.value)
                                    }
                                />
                                <InputError message={errors["harga_end"]} />
                            </section>
                        )}
                        {hargaType === "fix" && (
                            <>
                                <TextInput
                                    type="number"
                                    label="Harga Produk"
                                    placeholder="Harga Produk"
                                    value={data.harga_fix}
                                    onChange={(e) =>
                                        setData("harga_fix", e.target.value)
                                    }
                                />
                                <InputError message={errors["harga_fix"]} />
                            </>
                        )}
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
        </AdminLayout>
    );
}
