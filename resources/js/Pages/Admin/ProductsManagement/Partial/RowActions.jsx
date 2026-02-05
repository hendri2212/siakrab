import { useEffect, useRef, useState } from "react";
import { useForm } from "@inertiajs/react";
import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { useDebounceEffect } from "@/Hooks/useDebounceEffect";
import { canvasPreview } from "@/Utils/canvasPreview";

import { Button } from "@/Components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

import MyButton from "@/Components/Button";
import Modal from "@/Components/Modal";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import Loading from "@/Components/Loading";
import Checkbox from "@/Components/Checkbox";
import TextArea from "@/Components/TextArea";
import { BsPlusLg } from "react-icons/bs";
import { TbArrowsExchange2 } from "react-icons/tb";
import { FaEdit, FaSave, FaTrash } from "react-icons/fa";
import { toast } from "react-hot-toast";
import InputError from "@/Components/InputError";
import { IoIosWarning } from "react-icons/io";
import { BiBlock } from "react-icons/bi";

import { listKategori } from "@/Constants";

export default function RowActions({ row, inline = false }) {
    const product = row.original;

    const [showModal, setShowModal] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        kategori: "",
        thumbnail: null,
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
    const [action, setAction] = useState("");
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

    function handleEdit() {
        setAction("update");
        setShowModal(true);
        setSelectedKategori(product.kategori);
        setData({
            kategori: product.kategori,
            nama: product.nama,
            deskripsi: product.deskripsi,
            harga_start: product.harga_start,
            harga_end: product.harga_end,
            harga_fix: product.harga_fix,
        });

        if (product.harga_fix !== null) {
            setHargaType("fix");
        }

        if (product.harga_start !== null || product.harga_end !== null) {
            setHargaType("range");
        }
    }

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

    function handleUpdate(e) {
        e.preventDefault();

        post(route("product.update", product.id), {
            onSuccess: () => {
                toast.success("Berhasil memperbarui data produk.");
                setShowModal(false);
                setSelectedKategori("Pilih Kategori");
                setThumbnail(null);
                setImageName("");
                setHargaType("");
            },
            onError: (error) => {
                toast.error("Gagal memperbarui data produk.");
                console.log(error);
                console.log(errors);
            },
        });
    }

    function handleDelete() {
        setAction("delete");
        setShowModal(true);
    }

    function handleConfirmDelete() {
        post(route("product.delete", product.id), {
            onSuccess: () => {
                toast.success("Berhasil menghapus data produk.");
                setShowModal(false);
            },
            onError: (error) => {
                toast.error("Gagal menghapus data produk.");
                console.log(error);
                console.log(errors);
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
        <>
            {inline ? (
                <div className="flex flex-col gap-2 w-full">
                    <MyButton
                        type={"button"}
                        variant={"primary"}
                        text={"Edit"}
                        className="py-1.5 px-3 text-xs w-full"
                        onClick={handleEdit}
                    />
                    <MyButton
                        type={"button"}
                        text={"Delete"}
                        className="py-1.5 px-3 text-xs border-red-500 text-red-600 hover:bg-red-50 w-full"
                        onClick={handleDelete}
                    />
                </div>
            ) : (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        {/* <DropdownMenuItem>Lihat Detail</DropdownMenuItem> */}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleEdit}>
                            Edit Data
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleDelete}>
                            Delete Data
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )}

            <Modal
                maxWidth="lg"
                show={showModal}
                onClose={() => setShowModal(false)}
            >
                {action === "update" && (
                    <>
                        <h1 className="font-semibold text-xl mb-10 flex items-center gap-x-3">
                            <FaEdit size={25} />
                            <span>Edit Produk</span>
                        </h1>
                        <form
                            onSubmit={handleUpdate}
                            className="flex flex-col gap-y-5"
                        >
                            <div>
                                <SelectInput>
                                    <SelectInput.Trigger
                                        label={"Kategori Produk"}
                                        selected={
                                            selectedKategori !==
                                            "Pilih Kategori"
                                        }
                                    >
                                        <div
                                            className={
                                                selectedKategori ===
                                                    "Pilih Kategori"
                                                    ? "text-gray-500"
                                                    : ""
                                            }
                                        >
                                            {selectedKategori}
                                        </div>
                                    </SelectInput.Trigger>
                                    <SelectInput.Content
                                        positionClass={"top-12"}
                                    >
                                        <div className="max-h-[12rem] overflow-auto">
                                            <ul>
                                                {listKategori.map(
                                                    (kategori, i) => (
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
                                                    )
                                                )}
                                            </ul>
                                        </div>
                                    </SelectInput.Content>
                                </SelectInput>
                                <InputError message={errors["kategori"]} />
                            </div>
                            <div>
                                <label>
                                    <div className="rounded-md border border-dashed h-[4rem] w-full flex justify-center items-center cursor-pointer hover:bg-gray-50 duration-300">
                                        <div className="flex items-center gap-x-3 text-gray-500">
                                            {thumbnail || product.thumbnail ? (
                                                <TbArrowsExchange2 />
                                            ) : (
                                                <BsPlusLg />
                                            )}
                                            <span>
                                                {thumbnail || product.thumbnail
                                                    ? "Ganti"
                                                    : "Upload"}{" "}
                                                Gambar (Thumnbail)
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
                                {thumbnail ? (
                                    <div className="p-3 border rounded-md mt-3">
                                        {croppedThumbnail === null && (
                                            <>
                                                <ReactCrop
                                                    crop={crop}
                                                    onChange={(
                                                        _,
                                                        percentCrop
                                                    ) => setCrop(percentCrop)}
                                                    onComplete={(c) =>
                                                        setCompletedCrop(c)
                                                    }
                                                    aspect={aspect}
                                                // minWidth={400}
                                                // minHeight={200}
                                                >
                                                    <img
                                                        ref={imgRef}
                                                        alt="Crop me"
                                                        src={thumbnail}
                                                        style={{
                                                            transform: `scale(${scale}) rotate(${rotate}deg)`,
                                                        }}
                                                        onLoad={onImageLoad}
                                                    />
                                                </ReactCrop>

                                                <div className="mt-3 flex justify-end">
                                                    <MyButton
                                                        type={"button"}
                                                        text={"Crop"}
                                                        onClick={
                                                            saveCropedImage
                                                        }
                                                    />
                                                </div>
                                            </>
                                        )}

                                        <canvas
                                            ref={previewCanvasRef}
                                            style={{
                                                objectFit: "contain",
                                                width: completedCrop?.width,
                                                height: completedCrop?.height,
                                            }}
                                        />
                                    </div>
                                ) : (
                                    product.thumbnail && (
                                        <div className="p-3 border rounded-md mt-3">
                                            <div className="h-[5rem] flex gap-x-5">
                                                <div>
                                                    <img
                                                        src={`/images/uploads/products/${product.thumbnail}`}
                                                        alt="Preview"
                                                        className="h-full"
                                                    />
                                                </div>
                                                <p className="text-gray-500">
                                                    {product.thumbnail}
                                                </p>
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                            <div>
                                <label>
                                    <div className="rounded-md border border-dashed border-gray-300 h-[4rem] w-full flex justify-center items-center cursor-pointer hover:bg-gray-50 duration-300">
                                        <div className="flex items-center gap-x-3 text-gray-500">
                                            {images.length > 0 ||
                                                (product.images !== null &&
                                                    JSON.parse(product.images)
                                                        .length > 0) ? (
                                                <TbArrowsExchange2 />
                                            ) : (
                                                <BsPlusLg />
                                            )}
                                            <span>
                                                {images.length > 0 ||
                                                    (product.images !== null &&
                                                        JSON.parse(product.images)
                                                            .length > 0)
                                                    ? "Ganti"
                                                    : "Upload"}{" "}
                                                Gambar Lainnya (Multiple)
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

                                {images.length > 0
                                    ? images.map((image, i) => (
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
                                    ))
                                    : product.images !== null &&
                                    JSON.parse(product.images).map(
                                        (image, i) => (
                                            <div
                                                key={i}
                                                className="p-3 border rounded-md mt-3"
                                            >
                                                <div className="h-[5rem] flex gap-x-5">
                                                    <div>
                                                        <img
                                                            src={`/images/uploads/products/${image}`}
                                                            alt="Preview"
                                                            className="h-full"
                                                        />
                                                    </div>
                                                    <p className="text-gray-500">
                                                        {image}
                                                    </p>
                                                </div>
                                            </div>
                                        )
                                    )}
                            </div>
                            <div>
                                <TextInput
                                    label="Nama Produk"
                                    placeholder="Nama Produk"
                                    value={data.nama}
                                    onChange={(e) =>
                                        setData("nama", e.target.value)
                                    }
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
                                    <label htmlFor="hargaRange">
                                        Harga Range
                                    </label>
                                </div>
                                <div className="flex items-center gap-x-3">
                                    <Checkbox
                                        id="hargaFix"
                                        checked={hargaType === "fix"}
                                        onChange={() => setHargaType("fix")}
                                    />
                                    <label htmlFor="hargaFix">
                                        Harga Tetap
                                    </label>
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
                                                setData(
                                                    "harga_start",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors["harga_start"]}
                                        />

                                        <TextInput
                                            type="number"
                                            label="Hingga Harga"
                                            placeholder="Hingga Harga"
                                            value={data.harga_end}
                                            onChange={(e) =>
                                                setData(
                                                    "harga_end",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors["harga_end"]}
                                        />
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
                                                setData(
                                                    "harga_fix",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors["harga_fix"]}
                                        />
                                    </>
                                )}
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
                    </>
                )}

                {action === "delete" && (
                    <>
                        <div className="mb-10">
                            <h1 className="font-semibold text-xl flex items-center gap-x-3">
                                <IoIosWarning size={25} />
                                <span>Hapus Akun</span>
                            </h1>
                            <p className="mt-3">
                                Konfirmasi hapus produk{" "}
                                <span className="text-primary">
                                    {product.nama}
                                </span>
                                ?
                            </p>
                        </div>
                        <div className="flex gap-x-3 mt-10">
                            {processing ? (
                                <Loading />
                            ) : (
                                <>
                                    <MyButton
                                        type={"button"}
                                        text={"Batal"}
                                        icon={<BiBlock />}
                                        className="w-full border hover:bg-gray-100"
                                        onClick={() => setShowModal(false)}
                                    />
                                    <MyButton
                                        type={"button"}
                                        variant={"primary"}
                                        text={"Hapus"}
                                        icon={<FaTrash />}
                                        className="w-full"
                                        onClick={handleConfirmDelete}
                                    />
                                </>
                            )}
                        </div>
                    </>
                )}
            </Modal>
        </>
    );
}
