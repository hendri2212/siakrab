import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import { formatPhone } from "@/Utils/formatPhone";

// no new external imports

import Button from "@/Components/Button";
import Navbar from "@/Components/Navbar";
import { formatRupiah } from "@/Utils/formatRupiah";
import { Head, Link } from "@inertiajs/react";
import { IoLogoWhatsapp, IoShareSocial } from "react-icons/io5";
import { AiOutlineEye, AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { MdLocationOn, MdVerified } from "react-icons/md";
import { BsArrowLeft, BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { useState } from "react";
import axios from "axios";

export default function ProductDetail({ auth, productDetail, is_liked, is_saved }) {
    const images = productDetail && JSON.parse(productDetail.images);
    const [hoveredImage, setHoveredImage] = useState(null);
    const [isLiked, setIsLiked] = useState(!!is_liked);
    const [isSaved, setIsSaved] = useState(!!is_saved);
    const [likesCount, setLikesCount] = useState(productDetail?.likes_count ?? 0);
    const [savesCount, setSavesCount] = useState(productDetail?.saves_count ?? 0);

    const currentUrl = typeof window !== "undefined" ? window.location.href : "";
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const shareImageUrl = `${origin}/images/uploads/products/${productDetail?.thumbnail}`;
    const priceText =
        productDetail?.harga_fix !== "" && productDetail?.harga_fix !== null
            ? formatRupiah(productDetail?.harga_fix)
            : `${formatRupiah(productDetail?.harga_start)} - ${formatRupiah(productDetail?.harga_end)}`;
    const shareMessage = `*${productDetail?.nama}*
Harga: ${priceText}

${productDetail?.deskripsi ? productDetail?.deskripsi.slice(0, 160) : ""}

Lihat detail: ${currentUrl}
Hubungi penjual: https://wa.me/${formatPhone(productDetail?.pelaku_umkm.telepon)}`;
    const shareTextOnlyUrl = `https://wa.me/?text=${encodeURIComponent(shareMessage)}`;

    const csrfToken = typeof document !== "undefined"
        ? document.querySelector('meta[name="csrf-token"]')?.getAttribute("content")
        : null;

    async function handleToggleLike() {
        if (!auth?.user) {
            window.location.href = "/login";
            return;
        }

        try {
            const res = await axios.post(route("umkm.products.like", productDetail?.id));
            const data = res.data;
            setIsLiked(!!data.is_liked);
            if (typeof data.likes_count !== "undefined") {
                setLikesCount(data.likes_count);
            } else {
                setLikesCount((prev) => (data.is_liked ? prev + 1 : Math.max(prev - 1, 0)));
            }
        } catch (e) {
            console.error(e);
        }
    }

    async function handleToggleSave() {
        if (!auth?.user) {
            window.location.href = "/login";
            return;
        }

        try {
            const res = await axios.post(route("umkm.products.save", productDetail?.id));
            const data = res.data;
            setIsSaved(!!data.is_saved);
            if (typeof data.saves_count !== "undefined") {
                setSavesCount(data.saves_count);
            } else {
                setSavesCount((prev) => (data.is_saved ? prev + 1 : Math.max(prev - 1, 0)));
            }
        } catch (e) {
            console.error(e);
        }
    }

    async function shareToWhatsAppWithImage() {
        try {
            // Prefer the Web Share API (Level 2 with file support) when available (mostly Android/iOS)
            const res = await fetch(shareImageUrl, { mode: "cors" });
            const blob = await res.blob();
            const fileName = productDetail?.thumbnail || "image.jpg";
            const file = new File([blob], fileName, { type: blob.type || "image/jpeg" });

            const shareData = {
                title: productDetail?.nama || "Produk Siakrab",
                text: shareMessage,
                files: [file],
                // Including URL helps WhatsApp/SMS add a link preview as well
                url: currentUrl
            };

            if (navigator.canShare && navigator.canShare({ files: [file] })) {
                await navigator.share(shareData);
            } else if (navigator.share) {
                // Share without file if file-sharing isn't supported
                await navigator.share({
                    title: shareData.title,
                    text: shareData.text,
                    url: shareData.url
                });
            } else {
                // Fallback to WhatsApp text share URL
                window.open(shareTextOnlyUrl, "_blank", "noopener,noreferrer");
            }
        } catch (e) {
            // Last-resort fallback to text-only share via WhatsApp
            window.open(shareTextOnlyUrl, "_blank", "noopener,noreferrer");
        }
    }

    // Keperluan fallback untuk perangkat tanpa Web Share API
    const whatsappShareUrl = shareTextOnlyUrl;

    return (
        <>
            <Head title={productDetail?.nama}>
                <meta property="og:title" content={productDetail?.nama} />
                <meta
                    property="og:description"
                    content={productDetail?.deskripsi ? productDetail?.deskripsi.slice(0, 160) : "Lihat detail produk di Siakrab."}
                />
                <meta property="og:image" content={shareImageUrl} />
                <meta property="og:url" content={currentUrl} />
                <meta property="og:type" content="product" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={productDetail?.nama} />
                <meta
                    name="twitter:description"
                    content={productDetail?.deskripsi ? productDetail?.deskripsi.slice(0, 160) : "Lihat detail produk di Siakrab."}
                />
                <meta name="twitter:image" content={shareImageUrl} />
            </Head>
            <Navbar auth={auth} />
            <main className="mx-auto px-3 mb-10">
                <section className="flex flex-col gap-3">
                    <div className="w-full h-fit">
                        {hoveredImage ? (
                            <img
                                src={`/images/uploads/products/${hoveredImage}`}
                                alt={hoveredImage}
                                className="w-full h-[260px] rounded-xl object-cover"
                            />
                        ) : (
                            <img
                                src={`/images/uploads/products/${productDetail?.thumbnail}`}
                                alt={productDetail?.nama}
                                className="w-full h-[260px] rounded-xl object-cover"
                            />
                        )}

                        <div className="mt-3 w-full">
                            <Swiper
                                slidesPerView={3}
                                direction="horizontal"
                                spaceBetween={10}
                            >
                                {images &&
                                    images.length > 0 &&
                                    images.map((image, i) => (
                                        <SwiperSlide key={i}>
                                            <div>
                                                <img
                                                    src={`/images/uploads/products/${image}`}
                                                    alt={image}
                                                    className="w-full h-16 rounded-lg object-cover cursor-pointer border-2 border-transparent hover:border-primary"
                                                    onMouseEnter={() =>
                                                        setHoveredImage(image)
                                                    }
                                                    onMouseLeave={() =>
                                                        setHoveredImage(null)
                                                    }
                                                    onClick={() => setHoveredImage(image)}
                                                />
                                            </div>
                                        </SwiperSlide>
                                    ))}
                            </Swiper>
                        </div>
                    </div>
                    <div className="w-full h-fit bg-white p-3 rounded-xl">
                        <div className="font-semibold">
                            <span className="text-xl leading-snug">
                                {productDetail?.nama}
                            </span>
                        </div>
                        <div className="font-semibold">
                            {productDetail?.harga_fix !== "" &&
                                productDetail?.harga_fix !== null ? (
                                <span>
                                    {formatRupiah(productDetail?.harga_fix)}
                                </span>
                            ) : (
                                <span>
                                    {formatRupiah(productDetail?.harga_start)}-
                                    {formatRupiah(productDetail?.harga_end)}
                                </span>
                            )}
                        </div>
                        <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                            <div className="flex items-center gap-1">
                                <AiOutlineEye size={14} />
                                <span>Dilihat {productDetail?.view_count ?? 0}x</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={handleToggleLike}
                                    className="flex items-center gap-1 text-red-500"
                                >
                                    {isLiked ? <AiFillHeart size={16} /> : <AiOutlineHeart size={16} />}
                                    <span>{likesCount}</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={handleToggleSave}
                                    className="flex items-center gap-1 text-blue-500"
                                >
                                    {isSaved ? <BsBookmarkFill size={15} /> : <BsBookmark size={15} />}
                                    <span>{savesCount}</span>
                                </button>
                            </div>
                        </div>

                        <div className="mt-5 flex items-center gap-3">
                            <a
                                className="flex-1"
                                href={`https://wa.me/${formatPhone(
                                    productDetail?.pelaku_umkm.telepon
                                )}?text=Halo saya tertarik dengan produk ${productDetail?.nama}.`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button
                                    className="w-full justify-center rounded-xl"
                                    text={"Whatsapp"}
                                    icon={<IoLogoWhatsapp size={20} />}
                                />
                            </a>
                            <button
                                type="button"
                                className="flex-1"
                                onClick={shareToWhatsAppWithImage}
                            >
                                <Button
                                    className="w-full justify-center rounded-xl"
                                    text={"Story WA"}
                                    icon={<IoShareSocial size={20} />}
                                />
                            </button>
                        </div>
                        <div className="mt-3 text-sm leading-relaxed">
                            {productDetail?.deskripsi}
                        </div>

                        <div className="mt-6 flex items-center gap-2 text-base">
                            <MdVerified className="text-primary" />
                            {productDetail?.pelaku_umkm.nama_usaha}
                        </div>
                        <div className="text-sm text-label">
                            <div className="flex items-center gap-2 mb-2">
                                <MdLocationOn size={18} />
                                <p>{productDetail?.pelaku_umkm.alamat_usaha}</p>
                            </div>
                            {/* <span className="py-1 px-2 text-xs bg-gray-100 rounded-md text-black">
                                Kec.{productDetail?.pelaku_umkm.kecamatan}
                            </span> */}
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}