import { useState, useEffect, useRef } from "react";
import { useScreen } from "@/Hooks/useScreen";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { formatRupiah } from "@/Utils/formatRupiah";
import { formatPhone } from "@/Utils/formatPhone";
import { Link, useForm, usePage } from "@inertiajs/react";
import { slug } from "@/Utils/formatSlug";
import "swiper/css";

import Button from "@/Components/Button";
import { IoFilter } from "react-icons/io5";
import { TruncateText } from "@/Utils/truncateText";
import { FaChevronLeft, FaChevronRight, FaSearch } from "react-icons/fa";
import { MdClose, MdVerified } from "react-icons/md";

import { listKategori } from "@/Constants";
import TextInput from "@/Components/TextInput";

export default function Products({ listProdukUMKM, queryKategori }) {
    const swiper = useSwiper();
    const { isMobile, isTablet } = useScreen();
    const [openFilter, setOpenFilter] = useState(false);
    const productsRef = useRef(null);
    const { data, setData, get } = useForm({
        query: "",
    });
    const [selectedKategori, setSelectedKategori] = useState(
        queryKategori || ""
    );
    const { url } = usePage();

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

    useEffect(() => {
        if (productsRef.current && url.startsWith("/?page"))
            productsRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
                inline: "nearest",
            });
    }, [listProdukUMKM.next_page_url, listProdukUMKM.prev_page_url]);

    function filterByKategori(kategori) {
        setSelectedKategori(kategori);
        get(
            route("home", {
                _query: {
                    page: 1,
                    kategori: kategori,
                },
            })
        );
    }

    function handleSearch(e) {
        e.preventDefault();

        get(route("productUMKM.find"));
    }

    const totalItems = listProdukUMKM.data.length;
    const itemsPerSection = Math.ceil(totalItems / 3);

    const section1 = listProdukUMKM.data.slice(0, itemsPerSection);
    const section2 = listProdukUMKM.data.slice(
        itemsPerSection,
        itemsPerSection * 2
    );
    const section3 = listProdukUMKM.data.slice(itemsPerSection * 2);

    return (
        <main
            id="products"
            ref={productsRef}
            className="container mx-auto sm:px-20 px-5 my-10"
        >
            <header className="w-fit mx-auto text-center mb-10">
                <h1 className="font-extrabold text-4xl">
                    Produk Ekonomi Kreatif
                </h1>
                <p className="text-lg mt-1">
                    Jelajahi Produk Ekonomi Kreatif Lokal Kami
                </p>
            </header>
            <section className="relative">
                <div className="sm:mb-7 mb-3 flex gap-x-3 justify-between">
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
                                            onClick={() =>
                                                filterByKategori(kategori)
                                            }
                                        >
                                            {kategori}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {queryKategori && (
                            <div className="sm:flex hidden mb-5 gap-x-3 h-fit">
                                <button className="flex gap-x-3 text-sm py-1 px-3 rounded-md bg-dark text-white">
                                    <span>{queryKategori}</span>
                                    <span onClick={() => filterByKategori("")}>
                                        <MdClose size={20} />
                                    </span>
                                </button>
                            </div>
                        )}
                    </div>
                    <form onSubmit={handleSearch} className="flex gap-x-3">
                        <TextInput
                            label="Search"
                            placeholder="Search..."
                            value={data.query}
                            onChange={(e) => setData("query", e.target.value)}
                        />
                        <Button icon={<FaSearch />} />
                    </form>
                </div>
                {queryKategori && (
                    <div className="sm:hidden flex mb-7 gap-x-3 h-fit">
                        <button className="flex gap-x-3 text-sm py-1 px-3 rounded-md bg-dark text-white">
                            <span>{queryKategori}</span>
                            <span onClick={() => filterByKategori("")}>
                                <MdClose size={20} />
                            </span>
                        </button>
                    </div>
                )}
                {listProdukUMKM.data.length > 0 ? (
                    <>
                        <div className="sm:grid hidden lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3">
                            {listProdukUMKM.data.map((product) => {
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
                                    <div key={product.id}>
                                        <Link
                                            href={route(
                                                "productUMKM.detail",
                                                product.nama
                                            )}
                                        >
                                            <div className="relative rounded-md border h-fit overflow-hidden group">
                                                <img
                                                    src={`/images/uploads/products/${product.thumbnail}`}
                                                    alt="produk"
                                                    className="rounded-t-md h-[10rem] w-full group-hover:scale-110 duration-300"
                                                />
                                                <div className="absolute top-5 left-5 flex gap-x-2">
                                                    <span className="rounded-md py-0.5 px-3 text-sm bg-dark text-white">
                                                        {product.kategori}
                                                    </span>
                                                </div>
                                                <div className="p-3 min-h-[10rem] relative">
                                                    <h2 className="text-gray-500">
                                                        {TruncateText(
                                                            product.nama,
                                                            20
                                                        )}
                                                    </h2>
                                                    <div>
                                                        {product.harga_fix !==
                                                            null &&
                                                        product.harga_fix !==
                                                            "" ? (
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
                                                    <div className="mt-3">
                                                        <span className="rounded-md py-0.5 px-2 text-sm bg-gray-100 text-dark">
                                                            Kec.
                                                            {
                                                                product
                                                                    .pelaku_umkm
                                                                    .kecamatan
                                                            }
                                                        </span>
                                                        <p className="mt-2 text-sm flex items-center gap-x-2">
                                                            <MdVerified
                                                                size={20}
                                                                className="text-primary"
                                                            />
                                                            {
                                                                product
                                                                    .pelaku_umkm
                                                                    .nama_usaha
                                                            }
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="sm:hidden">
                            <Swiper
                                slidesPerView={1.5}
                                spaceBetween={10}
                                className="mb-5"
                            >
                                {section1.map((product) => (
                                    <SwiperSlide key={product.id}>
                                        <Link
                                            href={route(
                                                "productUMKM.detail",
                                                product.nama
                                            )}
                                        >
                                            <div className="relative rounded-md border h-fit overflow-hidden group">
                                                <img
                                                    src={`/images/uploads/products/${product.thumbnail}`}
                                                    alt="produk"
                                                    className="rounded-t-md h-[10rem] w-full group-hover:scale-110 duration-300"
                                                />
                                                <div className="absolute top-5 left-5 flex gap-x-2">
                                                    <span className="rounded-md py-0.5 px-3 text-sm bg-dark text-white">
                                                        {product.kategori}
                                                    </span>
                                                </div>
                                                <div className="p-3 min-h-[10rem] relative">
                                                    <h2 className="text-gray-500">
                                                        {TruncateText(
                                                            product.nama,
                                                            20
                                                        )}
                                                    </h2>
                                                    <div>
                                                        {product.harga_fix !==
                                                            null &&
                                                        product.harga_fix !==
                                                            "" ? (
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
                                                    <div className="mt-3">
                                                        <span className="rounded-md py-0.5 px-2 text-sm bg-gray-100 text-dark">
                                                            Kec.
                                                            {
                                                                product
                                                                    .pelaku_umkm
                                                                    .kecamatan
                                                            }
                                                        </span>
                                                        <p className="mt-2 text-sm flex items-center gap-x-2">
                                                            <MdVerified
                                                                size={20}
                                                                className="text-primary"
                                                            />
                                                            {
                                                                product
                                                                    .pelaku_umkm
                                                                    .nama_usaha
                                                            }
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </SwiperSlide>
                                ))}
                            </Swiper>

                            <Swiper
                                slidesPerView={1.5}
                                spaceBetween={10}
                                className="mb-5"
                            >
                                {section2.map((product) => (
                                    <SwiperSlide key={product.id}>
                                        <Link
                                            href={route(
                                                "productUMKM.detail",
                                                product.nama
                                            )}
                                        >
                                            <div className="relative rounded-md border h-fit overflow-hidden group">
                                                <img
                                                    src={`/images/uploads/products/${product.thumbnail}`}
                                                    alt="produk"
                                                    className="rounded-t-md h-[10rem] w-full group-hover:scale-110 duration-300"
                                                />
                                                <div className="absolute top-5 left-5 flex gap-x-2">
                                                    <span className="rounded-md py-0.5 px-3 text-sm bg-dark text-white">
                                                        {product.kategori}
                                                    </span>
                                                </div>
                                                <div className="p-3 min-h-[10rem] relative">
                                                    <h2 className="text-gray-500">
                                                        {TruncateText(
                                                            product.nama,
                                                            20
                                                        )}
                                                    </h2>
                                                    <div>
                                                        {product.harga_fix !==
                                                            null &&
                                                        product.harga_fix !==
                                                            "" ? (
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
                                                    <div className="mt-3">
                                                        <span className="rounded-md py-0.5 px-2 text-sm bg-gray-100 text-dark">
                                                            Kec.
                                                            {
                                                                product
                                                                    .pelaku_umkm
                                                                    .kecamatan
                                                            }
                                                        </span>
                                                        <p className="mt-2 text-sm flex items-center gap-x-2">
                                                            <MdVerified
                                                                size={20}
                                                                className="text-primary"
                                                            />
                                                            {
                                                                product
                                                                    .pelaku_umkm
                                                                    .nama_usaha
                                                            }
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </SwiperSlide>
                                ))}
                            </Swiper>

                            <Swiper
                                slidesPerView={1.5}
                                spaceBetween={10}
                                className="mb-5"
                            >
                                {section3.map((product) => (
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
                                                    className="rounded-t-md h-[10rem] w-full group-hover:scale-110 duration-300"
                                                />
                                                <div className="absolute top-5 left-5 flex gap-x-2">
                                                    <span className="rounded-md py-0.5 px-3 text-sm bg-dark text-white">
                                                        {product.kategori}
                                                    </span>
                                                </div>
                                                <div className="p-3 min-h-[10rem] relative">
                                                    <h2 className="text-gray-500">
                                                        {TruncateText(
                                                            product.nama,
                                                            20
                                                        )}
                                                    </h2>
                                                    <div>
                                                        {product.harga_fix !==
                                                            null &&
                                                        product.harga_fix !==
                                                            "" ? (
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
                                                    <div className="mt-3">
                                                        <span className="rounded-md py-0.5 px-2 text-sm bg-gray-100 text-dark">
                                                            Kec.
                                                            {
                                                                product
                                                                    .pelaku_umkm
                                                                    .kecamatan
                                                            }
                                                        </span>
                                                        <p className="mt-2 text-sm flex items-center gap-x-2">
                                                            <MdVerified
                                                                size={20}
                                                                className="text-primary"
                                                            />
                                                            {
                                                                product
                                                                    .pelaku_umkm
                                                                    .nama_usaha
                                                            }
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>

                        <div className="mt-5 w-fit mx-auto flex items-center gap-x-3">
                            {listProdukUMKM.links.map((link, i) => {
                                if (i === 0)
                                    return (
                                        <Link
                                            key={i}
                                            href={
                                                listProdukUMKM.prev_page_url +
                                                `&kategori=${queryKategori}`
                                            }
                                            className="hover:-translate-x-2 duration-300"
                                        >
                                            <span
                                                key={i}
                                                className={`cursor-pointer ${
                                                    listProdukUMKM.current_page ===
                                                    1
                                                        ? "hidden"
                                                        : ""
                                                }`}
                                            >
                                                <FaChevronLeft />
                                            </span>
                                        </Link>
                                    );
                                if (i === listProdukUMKM.links.length - 1)
                                    return (
                                        <Link
                                            key={i}
                                            href={
                                                listProdukUMKM.next_page_url +
                                                `&kategori=${queryKategori}`
                                            }
                                            className={`hover:translate-x-2 duration-300 ${
                                                listProdukUMKM.last_page ===
                                                listProdukUMKM.current_page
                                                    ? "hidden"
                                                    : ""
                                            }`}
                                        >
                                            <span className="cursor-pointer">
                                                <FaChevronRight />
                                            </span>
                                        </Link>
                                    );
                                else
                                    return (
                                        <Link
                                            key={i}
                                            href={
                                                link.url +
                                                `&kategori=${queryKategori}`
                                            }
                                            className={`${
                                                listProdukUMKM.current_page !=
                                                link.label
                                                    ? "hover:scale-110 duration-300"
                                                    : "pointer-events-none"
                                            } `}
                                        >
                                            <span
                                                key={i}
                                                className={`cursor-pointer ${
                                                    listProdukUMKM.current_page ==
                                                    link.label
                                                        ? "text-primary"
                                                        : ""
                                                }`}
                                            >
                                                {link.label}
                                            </span>
                                        </Link>
                                    );
                            })}
                        </div>
                    </>
                ) : (
                    <div className="mt-5">
                        <h1 className="text-2xl font-bold">
                            Produk
                            {queryKategori !== "" && (
                                <>
                                    <span>sektor</span>{" "}
                                    <span className="text-primary">
                                        {queryKategori}
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
