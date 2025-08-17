import { Head, usePage, Link } from "@inertiajs/react";

import {
    MdAnnouncement,
    MdCameraAlt,
    MdDashboard,
    MdVerified,
    MdLogout,
} from "react-icons/md";
import { IoNewspaper } from "react-icons/io5";
import { FaStore, FaUser } from "react-icons/fa";

const navItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <MdDashboard size={22} /> },
    { name: "Verifikasi", path: "/admin/verify-umkm", icon: <MdVerified size={22} /> },
    { name: "Produk", path: "/admin/products-management", icon: <FaStore size={22} /> },
    { name: "Berita", path: "/admin/news-management", icon: <IoNewspaper size={22} /> },
    { name: "Pengumuman", path: "/admin/announcements-management", icon: <MdAnnouncement size={22} /> },
    { name: "Galeri", path: "/admin/gallery-management", icon: <MdCameraAlt size={22} /> },
    { name: "Profil", path: "/profile", icon: <FaUser size={22} /> },
    { name: "Logout", path: "/logout", icon: <MdLogout size={22} />, method: "post" },
];

export default function AdminLayout({ children, cta }) {
    const { url } = usePage();

    const rawPath = url.includes("/admin/")
        ? url.split("/admin/")[1]
        : url.replace(/^\//, "");
    const firstSeg = (rawPath || "dashboard").split("?")[0].split("/")[0] || "dashboard";
    const headerTitle = firstSeg
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());

    const isActive = (currentUrl, itemPath) => currentUrl.startsWith(itemPath);

    const colsClass = (
        {
            2: "grid-cols-2",
            3: "grid-cols-3",
            4: "grid-cols-4",
            5: "grid-cols-5",
            6: "grid-cols-6",
            7: "grid-cols-7",
            8: "grid-cols-8",
        }[navItems.length] || "grid-cols-4"
    );

    return (
        <>
            <Head title="Admin" />

            {/* page container with bottom padding to avoid being overlapped by the fixed bottom nav */}
            <section className="min-h-screen w-full px-3 pb-24">
                <header className="py-4 mb-5 flex justify-between">
                    <div>
                        <h1 className="font-bold text-xl">{headerTitle}</h1>
                        <p>{url}</p>
                    </div>
                    <div>{cta}</div>
                </header>
                <main>{children}</main>
            </section>

            {/* Fixed Bottom Navigation */}
            <nav
                aria-label="Navigasi Admin"
                className="fixed bottom-0 inset-x-0 z-50 bg-white border-t shadow-md pb-[env(safe-area-inset-bottom)]"
            >
                <div className={`grid ${colsClass}`}>
                    {navItems.map((item) => {
                        const active = isActive(url, item.path);
                        return (
                            <Link
                                key={item.path}
                                href={item.path}
                                method={item.method || undefined}
                                as={item.method ? "button" : undefined}
                                aria-current={active ? "page" : undefined}
                                className={`flex flex-col items-center justify-center py-3 text-xs ${active ? "text-blue-600 font-semibold" : "text-gray-600"
                                    }`}
                            >
                                <div className={`mb-1 ${active ? "scale-110" : ""}`}>{item.icon}</div>
                                <span className="leading-none">{item.name}</span>
                            </Link>
                        );
                    })}
                </div>
            </nav>
        </>
    );
}
