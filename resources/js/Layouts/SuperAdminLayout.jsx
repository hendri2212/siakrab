import { Head, usePage } from "@inertiajs/react";

import Sidebar from "@/Components/Sidebar";
import { MdDashboard, MdManageAccounts } from "react-icons/md";

const sidebarItems = [
    {
        name: "Dashboard",
        path: "/super-admin/dashboard",
        icon: <MdDashboard size={25} />,
    },
    {
        name: "Manajemen Akun",
        path: "/super-admin/accounts-management",
        icon: <MdManageAccounts size={25} />,
    },
];

export default function SuperAdminLayout({ children, cta }) {
    const { url } = usePage();
    const urlParts = url.split("/super-admin/");
    const subpath = urlParts[1];
    const headerTitle = subpath.charAt(0).toUpperCase() + subpath.slice(1);

    return (
        <>
            <Head title="Super Admin" />

            <div className="flex">
                <Sidebar title={"SuperAdmin"} sidebarItems={sidebarItems} />
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
