import { useEffect, useState, useRef } from "react";
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

    // ===== Infinite Scroll State & Helpers =====
    const [items, setItems] = useState(results?.data || []);
    const [nextUrl, setNextUrl] = useState(null);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const bottomRef = useRef(null);

    // Build next-page URL while preserving current query & kategori
    function buildNextUrl(rawUrl, queryStr, kategoriArr) {
        if (!rawUrl) return null;
        const hasQuery = rawUrl.includes("?");
        const url = new URL(rawUrl, window.location.origin);
        // Ensure query
        if (queryStr && !url.searchParams.has("query")) {
            url.searchParams.set("query", queryStr);
        }
        // Ensure kategori (comma-joined)
        const joinedKategori = Array.isArray(kategoriArr) ? kategoriArr.join(",") : (kategoriArr || "");
        if (joinedKategori && !url.searchParams.has("kategori")) {
            url.searchParams.set("kategori", joinedKategori);
        }
        return hasQuery ? url.pathname + url.search : url.pathname + url.search;
    }

    // Initialize list only when the core search inputs change (query/kategori), not when page changes
    useEffect(() => {
        setItems(results?.data || []);
        setNextUrl(buildNextUrl(results?.next_page_url || null, query, selectedKategori));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query, JSON.stringify(queryKategori)]);

    // Loader for fetching next page via Inertia
    function loadMore() {
        if (!nextUrl || isLoadingMore) return;
        setIsLoadingMore(true);
        get(nextUrl, {
            preserveScroll: true,
            preserveState: true,
            only: ["results"],
            onSuccess: (page) => {
                const next = page?.props?.results;
                if (next?.data?.length) {
                    setItems((prev) => [...prev, ...next.data]);
                }
                setNextUrl(buildNextUrl(next?.next_page_url || null, query, selectedKategori));
            },
            onFinish: () => setIsLoadingMore(false),
        });
    }

    // Observe sentinel to auto-load more when near bottom
    useEffect(() => {
        if (!bottomRef.current) return;
        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (entry.isIntersecting) {
                    loadMore();
                }
            },
            { root: null, rootMargin: "300px", threshold: 0 }
        );
        observer.observe(bottomRef.current);
        return () => observer.disconnect();
    }, [bottomRef.current, nextUrl, isLoadingMore]);

    function filterByKategori(kategori) {
        const cleanedKategori = cleanseKategori(kategori);
        const isSelected = queryKategori.includes(cleanedKategori);
        const updatedKategori = isSelected
            ? selectedKategori.filter((item) => item !== cleanedKategori)
            : [...selectedKategori, cleanedKategori];

        setSelectedKategori(updatedKategori);
        setItems([]);

        get(
            route("productUMKM.find", {
                _query: {
                    page: 1,
                    kategori: updatedKategori.join(","),
                    query: data.query || query || "",
                },
            }),
            {
                preserveScroll: true,
                preserveState: true,
                only: ["results"],
                onSuccess: (page) => {
                    const next = page?.props?.results;
                    setItems(next?.data || []);
                    setNextUrl(buildNextUrl(next?.next_page_url || null, data.query || query || "", updatedKategori));
                },
            }
        );
    }

    function cleanseKategori(kategori) {
        return kategori.trim().replace(/\s+/g, " ");
    }

    function handleSearch(e) {
        e.preventDefault();
        setItems([]);
        get(
            route("productUMKM.find", {
                _query: {
                    page: 1,
                    kategori: selectedKategori.join(","),
                    query: data.query || "",
                },
            }),
            {
                preserveScroll: true,
                preserveState: true,
                only: ["results"],
                onSuccess: (page) => {
                    const next = page?.props?.results;
                    setItems(next?.data || []);
                    setNextUrl(buildNextUrl(next?.next_page_url || null, data.query || "", selectedKategori));
                },
            }
        );
    }

    useEffect(() => {
        isMobile ? setShowKategori(false) : setShowKategori(true);
    }, [isMobile]);

    return (
        <UserLayout auth={auth}>
            <Head title={query || "Produk UMKM"} />
            <main className="flex flex-col gap-5 max-w-[420px] mx-auto w-full">
                {/* <main className={`flex flex-col ${(!results?.data || results.data.length === 0) ? '' : 'gap-5'} max-w-[420px] mx-auto w-full`}></main> */}
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
                    {(!results?.data || results.data.length === 0) ? (
                        // {!results.data.length ? (
                        // <section className="w-full">
                        <div className="rounded-lg border border-dashed border-gray-200 p-6 text-center text-gray-500">
                            Produk tidak ditemukan.
                        </div>
                        // {/* </section> */}
                        // <h1 className="w-full text-2xl font-semibold">
                        //     Produk tidak ditemukan.
                        // </h1>
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
                            <div className="mb-5 grid grid-cols-3 gap-2">
                                {items.map((product) => (
                                    <div key={product.id}>
                                        <Link
                                            href={route(
                                                "productUMKM.detail",
                                                product.nama
                                            )}
                                        >
                                            <div className="relative rounded-lg h-fit overflow-hidden group bg-white p-2 shadow-sm hover:shadow">
                                                <img
                                                    src={`/images/uploads/products/${product.thumbnail}`}
                                                    alt="produk"
                                                    className="rounded-t-lg h-[8rem] w-full group-hover:scale-110 duration-300"
                                                />
                                                <div className="absolute top-5 left-5 flex gap-x-2">
                                                    <span className="rounded-md py-0.5 px-3 text-sm bg-dark text-white">
                                                        {product.kategori}
                                                    </span>
                                                </div>
                                                <div className="min-h-[8rem] relative">
                                                    <h2 className="font-bold [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical] overflow-hidden min-h-[2.5rem]">
                                                        {TruncateText(
                                                            product.nama,
                                                            32
                                                        )}
                                                    </h2>
                                                    <div className="min-h-[2.5rem] flex items-center flex-wrap leading-tight">
                                                        {product.harga_fix !==
                                                            null &&
                                                            product.harga_fix !==
                                                            "" ? (
                                                            <span className="text-gray-500">
                                                                {formatRupiah(
                                                                    product.harga_fix
                                                                )}
                                                            </span>
                                                        ) : (
                                                            <>
                                                                <span className="text-gray-500 text-sm">
                                                                    {formatRupiah(
                                                                        product.harga_start
                                                                    )}
                                                                </span>
                                                                <span> - </span>
                                                                <span className="text-gray-500 text-sm">
                                                                    {formatRupiah(
                                                                        product.harga_end
                                                                    )}
                                                                </span>
                                                            </>
                                                        )}
                                                    </div>
                                                    <div className="mt-3">
                                                        {/* <span className="rounded-md py-0.5 px-2 text-sm bg-gray-100 text-dark">
                                                            Kec.
                                                            {
                                                                product
                                                                    .pelaku_umkm
                                                                    .kecamatan
                                                            }
                                                        </span> */}
                                                        <p className="mt-2 text-sm flex items-center gap-x-2 h-5">
                                                            <MdVerified size={20} className="text-primary" />
                                                            <span className="truncate">
                                                                {product.pelaku_umkm.nama_usaha}
                                                            </span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                            {/* Sentinel for infinite scroll */}
                            <div ref={bottomRef} className="h-8 w-full flex items-center justify-center mt-2 mb-10">
                                {isLoadingMore && (
                                    <span className="text-xs text-gray-500">Memuat…</span>
                                )}
                            </div>
                        </section>
                    )}
                </div>
            </main>
        </UserLayout>
    );
}
