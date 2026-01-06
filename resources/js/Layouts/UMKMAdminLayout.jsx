import { Head, usePage, Link } from "@inertiajs/react";

import { MdDashboard, MdLogout } from "react-icons/md";
import { FaStore, FaUser, FaHeart, FaBookmark } from "react-icons/fa";

const sidebarItems = [
    {
        name: "Dashboard",
        path: "/umkm-admin/dashboard",
        icon: <MdDashboard size={22} />, // a bit smaller for bottom nav
    },
    {
        name: "Produk",
        path: "/umkm-admin/products-management",
        icon: <FaStore size={22} />, // a bit smaller for bottom nav
    },
    {
        name: "Likes",
        path: "/umkm-admin/likes",
        icon: <FaHeart size={22} />,
    },
    {
        name: "Saved",
        path: "/umkm-admin/saved",
        icon: <FaBookmark size={22} />,
    },
    {
        name: "Profil",
        path: "/profile",
        icon: <FaUser size={22} />,
    },
    {
        name: "Logout",
        path: "/logout",
        icon: <MdLogout size={22} />,
        method: "post",
    },
];

const sidebarItems2 = [
    {
        name: "Dashboard",
        path: "/umkm-admin/dashboard",
        icon: <MdDashboard size={22} />, // a bit smaller for bottom nav
    },
    {
        name: "Profil",
        path: "/profile",
        icon: <FaUser size={22} />,
    },
    {
        name: "Logout",
        path: "/logout",
        icon: <MdLogout size={22} />,
        method: "post",
    },
];

export default function UMKMAdminLayout({ auth, children, cta }) {
    const { url } = usePage();
    const rawPath = url.includes("/umkm-admin/")
        ? url.split("/umkm-admin/")[1]
        : url.replace(/^\//, "");
    const firstSeg = (rawPath || "dashboard").split("?")[0].split("/")[0] || "dashboard";
    const headerTitle = firstSeg
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());

    const items = auth?.user?.role === "umkmAdmin" ? sidebarItems : sidebarItems2;

    const colsClass = { 2: "grid-cols-2", 3: "grid-cols-3", 4: "grid-cols-4", 5: "grid-cols-5" }[items.length] || "grid-cols-6";

    const isActive = (currentUrl, itemPath) => { return currentUrl.startsWith(itemPath); };

    return (
        <>
            <Head title="UMKM Admin" />
            {/* page container with bottom padding to avoid being overlapped by the fixed bottom nav */}
            <section className="min-h-screen w-full px-3 pb-24">
                <header className="py-3 mb-3 flex justify-between">
                    <div>
                        <h1 className="font-bold text-xl">{headerTitle}</h1>
                        {/* <p>{url}</p> */}
                    </div>
                    <div>{cta}</div>
                </header>
                <main className="w-full">{children}</main>
            </section>

            {/* Fixed Bottom Navigation */}
            <nav aria-label="Navigasi UMKM Admin" className="fixed bottom-0 inset-x-0 z-50 bg-white border-t shadow-md pb-[max(env(safe-area-inset-bottom),16px)] rounded-t-lg">
                <div className={`grid ${colsClass}`}>
                    {items.map((item) => {
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
