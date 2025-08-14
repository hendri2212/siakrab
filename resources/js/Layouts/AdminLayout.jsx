import { Head, usePage } from "@inertiajs/react";

import Sidebar from "@/Components/Sidebar";
import {
    MdAnnouncement,
    MdCameraAlt,
    MdDashboard,
    MdVerified,
} from "react-icons/md";
import { IoNewspaper } from "react-icons/io5";
import { FaStore } from "react-icons/fa";

const sidebarItems = [
    {
        name: "Dashboard",
        path: "/admin/dashboard",
        icon: <MdDashboard size={25} />,
    },
    {
        name: "Verifikasi UMKM",
        path: "/admin/verify-umkm",
        icon: <MdVerified size={25} />,
    },
    {
        name: "Produk UMKM",
        path: "/admin/products-management",
        icon: <FaStore size={25} />,
    },
    {
        name: "Berita",
        path: "/admin/news-management",
        icon: <IoNewspaper size={25} />,
    },
    {
        name: "Pengumuman",
        path: "/admin/announcements-management",
        icon: <MdAnnouncement size={25} />,
    },
    {
        name: "Galeri",
        path: "/admin/gallery-management",
        icon: <MdCameraAlt size={25} />,
    },
];

export default function AdminLayout({ children, cta }) {
    const { url } = usePage();
    const urlParts = url.split("/admin/");
    const subpath = urlParts[1];
    const headerTitle = subpath.charAt(0).toUpperCase() + subpath.slice(1);

    return (
        <>
            <Head title="Admin" />

            <div className="flex">
                <Sidebar title={"Admin"} sidebarItems={sidebarItems} />
                <section className="w-full container mx-auto sm:px-20 px-5">
                    <header className="py-4 mb-5 flex justify-between">
                        <div>
                            <h1 className="font-bold text-xl">{headerTitle}</h1>
                            <p>{url}</p>
                        </div>
                        <div>{cta}</div>
                    </header>
                    <main>{children}</main>
                </section>
            </div>
        </>
    );
}
