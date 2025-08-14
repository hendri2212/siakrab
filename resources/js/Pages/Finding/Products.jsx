import { useEffect, useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import { slug } from "@/Utils/formatSlug";
import { TruncateText } from "@/Utils/truncateText";
import { formatRupiah } from "@/Utils/formatRupiah";
import { useScreen } from "@/Hooks/useScreen";

import UserLayout from "@/Layouts/UserLayout";
import { MdClose, MdVerified } from "react-icons/md";
import { BsChevronDown } from "react-icons/bs";
import TextInput from "@/Components/TextInput";

import Button from "@/Components/Button";
import Checkbox from "@/Components/Checkbox";
import { FaChevronLeft, FaChevronRight, FaSearch } from "react-icons/fa";

import { listKategori } from "@/Constants";

export default function Products({
    auth,
    query,
    results,
    minPrice,
    maxPrice,
    queryKategori,
}) {
    const { isMobile } = useScreen();
    const [showKategori, setShowKategori] = useState(true);
    const [selectedKategori, setSelectedKategori] = useState(queryKategori);
    const { data, setData, get } = useForm({
        query: query || "",
    });

    function filterByKategori(kategori) {
        const cleanedKategori = cleanseKategori(kategori);
        console.log(cleanedKategori);

        const updatedKategori = queryKategori.includes(cleanedKategori)
            ? selectedKategori.filter((item) => item !== cleanedKategori)
            : [...selectedKategori, cleanedKategori];

        setSelectedKategori(updatedKategori);

        get(
            route("productUMKM.find", {
                _query: {
                    page: 1,
                    kategori: updatedKategori.join(","),
                    query: query,
                },
            })
        );
    }

    function cleanseKategori(kategori) {
        return kategori.trim().replace(/\s+/g, " ");
    }

    function handleSearch(e) {
        e.preventDefault();

        get(
            route("productUMKM.find", {
                _query: {
                    page: 1,
                    kategori: queryKategori,
                    query: query,
                },
            })
        );
    }

    useEffect(() => {
        isMobile ? setShowKategori(false) : setShowKategori(true);
    }, [isMobile]);

    return (
        <UserLayout auth={auth}>
            <Head title={query || "Produk UMKM"} />

            <main className="flex sm:flex-row flex-col gap-5">
                <div className="sm:hidden block">
                    <form onSubmit={handleSearch} className="flex gap-x-3">
                        <TextInput
                            label="Search"
                            placeholder="Search produk..."
                            value={data.query}
                            className
                            onChange={(e) => setData("query", e.target.value)}
                        />
                        <Button icon={<FaSearch />} />
                    </form>
                </div>
                <section className="sm:sticky top-20 sm:w-[30vw] h-fit rounded-md border p-3">
                    <div
                        className="font-semibold flex items-center justify-between cursor-pointer"
                        onClick={() => setShowKategori((show) => !show)}
                    >
                        <span>Kategori</span>
                        <BsChevronDown
                            className={`${
                                showKategori ? "rotate-180" : ""
                            } duration-300`}
                        />
                    </div>
                    {showKategori && (
                        <ul className="mt-3 flex flex-col gap-y-3">
                            {listKategori.map((kategori, i) => (
                                <li
                                    key={i}
                                    className="flex items-center gap-x-3"
                                >
                                    <Checkbox
                                        checked={selectedKategori.includes(
                                            cleanseKategori(kategori)
                                        )}
                                        onChange={() =>
                                            filterByKategori(kategori)
                                        }
                                    />{" "}
                                    {kategori}
                                </li>
                            ))}
                        </ul>
                    )}
                </section>

                <div className="w-full">
                    {selectedKategori.length > 0 && (
                        <div className="mb-2 flex gap-x-3 h-fit max-w-[100vw] overflow-auto pb-3">
                            {selectedKategori.map((kategori, i) => (
                                <button
                                    key={i}
                                    className="flex gap-x-3 text-sm py-1 px-3 rounded-md bg-dark text-white"
                                >
                                    <span className="whitespace-nowrap">
                                        {kategori}
                                    </span>
                                    <span
                                        onClick={() =>
                                            filterByKategori(kategori)
                                        }
                                    >
                                        <MdClose size={20} />
                                    </span>
                                </button>
                            ))}
                        </div>
                    )}

                    {!results.data.length ? (
                        <h1 className="w-full text-2xl font-semibold">
                            Produk tidak ditemukan.
                        </h1>
                    ) : (
                        <section className="w-full">
                            {/* <div className="mb-5">
                                <div>
                                    <span className="font-semibold text-2xl">
                                        {results.data[0]?.nama}
                                    </span>{" "}
                                    <span className="font-normal text-label">
                                        (Kisaran harga {formatRupiah(minPrice)}{" "}
                                        - {formatRupiah(maxPrice)})
                                    </span>
                                </div>
                            </div> */}
                            <div className="mb-5 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
                                {results.data.map((product) => (
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
                                                    className="rounded-t-md sm:h-[10rem] h-[14rem] overflow-auto w-full group-hover:scale-110 duration-300"
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
                                                            32
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
                                ))}
                            </div>
                            <div className="w-fit mx-auto flex items-center gap-x-3 mb-10">
                                {results.links.map((link, i) => {
                                    if (i === 0)
                                        return (
                                            <Link
                                                key={i}
                                                href={
                                                    results.prev_page_url +
                                                    `&query=${query}&kategori=${queryKategori}`
                                                }
                                                className="hover:-translate-x-2 duration-300"
                                            >
                                                <span
                                                    key={i}
                                                    className={`cursor-pointer ${
                                                        results.current_page ===
                                                        1
                                                            ? "hidden"
                                                            : ""
                                                    }`}
                                                >
                                                    <FaChevronLeft />
                                                </span>
                                            </Link>
                                        );
                                    if (i === results.links.length - 1)
                                        return (
                                            <Link
                                                key={i}
                                                href={
                                                    results.next_page_url +
                                                    `&query=${query}&kategori=${queryKategori}`
                                                }
                                                className={`hover:translate-x-2 duration-300 ${
                                                    results.current_page ===
                                                    results.last_page
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
                                                    `&query=${query}&kategori=${queryKategori}`
                                                }
                                                className={`${
                                                    results.current_page !=
                                                    link.label
                                                        ? "hover:scale-110 duration-300"
                                                        : "pointer-events-none"
                                                } `}
                                            >
                                                <span
                                                    key={i}
                                                    className={`cursor-pointer ${
                                                        results.current_page ==
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
                        </section>
                    )}
                </div>
            </main>
        </UserLayout>
    );
}
