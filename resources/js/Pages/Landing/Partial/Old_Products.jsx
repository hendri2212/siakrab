import { useState, useEffect } from "react";
import { useScreen } from "@/Hooks/useScreen";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { formatRupiah } from "@/Utils/formatRupiah";
import { formatPhone } from "@/Utils/formatPhone";
import { Navigation } from "swiper/modules";
import { Link, router } from "@inertiajs/react";
import { slug } from "@/Utils/formatSlug";
import "swiper/css";

import Button from "@/Components/Button";
import { IoFilter, IoLogoWhatsapp } from "react-icons/io5";
import { AiOutlineEye } from "react-icons/ai";
import { TruncateText } from "@/Utils/truncateText";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { MdClose } from "react-icons/md";

import { listKategori } from "@/Constants";

export default function Products({ listProdukUMKM }) {
    const swiper = useSwiper();
    const { isMobile, isTablet } = useScreen();
    const [openFilter, setOpenFilter] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState("Semua");

    useEffect(() => {
        if (swiper) {
            const nextButton = document.getElementById("swiper-button-next2");
            const prevButton = document.getElementById("swiper-button-prev2");

            nextButton.addEventListener("click", function () {
                console.log("next");
                swiper.slideNext();
            });

            prevButton.addEventListener("click", function () {
                swiper.slidePrev();
            });
        }
    }, [swiper]);

    const filteredListProdukUMKM =
        selectedFilter !== "Semua"
            ? listProdukUMKM.filter((produk) => {
                  return produk.kategori === selectedFilter;
              })
            : listProdukUMKM;

    return (
        <main id="products" className="container mx-auto sm:px-20 px-5 my-10">
            <header className="w-fit mx-auto text-center mb-10">
                <h1 className="font-extrabold text-4xl">Produk UMKM</h1>
                <p className="text-lg mt-1">
                    Jelajahi Produk Kreatif dari UMKM Lokal Kami
                </p>
            </header>
            <section className="relative">
                <div className="mb-7">
                    <div className="flex gap-x-3 h-fit">
                        <div className="relative z-20">
                            <Button
                                text={"Filter"}
                                icon={<IoFilter />}
                                onClick={() => setOpenFilter((open) => !open)}
                            />
                            <div
                                className={`w-[17rem] max-h-[20rem] overflow-auto absolute top-12 bg-white rounded-md border border-primary p-5 duration-300 ${
                                    openFilter
                                        ? "opacity-100"
                                        : "opacity-0 -translate-y-5 pointer-events-none"
                                }`}
                            >
                                <div
                                    className="fixed inset-0"
                                    onClick={() => setOpenFilter(false)}
                                />
                                <ul className="flex flex-col relative">
                                    {listKategori.map((kategori, i) => (
                                        <li
                                            key={i}
                                            className="py-2 rounded-md cursor-pointer hover:px-3 hover:bg-gray-100 duration-300"
                                            onClick={() => {
                                                setSelectedFilter(kategori);
                                                setOpenFilter(false);
                                            }}
                                        >
                                            {kategori}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div
                            className={`py-2 px-4 rounded-md border flex justify-center items-center ${
                                selectedFilter !== "Semua"
                                    ? " border-dark bg-dark text-white"
                                    : "hidden"
                            }`}
                        >
                            {selectedFilter}
                            {selectedFilter !== "Semua" && (
                                <div className="ml-3">
                                    <MdClose
                                        size={20}
                                        className="text-red-500 cursor-pointer hover:scale-125 duration-300"
                                        onClick={() =>
                                            setSelectedFilter("Semua")
                                        }
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                    {/* {filteredListProdukUMKM.length > 0 && (
                        <div
                            className={`flex gap-x-5 ${
                                isMobile && filteredListProdukUMKM.length > 0
                                    ? "visible"
                                    : filteredListProdukUMKM.length > 4
                                    ? "visible"
                                    : "hidden"
                            }`}
                        >
                            <button
                                className={`swiper-button-prev2 z-10 absolute -left-7 top-1/2 -translate-y-1/2 h-fit border border-primary text-primary rounded-full p-4 hover:bg-dark duration-300`}
                            >
                                <FaChevronLeft />
                            </button>
                            <button
                                className={`swiper-button-next2 z-10 absolute -right-7 top-1/2 -translate-y-1/2 h-fit border border-primary text-primary rounded-full p-4  hover:bg-dark duration-300`}
                            >
                                <FaChevronRight />
                            </button>
                        </div>
                    )} */}
                </div>
                {filteredListProdukUMKM.length > 0 ? (
                    <Swiper
                        slidesPerView={isMobile ? 1.5 : isTablet ? 2.5 : 3.5}
                        spaceBetween={20}
                        modules={[Navigation]}
                        navigation={{
                            prevEl: ".swiper-button-prev2",
                            nextEl: ".swiper-button-next2",
                        }}
                        onSwiper={(s) => {
                            s.navigation.update();
                        }}
                        loop={isMobile}
                    >
                        {filteredListProdukUMKM.map((product) => {
                            function redirectToWhatsApp() {
                                const phoneNumber = formatPhone(
                                    product.pelaku_umkm.telepon
                                );
                                const message = `Halo saya tertarik dengan produk ${product.nama}`;
                                const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
                                    message
                                )}`;

                                window.open(whatsappUrl, "_blank");
                            }

                            return (
                                <SwiperSlide key={product.id}>
                                    <Link
                                        href={route(
                                            "productUMKM.detail",
                                            slug(product.nama)
                                        )}
                                    >
                                        <div className="relative rounded-md border h-fit overflow-hidden group">
                                            <img
                                                src={`/images/uploads/products/${product.thumbnail}`}
                                                alt="produk"
                                                className="rounded-t-md h-[12rem] w-full group-hover:scale-110 duration-300"
                                            />
                                            <div className="absolute top-5 left-5 flex gap-x-2">
                                                <span className="rounded-md py-0.5 px-3 text-sm bg-dark text-white">
                                                    {product.kategori}
                                                </span>
                                            </div>
                                            <div className="p-5 min-h-[11rem] relative">
                                                <h2 className="text-gray-500">
                                                    {TruncateText(
                                                        product.nama,
                                                        20
                                                    )}
                                                </h2>
                                                <div>
                                                    {product.harga_fix !==
                                                        null &&
                                                    product.harga_fix !== "" ? (
                                                        <h1 className="font-bold text-lg">
                                                            {formatRupiah(
                                                                product.harga_fix
                                                            )}
                                                        </h1>
                                                    ) : (
                                                        <>
                                                            <span className="font-bold text-lg">
                                                                {formatRupiah(
                                                                    product.harga_start
                                                                )}
                                                            </span>
                                                            <span> - </span>
                                                            <span className="font-bold text-lg">
                                                                {formatRupiah(
                                                                    product.harga_end
                                                                )}
                                                            </span>
                                                        </>
                                                    )}
                                                </div>
                                                <div className="absolute bottom-5 w-fit ml-auto flex gap-x-3">
                                                    <Button
                                                        icon={
                                                            <AiOutlineEye
                                                                size={20}
                                                            />
                                                        }
                                                        onClick={() =>
                                                            router.visit(
                                                                `/product/${slug(
                                                                    product.nama
                                                                )}`
                                                            )
                                                        }
                                                    />

                                                    <Button
                                                        text="Whatsapp"
                                                        icon={
                                                            <IoLogoWhatsapp
                                                                size={20}
                                                            />
                                                        }
                                                        onClick={
                                                            redirectToWhatsApp
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                ) : (
                    <div className="mt-5">
                        <h1 className="text-2xl font-bold">
                            Produk
                            {selectedFilter !== "Semua" && (
                                <>
                                    <span>sektor</span>{" "}
                                    <span className="text-primary">
                                        {selectedFilter}
                                    </span>
                                </>
                            )}{" "}
                            tidak ditemukan
                        </h1>
                        <p>Saat ini produk yang ada cari belum tersedia.</p>
                    </div>
                )}
            </section>
        </main>
    );
}
