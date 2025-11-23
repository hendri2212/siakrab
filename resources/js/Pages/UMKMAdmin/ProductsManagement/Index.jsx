import { useEffect, useRef, useState } from "react";
import { useForm } from "@inertiajs/react";
import { toast } from "react-hot-toast";
import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { useDebounceEffect } from "@/Hooks/useDebounceEffect";
import { canvasPreview } from "@/Utils/canvasPreview";

import UMKMAdminLayout from "@/Layouts/UMKMAdminLayout";
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
import { IoSaveSharp } from "react-icons/io5";
import { TbArrowsExchange2 } from "react-icons/tb";
import { MdClose } from "react-icons/md";
import { DataTable } from "./Partial/DataTable";

import { listKategori } from "@/Constants";

export default function ProductsManagement({ auth, listProductsUMKM, pelakuUMKM }) {
    const [showModal, setShowModal] = useState(false);
    const { data, setData, post, processing, errors, reset, transform } = useForm({
        kategori: pelakuUMKM.jenis_usaha,
        thumbnail: null,
        images: null,
        nama: "",
        deskripsi: "",
        harga_fix: "",
        detail: {},
    });
    const [thumbnail, setThumbnail] = useState(null);
    const [thumbnailName, setThumbnailName] = useState("");
    const [images, setImages] = useState([]);
    const [imagesName, setImagesName] = useState([]);
    const previewCanvasRef = useRef(null);
    const imgRef = useRef(null);
    const hiddenAnchorRef = useRef(null);
    const blobUrlRef = useRef("");
    const [crop, setCrop] = useState();
    const [completedCrop, setCompletedCrop] = useState();
    const [scale, setScale] = useState(1);
    const [rotate, setRotate] = useState(0);
    const [aspect, setAspect] = useState(null);
    const [croppedThumbnail, setCroppedThumbnail] = useState(null);

    function handleImageUpload(e) {
        const file = e.target.files[0];
        setData("thumbnail", file);
        setCroppedThumbnail(null);

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

        transform((data) => ({
            ...data,
            harga_fix: data.harga_fix.replace(/\./g, ""),
        }));

        post(route("productUMKM.store"), {
            onSuccess: () => {
                toast.success("Berhasil menyimpan data produk.");
                setShowModal(false);
                reset();
                setThumbnail(null);
                setThumbnailName("");
                setImages("");
            },
            onError: () => {
                console.log(errors);
                toast.error("Gagal menyimpan data produk");
            },
        });
    }

    function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
        return centerCrop(
            makeAspectCrop(
                {
                    unit: "%",
                    width: 90,
                },
                aspect,
                mediaWidth,
                mediaHeight
            ),
            mediaWidth,
            mediaHeight
        );
    }

    function onImageLoad(e) {
        if (aspect) {
            const { width, height } = e.currentTarget;
            setCrop(centerAspectCrop(width, height, aspect));
        }
    }

    async function saveCropedImage() {
        const image = imgRef.current;
        const previewCanvas = previewCanvasRef.current;
        if (!image || !previewCanvas || !completedCrop) {
            throw new Error("Crop canvas does not exist");
        }

        // This will size relative to the uploaded image
        // size. If you want to size according to what they
        // are looking at on screen, remove scaleX + scaleY
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;

        const offscreen = new OffscreenCanvas(
            completedCrop.width * scaleX,
            completedCrop.height * scaleY
        );
        const ctx = offscreen.getContext("2d");
        if (!ctx) {
            throw new Error("No 2d context");
        }

        ctx.drawImage(
            previewCanvas,
            0,
            0,
            previewCanvas.width,
            previewCanvas.height,
            0,
            0,
            offscreen.width,
            offscreen.height
        );
        // You might want { type: "image/jpeg", quality: <0 to 1> } to
        // reduce image size
        const blob = await offscreen.convertToBlob({
            type: "image/png",
        });

        const fileThumbnail = new File([blob], "image.png", {
            type: "image/png",
        });

        setCroppedThumbnail(fileThumbnail);

        // if (blobUrlRef.current) {
        //     URL.revokeObjectURL(blobUrlRef.current);
        // }
        // blobUrlRef.current = URL.createObjectURL(blob);
        // hiddenAnchorRef.current.href = blobUrlRef.current;
        // hiddenAnchorRef.current.click();
    }

    useDebounceEffect(
        async () => {
            if (
                completedCrop?.width &&
                completedCrop?.height &&
                imgRef.current &&
                previewCanvasRef.current
            ) {
                canvasPreview(
                    imgRef.current,
                    previewCanvasRef.current,
                    completedCrop,
                    scale,
                    rotate
                );
            }
        },
        100,
        [completedCrop, scale, rotate]
    );

    useEffect(() => {
        if (croppedThumbnail !== null) {
            setData("thumbnail", croppedThumbnail);
        }
    }, [croppedThumbnail]);

    return (
        <UMKMAdminLayout auth={auth} cta={null} x >
            <div className="w-full overflow-auto">
                <DataTable data={listProductsUMKM} />
            </div>

            {/* Floating Action Button: Tambah Produk */}
            <button
                type="button"
                onClick={() => setShowModal(true)}
                aria-label="Tambah Produk"
                className="fixed right-4 bottom-[7.5rem] z-[45] flex items-center gap-2 rounded-full px-4 py-3 text-white shadow-lg active:scale-95 transition bg-gradient-to-r from-blue-600 to-indigo-600"
            >
                <BsPlusLg size={18} />
                <span className="text-sm font-semibold">Produk</span>
            </button>

            <Modal
                maxWidth="lg"
                show={showModal}
                onClose={() => setShowModal(false)}
            >
                {/* Wrapper: Mobile-first sheet layout */}
                <div className="max-h-[80vh] flex flex-col">
                    {/* Drag handle + Header sticky */}
                    <div className="sticky top-0 bg-white z-10">
                        <div className="mx-auto h-1.5 w-10 rounded-full bg-gray-300 mt-2" />
                        <div className="flex items-center justify-between px-4 py-3 border-b">
                            <h1 className="font-semibold text-base flex items-center gap-x-2">
                                <BsPlusLg size={18} />
                                <span>Tambah Produk</span>
                            </h1>
                            <button
                                type="button"
                                onClick={() => setShowModal(false)}
                                aria-label="Tutup"
                                className="p-2 -mr-2"
                            >
                                <MdClose size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Body scrollable */}
                    <form id="productForm" onSubmit={handleStore} className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
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
                                            {thumbnail ? "Ganti" : "Upload"} Gambar (Thumbnail)
                                        </span>
                                    </div>
                                </div>
                                <input type="file" hidden onChange={handleImageUpload} />
                            </label>
                            <InputError message={errors["thumbnail"]} />

                            {thumbnail && (
                                <div className="p-3 border rounded-md mt-3">
                                    {croppedThumbnail === null && (
                                        <>
                                            <div className="max-h-[40vh] overflow-auto">
                                                <ReactCrop
                                                    crop={crop}
                                                    onChange={(_, percentCrop) => setCrop(percentCrop)}
                                                    onComplete={(c) => setCompletedCrop(c)}
                                                    aspect={aspect}
                                                >
                                                    <img
                                                        ref={imgRef}
                                                        alt="Crop me"
                                                        src={thumbnail}
                                                        style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
                                                        onLoad={onImageLoad}
                                                    />
                                                </ReactCrop>
                                            </div>
                                            <div className="mt-3 flex justify-end">
                                                <Button type={"button"} text={"Crop"} onClick={saveCropedImage} />
                                            </div>
                                        </>
                                    )}

                                    <canvas
                                        ref={previewCanvasRef}
                                        className="mt-3 w-full h-auto"
                                        style={{ objectFit: "contain", width: completedCrop?.width, height: completedCrop?.height }}
                                    />
                                </div>
                            )}
                        </div>

                        <div>
                            <label>
                                <div className="rounded-md border border-dashed border-gray-300 h-[4rem] w-full flex justify-center items-center cursor-pointer hover:bg-gray-50 duration-300">
                                    <div className="flex items-center gap-x-3 text-gray-500">
                                        {images.length > 0 ? <TbArrowsExchange2 /> : <BsPlusLg />}
                                        <span>
                                            {images.length > 0 ? "Ganti" : "Upload"} Gambar Lainnya
                                        </span>
                                    </div>
                                </div>
                                <input type="file" hidden onChange={handleMultipleImageUpload} multiple />
                            </label>
                            <InputError message={errors["images"]} />

                            {images.length > 0 &&
                                images.map((image, i) => (
                                    <div key={i} className="p-3 border rounded-md mt-3">
                                        <div className="h-[5rem] flex gap-x-5">
                                            <div>
                                                <img src={image} alt="Preview" className="h-full" />
                                            </div>
                                            <p className="text-gray-500">{imagesName[i]}</p>
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
                                onChange={(e) => setData("deskripsi", e.target.value)}
                            />
                            <InputError message={errors["deskripsi"]} />
                        </div>

                        <div className="space-y-3">
                            <TextInput
                                type="text"
                                label="Harga Produk"
                                placeholder="Harga Produk"
                                value={data.harga_fix}
                                onChange={(e) => {
                                    const value = e.target.value.replace(/\D/g, "");
                                    const formatted = value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                                    setData("harga_fix", formatted);
                                }}
                            />
                            <InputError message={errors["harga_fix"]} />
                        </div>

                        {/* Spacer to avoid last field hidden by sticky footer */}
                        <div className="h-2" />
                    </form>

                    {/* Sticky footer actions */}
                    <div className="sticky bottom-0 bg-white z-10 p-3 border-t">
                        {processing ? (
                            <Loading />
                        ) : (
                            <button
                                type="submit"
                                form="productForm"
                                className="w-full inline-flex items-center justify-center gap-2 rounded-md px-4 py-3 text-white shadow-md active:scale-95 transition bg-blue-600"
                            >
                                <FaSave />
                                <span className="font-semibold">Simpan</span>
                            </button>
                        )}
                    </div>
                </div>
            </Modal>
        </UMKMAdminLayout>
    );
}