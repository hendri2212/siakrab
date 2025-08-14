import { Head, usePage } from "@inertiajs/react";

import Sidebar from "@/Components/Sidebar";
import { MdDashboard } from "react-icons/md";
import { FaStore } from "react-icons/fa";

const sidebarItems = [
    {
        name: "Dashboard",
        path: "/umkm-admin/dashboard",
        icon: <MdDashboard size={25} />,
    },
    {
        name: "Produk",
        path: "/umkm-admin/products-management",
        icon: <FaStore size={25} />,
    },
];

const sidebarItems2 = [
    {
        name: "Dashboard",
        path: "/umkm-admin/dashboard",
        icon: <MdDashboard size={25} />,
    },
];

export default function UMKMAdminLayout({ auth, children, cta }) {
    const { url } = usePage();
    const urlParts = url.split("/umkm-admin/");
    const subpath = urlParts[1];
    const headerTitle = subpath.charAt(0).toUpperCase() + subpath.slice(1);

    return (
        <>
            <Head title="UMKM Admin" />
            <div className="flex">
                <Sidebar
                    title={"UMKM Admin"}
                    sidebarItems={
                        auth?.user.role === "umkmAdmin"
                            ? sidebarItems
                            : sidebarItems2
                    }
                />
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
