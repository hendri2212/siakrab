import { Head, usePage, Link } from "@inertiajs/react";
import { useEffect, useState, useCallback } from "react";

import {
    MdAnnouncement,
    MdCameraAlt,
    MdDashboard,
    MdVerified,
    MdLogout,
    MdMoreHoriz,
    MdClose,
} from "react-icons/md";
import { IoNewspaper, IoHome } from "react-icons/io5";
import { FaStore, FaUser } from "react-icons/fa";
import { MdViewCarousel } from "react-icons/md";

const navItems = [
    { name: "Public", path: "/", icon: <IoHome size={22} /> },
    { name: "Dashboard", path: "/admin/dashboard", icon: <MdDashboard size={22} /> },
    { name: "Verifikasi", path: "/admin/verify-umkm", icon: <MdVerified size={22} /> },
    { name: "Produk", path: "/admin/products-management", icon: <FaStore size={22} /> },
    { name: "Berita", path: "/admin/news-management", icon: <IoNewspaper size={22} /> },
    { name: "Pengumuman", path: "/admin/announcements-management", icon: <MdAnnouncement size={22} /> },
    { name: "Galeri", path: "/admin/gallery-management", icon: <MdCameraAlt size={22} /> },
    { name: "Carousel", path: "/admin/carousel-management", icon: <MdViewCarousel size={22} /> },
    { name: "Profil", path: "/profile", icon: <FaUser size={22} /> },
    {
        name: "Logout",
        path: "/logout",
        icon: <MdLogout size={22} />,
        method: "post",
        data: { redirect_to: "/" },
    },
];

// Tampilkan maksimal 4 item utama + 1 tombol "Lainnya" di bottom nav
const primaryItems = navItems.slice(0, 4);
const secondaryItems = navItems.slice(4);

export default function AdminLayout({ children, cta }) {
    const { url } = usePage();

    const [showMore, setShowMore] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    // Handle scroll event with useCallback for better performance
    const handleScroll = useCallback(() => {
        setIsScrolled(window.scrollY > 10);
    }, []);

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === "Escape") setShowMore(false);
        };
        window.addEventListener("keydown", onKey);
        window.addEventListener("scroll", handleScroll, { passive: true });

        // Check initial scroll position
        handleScroll();

        return () => {
            window.removeEventListener("keydown", onKey);
            window.removeEventListener("scroll", handleScroll);
        };
    }, [handleScroll]);

    const rawPath = url.includes("/admin/")
        ? url.split("/admin/")[1]
        : url.replace(/^\//, "");
    const firstSeg = (rawPath || "dashboard").split("?")[0].split("/")[0] || "dashboard";
    const headerTitle = firstSeg
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());

    const isActive = (currentUrl, itemPath) => {
        if (itemPath === "/") return false;
        return currentUrl.startsWith(itemPath);
    };

    const colsClass = "grid-cols-5"; // 4 menu utama + 1 tombol Lainnya

    return (
        <>
            <Head title="Admin" />

            {/* Sticky Header with rounded bottom design */}
            <header
                className={`sticky top-0 z-40 px-6 pt-[max(env(safe-area-inset-top),24px)] pb-6 bg-white rounded-b-[32px] shadow-lg shadow-gray-100 transition-all duration-300`}
            >
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="font-bold text-2xl text-gray-800 tracking-tight">
                            {headerTitle}
                        </h1>
                        <p className="text-xs text-gray-500 font-medium mt-0.5">Admin Portal</p>
                    </div>
                    <div>{cta}</div>
                </div>
            </header>

            {/* page container with bottom padding to avoid being overlapped by the fixed bottom nav */}
            <section className="min-h-screen w-full px-4 pb-32 pt-6 bg-gray-50 rounded-t-[32px]">
                <main>{children}</main>
            </section>

            {/* Fixed Bottom Navigation */}
            <nav aria-label="Navigasi Admin" className="fixed bottom-0 inset-x-0 z-50 bg-white border-t shadow-md pb-[max(env(safe-area-inset-bottom),16px)] rounded-t-lg">
                <div className={`grid ${colsClass}`}>
                    {primaryItems.map((item) => {
                        const active = isActive(url, item.path);
                        return (
                            <Link
                                key={item.path}
                                href={item.path}
                                method={item.method || undefined}
                                data={item.data || undefined}
                                as={item.method ? "button" : undefined}
                                aria-current={active ? "page" : undefined}
                                className={`flex flex-col items-center justify-center py-3 text-xs ${active ? "text-blue-600 font-semibold" : "text-gray-600"}`}
                            >
                                <div className={`mb-1 ${active ? "scale-110" : ""}`}>{item.icon}</div>
                                <span className="leading-none">{item.name}</span>
                            </Link>
                        );
                    })}

                    {/* Tombol Lainnya */}
                    <button
                        type="button"
                        onClick={() => setShowMore(true)}
                        className="flex flex-col items-center justify-center py-3 text-xs text-gray-700 focus:outline-none"
                        aria-haspopup="dialog"
                        aria-expanded={showMore}
                        aria-controls="more-sheet"
                    >
                        <div className="mb-1">
                            <MdMoreHoriz size={22} />
                        </div>
                        <span className="leading-none">Lainnya</span>
                    </button>
                </div>
            </nav>

            {/* Bottom Sheet Lainnya */}
            {showMore && (
                <div
                    role="dialog"
                    id="more-sheet"
                    aria-modal="true"
                    className="fixed inset-0 z-[60]"
                >
                    {/* Overlay */}
                    <div
                        className="absolute inset-0 bg-black/40"
                        onClick={() => setShowMore(false)}
                    />

                    {/* Sheet */}
                    <div className="absolute inset-x-0 bottom-0 bg-white rounded-t-2xl shadow-xl pt-2 pb-4 max-h-[70vh] overflow-y-auto">
                        <div className="mx-auto h-1.5 w-10 rounded-full bg-gray-300 mb-2" />
                        <div className="flex items-center justify-between px-4 mb-2">
                            <h2 className="font-semibold">Menu Lainnya</h2>
                            <button
                                type="button"
                                onClick={() => setShowMore(false)}
                                className="p-2 -mr-2"
                                aria-label="Tutup"
                            >
                                <MdClose size={20} />
                            </button>
                        </div>

                        <div className="px-2 grid grid-cols-4 gap-2">
                            {secondaryItems.map((item) => {
                                const active = isActive(url, item.path);
                                const content = (
                                    <div className={`flex flex-col items-center justify-center rounded-md py-3 ${active ? "text-blue-600 font-semibold" : "text-gray-700"}`}>
                                        <div className="mb-1">{item.icon}</div>
                                        <span className="text-[11px] leading-tight text-center line-clamp-2">{item.name}</span>
                                    </div>
                                );

                                return item.method ? (
                                    <Link
                                        key={item.path}
                                        href={item.path}
                                        method={item.method}
                                        data={item.data || undefined}
                                        as="button"
                                        onClick={() => setShowMore(false)}
                                        className=""
                                    >
                                        {content}
                                    </Link>
                                ) : (
                                    <Link
                                        key={item.path}
                                        href={item.path}
                                        onClick={() => setShowMore(false)}
                                        className=""
                                    >
                                        {content}
                                    </Link>
                                );
                            })}
                        </div>

                        <div className="px-4 mt-3 text-xs text-gray-500">
                            <p>Tarik ke bawah atau ketuk di luar untuk menutup.</p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
