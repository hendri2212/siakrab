import { useState } from "react";
import { useForm } from "@inertiajs/react";
import { toast } from "react-hot-toast";

import AdminLayout from "@/Layouts/AdminLayout";
import Button from "@/Components/Button";
import Modal from "@/Components/Modal";
import TextInput from "@/Components/TextInput";
import Loading from "@/Components/Loading";
import InputError from "@/Components/InputError";
import Checkbox from "@/Components/Checkbox";
import { FaSave } from "react-icons/fa";
import { BsPlusLg } from "react-icons/bs";
import { TbArrowsExchange2 } from "react-icons/tb";

export default function CarouselManagement({ auth, listCarousel }) {
    const [showModal, setShowModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editId, setEditId] = useState(null);
    const { data, setData, post, processing, errors, reset } = useForm({
        title: "",
        image: null,
        link: "",
        is_active: true,
    });
    const [imagePreview, setImagePreview] = useState(null);

    function handleImageUpload(e) {
        const file = e.target.files[0];
        setData("image", file);

        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    }

    function handleStore(e) {
        e.preventDefault();

        const routeName = editMode
            ? route("carousel.update", editId)
            : route("carousel.store");

        post(routeName, {
            onSuccess: () => {
                toast.success(
                    editMode
                        ? "Carousel berhasil diupdate."
                        : "Carousel berhasil ditambahkan."
                );
                closeModal();
            },
            onError: (errors) => {
                Object.values(errors).forEach((error) => {
                    toast.error(error);
                });
            },
        });
    }

    function openAddModal() {
        setEditMode(false);
        setEditId(null);
        reset();
        setImagePreview(null);
        setShowModal(true);
    }

    function openEditModal(carousel) {
        setEditMode(true);
        setEditId(carousel.id);
        setData({
            title: carousel.title || "",
            image: null,
            link: carousel.link || "",
            is_active: carousel.is_active,
        });
        setImagePreview("/images/carousel/" + carousel.image);
        setShowModal(true);
    }

    function closeModal() {
        setShowModal(false);
        reset();
        setImagePreview(null);
        setEditMode(false);
        setEditId(null);
    }

    function handleDelete(id) {
        if (confirm("Apakah Anda yakin ingin menghapus carousel ini?")) {
            post(route("carousel.delete", id), {
                onSuccess: () => {
                    toast.success("Carousel berhasil dihapus.");
                },
            });
        }
    }

    function handleToggle(id) {
        post(route("carousel.toggle", id), {
            onSuccess: () => {
                toast.success("Status carousel berhasil diubah.");
            },
        });
    }

    return (
        <AdminLayout
            auth={auth}
            cta={
                <Button
                    variant={"primary"}
                    text={"Tambah"}
                    icon={<BsPlusLg />}
                    onClick={openAddModal}
                />
            }
        >
            <div className="w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {listCarousel.map((carousel) => (
                        <div
                            key={carousel.id}
                            className={`relative rounded-lg overflow-hidden border ${carousel.is_active
                                    ? "border-green-300"
                                    : "border-gray-300 opacity-60"
                                }`}
                        >
                            <img
                                src={"/images/carousel/" + carousel.image}
                                alt={carousel.title || "Carousel"}
                                className="w-full h-32 object-cover"
                            />
                            <div className="p-3">
                                <h3 className="font-medium text-sm truncate">
                                    {carousel.title || "(Tanpa judul)"}
                                </h3>
                                {carousel.link && (
                                    <p className="text-xs text-gray-500 truncate">
                                        {carousel.link}
                                    </p>
                                )}
                                <div className="flex gap-2 mt-2">
                                    <button
                                        onClick={() => openEditModal(carousel)}
                                        className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleToggle(carousel.id)}
                                        className={`text-xs px-2 py-1 rounded ${carousel.is_active
                                                ? "bg-yellow-100 text-yellow-700"
                                                : "bg-green-100 text-green-700"
                                            }`}
                                    >
                                        {carousel.is_active ? "Nonaktifkan" : "Aktifkan"}
                                    </button>
                                    <button
                                        onClick={() => handleDelete(carousel.id)}
                                        className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded"
                                    >
                                        Hapus
                                    </button>
                                </div>
                            </div>
                            {carousel.is_active && (
                                <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded">
                                    Aktif
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {listCarousel.length === 0 && (
                    <div className="text-center py-10 text-gray-500">
                        Belum ada carousel. Klik tombol "Tambah" untuk menambahkan.
                    </div>
                )}
            </div>

            <Modal maxWidth="md" show={showModal} onClose={closeModal}>
                <h1 className="font-semibold text-xl mb-6 flex items-center gap-x-3">
                    <BsPlusLg size={20} />
                    <span>{editMode ? "Edit Carousel" : "Tambah Carousel"}</span>
                </h1>

                <form onSubmit={handleStore} className="flex flex-col gap-y-4">
                    <div>
                        <TextInput
                            label="Judul (opsional)"
                            placeholder="Judul carousel"
                            value={data.title}
                            onChange={(e) => setData("title", e.target.value)}
                        />
                    </div>

                    <div>
                        <label>
                            <div className="rounded-md border border-dashed border-gray-300 h-[4rem] w-full flex justify-center items-center cursor-pointer hover:bg-gray-50 duration-300">
                                <div className="flex items-center gap-x-3 text-gray-500">
                                    {imagePreview ? (
                                        <TbArrowsExchange2 />
                                    ) : (
                                        <BsPlusLg />
                                    )}
                                    <span>
                                        {imagePreview ? "Ganti" : "Upload"} Gambar
                                    </span>
                                </div>
                            </div>
                            <input
                                type="file"
                                hidden
                                accept="image/*"
                                onChange={handleImageUpload}
                            />
                        </label>
                        <InputError message={errors["image"]} />
                        {imagePreview && (
                            <div className="mt-3">
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="h-24 rounded object-cover"
                                />
                            </div>
                        )}
                    </div>

                    <div>
                        <TextInput
                            label="Link (opsional)"
                            placeholder="https://..."
                            value={data.link}
                            onChange={(e) => setData("link", e.target.value)}
                        />
                    </div>

                    <div className="flex items-center gap-x-3">
                        <Checkbox
                            id="is_active"
                            checked={data.is_active}
                            onChange={(e) =>
                                setData("is_active", e.target.checked)
                            }
                        />
                        <label htmlFor="is_active">Aktif</label>
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
