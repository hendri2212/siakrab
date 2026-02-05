import { useState, useEffect, useRef } from "react";
import { useScreen } from "@/Hooks/useScreen";
import { formatRupiah } from "@/Utils/formatRupiah";
import { formatPhone } from "@/Utils/formatPhone";
import { Link, useForm, usePage } from "@inertiajs/react";
import { slug } from "@/Utils/formatSlug";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { MdVerified } from "react-icons/md";

import { listKategori } from "@/Constants";

export default function Products({ listProdukUMKM, queryKategori }) {
    const { isMobile, isTablet } = useScreen();
    const productsRef = useRef(null);
    const { data, setData, get } = useForm({
        query: "",
    });
    const [selectedKategori, setSelectedKategori] = useState(
        queryKategori || ""
    );
    const { url } = usePage();



    // Infinite scroll states
    const [items, setItems] = useState(listProdukUMKM?.data || []);
    const [nextUrl, setNextUrl] = useState(null);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const bottomRef = useRef(null);

    // Build next-page URL while preserving kategori param
    function buildNextUrl(rawUrl, kategori) {
        if (!rawUrl) return null;
        // If the backend already includes kategori, don’t double-append
        const hasQuery = rawUrl.includes("?");
        const hasKategori = /[?&]kategori=/.test(rawUrl);
        if (kategori && !hasKategori) {
            return rawUrl + (hasQuery ? "&" : "?") + `kategori=${encodeURIComponent(kategori)}`;
        }
        return rawUrl;
    }

    // Initialize items only when kategori changes (avoid reset on next page fetch)
    useEffect(() => {
        setItems(listProdukUMKM?.data || []);
        setNextUrl(buildNextUrl(listProdukUMKM?.next_page_url || null, selectedKategori || ""));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedKategori]);

    // Loader for fetching next page via Inertia while preserving component state
    function loadMore() {
        if (!nextUrl || isLoadingMore) return;
        setIsLoadingMore(true);
        get(nextUrl, {
            preserveScroll: true,
            preserveState: true,
            only: ["listProdukUMKM"],
            onSuccess: (page) => {
                const next = page?.props?.listProdukUMKM;
                if (next?.data?.length) {
                    setItems((prev) => [...prev, ...next.data]);
                }
                setNextUrl(buildNextUrl(next?.next_page_url || null, selectedKategori || ""));
            },
            onFinish: () => setIsLoadingMore(false),
        });
    }

    // Observe the sentinel at the bottom to auto-load the next page (with improved options and fallback)
    useEffect(() => {
        const target = bottomRef.current;
        if (!target || !nextUrl) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                if (entry.isIntersecting) {
                    loadMore();
                }
            },
            {
                root: null,
                // Trigger sedikit sebelum elemen benar-benar masuk viewport (lebih aman di berbagai device)
                rootMargin: "150px 0px",
                threshold: 0.1,
            }
        );

        observer.observe(target);

        return () => {
            observer.unobserve(target);
            observer.disconnect();
        };
    }, [nextUrl, isLoadingMore]);

    function filterByKategori(kategori) {
        setSelectedKategori(kategori);
        setItems([]);
        get(
            route("home", {
                _query: {
                    page: 1,
                    kategori: kategori,
                },
            }),
            {
                preserveScroll: true,
                preserveState: true,
                only: ["listProdukUMKM"],
                onSuccess: (page) => {
                    const next = page?.props?.listProdukUMKM;
                    setItems(next?.data || []);
                    setNextUrl(buildNextUrl(next?.next_page_url || null, kategori || ""));
                },
            }
        );
    }

    // Susun kategori menjadi 2 item per kolom untuk scroll horizontal 2 baris
    const categoriesWithAll = [{ label: "", isAll: true }, ...listKategori.map(k => ({ label: k, isAll: false }))];

    function chunkToColumns(arr, size = 2) {
        const out = [];
        for (let i = 0; i < arr.length; i += size) {
            out.push(arr.slice(i, i + size));
        }
        return out;
    }

    const columnsAll = chunkToColumns(categoriesWithAll, 2);
    const columnsToShow = columnsAll;




    // Helpers: dynamic online icon resolution for categories
    function normalizeKeyword(text) {
        if (!text) return "all";
        return slug(text).replace(/-/g, " ");
    }

    function guessEnglishKeyword(id) {
        const t = id.toLowerCase();
        const map = {
            pengembang: "snake",
            aplikasi: "application",
            desain: "sofa",
            fotografi: "photography",
            kriya: "art",
            fesyen: "shoe",
            kuliner: "food",
            penerbitan: "book",
            periklanan: "ads",
            televisi: "tv",
            seni: "show",
            arsitektur: "architecture",
            musik: "music",
            jasa: "briefcase",
        };
        return map[t] || t;
    }

    function iconCandidatesFor(label) {
        if (!label) {
            return [
                "https://api.iconify.design/mdi:view-grid-outline.svg",
                "https://api.iconify.design/tabler:category-2.svg",
                "https://api.iconify.design/mdi:shape.svg",
            ];
        }
        const base = normalizeKeyword(label); // e.g., "makanan ringan" -> "makanan ringan"
        const parts = base.split(" ");
        const primary = guessEnglishKeyword(parts[0]);

        // Build a small candidate pool across icon sets
        const ids = [
            `mdi:${primary}`,
            `mdi:${primary}-outline`,
            `mdi:${primary}-variant`,
            `tabler:${primary}`,
            `tabler:${primary}-2`,
            `mdi:${parts.join("-")}`,
            `tabler:${parts.join("-")}`,
        ];

        // Deduplicate while preserving order
        const seen = new Set();
        const uniqueIds = ids.filter((x) => (seen.has(x) ? false : (seen.add(x), true)));
        return uniqueIds.map((id) => `https://api.iconify.design/${id}.svg`);
    }

    function OnlineIcon({ label, className, alt }) {
        const [idx, setIdx] = useState(0);
        const cands = iconCandidatesFor(label);

        function handleError() {
            setIdx((i) => (i + 1 < cands.length ? i + 1 : i));
        }

        return (
            <img
                src={cands[idx]}
                alt={alt}
                onError={handleError}
                className={className}
                loading="lazy"
                referrerPolicy="no-referrer"
            />
        );
    }

    return (
        <main id="products" ref={productsRef} className="container mx-auto px-3">
            <section className="relative">
                <div className="mb-4">
                    <div className="overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden mt-4">
                        <div className="grid grid-flow-col auto-cols-[minmax(5.5rem,1fr)] gap-2 pr-1">
                            {columnsToShow.map((col, cIdx) => (
                                <div key={cIdx} className="grid grid-rows-2 gap-2">
                                    {col.map((item, rIdx) => {
                                        const label = item.isAll ? "" : item.label;
                                        const isActive = selectedKategori === label;
                                        return (
                                            <button
                                                type="button"
                                                key={rIdx}
                                                onClick={() => filterByKategori(label)}
                                                className={`flex flex-col items-center justify-center border rounded-xl py-3 text-[11px] md:text-xs gap-0 ${isActive ? "bg-primary/10 border-primary text-primary" : "border-gray-200 hover:border-gray-300"}`}
                                                aria-pressed={isActive}
                                                aria-label={item.isAll ? "Semua kategori" : label}
                                            >
                                                {/* Icon wrapper with fixed height */}
                                                <div className="h-5 w-full flex items-center justify-center">
                                                    <OnlineIcon
                                                        label={item.isAll ? "" : label}
                                                        alt={item.isAll ? "Semua kategori" : label}
                                                        className="w-5 h-5 object-contain"
                                                    />
                                                </div>
                                                {/* Caption with fixed height and overflow control */}
                                                <span className="mt-1 px-1 text-center leading-tight h-8 overflow-hidden break-words">
                                                    {item.isAll ? "Semua" : label}
                                                </span>
                                            </button>
                                        );
                                    })}
                                    {/* Jika kolom hanya berisi 1 item, tambahkan spacer agar tinggi konsisten */}
                                    {col.length === 1 && <div className="invisible" />}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {items.length > 0 ? (
                    <>
                        <div className="grid grid-cols-3 gap-2">
                            {items.map((product) => {
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
                                                product.slug ? product.slug : product.nama
                                            )}
                                        >
                                            <div className="relative rounded-xl h-fit overflow-hidden group bg-white shadow-sm hover:shadow">
                                                <img
                                                    src={`/images/uploads/products/${product.thumbnail}`}
                                                    alt="produk"
                                                    className="block rounded-t-xl h-[7rem] w-full object-cover group-hover:scale-110 duration-300"
                                                />
                                                {/* <div className="absolute top-5 left-5 flex gap-x-2">
                                                    <span className="rounded-md py-0.5 px-3 text-sm bg-dark text-white">
                                                        {product.kategori}
                                                    </span>
                                                </div> */}
                                                <div className="min-h-[7rem] relative p-2">
                                                    <h2 className="font-bold [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical] overflow-hidden min-h-[2.5rem]">
                                                        {product.nama}
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
                                                                    {formatRupiah(product.harga_start)}
                                                                </span>
                                                                <span> - </span>
                                                                <span className="text-gray-500 text-sm">
                                                                    {formatRupiah(product.harga_end)}
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
                                );
                            })}
                        </div>


                        {/* Sentinel & fallback for infinite scroll */}
                        <div className="w-full flex flex-col items-center justify-center mt-3 gap-2">
                            <div ref={bottomRef} className="h-10 w-full flex items-center justify-center">
                                {isLoadingMore && (
                                    <span className="text-xs text-gray-500">Memuat...</span>
                                )}
                            </div>
                            {nextUrl && !isLoadingMore && (
                                <button
                                    type="button"
                                    onClick={loadMore}
                                    className="px-3 py-1 text-xs rounded-full border border-gray-300 bg-white text-gray-700 shadow-sm active:scale-[0.98]"
                                >
                                    Muat lebih banyak
                                </button>
                            )}
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
