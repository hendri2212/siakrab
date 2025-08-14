import { useEffect, useState } from "react";
import { Link, useForm, usePage } from "@inertiajs/react";
import { TruncateText } from "@/Utils/truncateText";

import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { BiSolidUserDetail } from "react-icons/bi";
import { PiDotOutlineThin } from "react-icons/pi";

export default function Sidebar({ title, sidebarItems }) {
    const { auth } = usePage().props;
    const { url } = usePage();
    const { post } = useForm();
    const [open, setOpen] = useState(true);
    const [submenuOpen, setSubmenOpen] = useState(false);

    useEffect(() => {
        if (!open) setSubmenOpen(false);
    }, [open]);

    function logout() {
        post(route("logout"));
    }

    return (
        <aside
            className={`sticky top-0 h-screen bg-dark text-white py-5 duration-300 ${
                open ? "w-80" : "w-20 bg-black text-white"
            }`}
        >
            <div className="px-5 mb-5">
                <Link href="/" className="flex gap-x-5">
                    <img
                        src="/icon.png"
                        alt="brand icon"
                        width="30"
                        className={`duration-300 ${
                            open ? "rotate-0" : "rotate-[360deg]"
                        }`}
                    />
                    <h1
                        className={`font-bold text-xl ${
                            open
                                ? "opacity-100"
                                : "opacity-0 pointer-events-none whitespace-nowrap"
                        }}`}
                    >
                        {title}
                    </h1>
                </Link>
            </div>
            <hr className="mb-5" />
            <ul>
                <li className="px-5 mb-5 text-xs font-medium text-label">
                    MENU
                </li>
                {sidebarItems.map((item, i) => (
                    <li
                        key={i}
                        className={`py-3 px-5 relative font-medium duration-300 ${
                            url.startsWith(item.path)
                                ? "text-primary"
                                : "hover:translate-x-2"
                        }`}
                    >
                        <Link
                            href={item.path}
                            className="flex items-center gap-x-3"
                        >
                            <span>{item.icon}</span>
                            <span
                                className={`whitespace-nowrap duration-300 ${
                                    open
                                        ? "opacity-100"
                                        : "opacity-0 pointer-events-none -translate-x-5"
                                }`}
                            >
                                {item.name}
                            </span>
                        </Link>
                        {item.path === url && (
                            <div className="w-[0.4rem] h-full rounded-r-md bg-primary absolute top-0 left-0" />
                        )}
                    </li>
                ))}
                <hr className="my-5" />
                <li className="px-5 mb-5 text-xs font-medium text-label">
                    ACCOUNT
                </li>

                <li
                    className={`relative font-medium cursor-pointer duration-300 hover:bg-white/5 ${
                        submenuOpen ? "bg-white/5" : ""
                    }`}
                >
                    <div
                        className="flex items-center gap-x-3 py-3 px-5"
                        onClick={() => {
                            setOpen(true);
                            setSubmenOpen((open) => !open);
                        }}
                    >
                        <span>
                            <BiSolidUserDetail size={25} />
                        </span>
                        <span
                            className={`whitespace-nowrap duration-300 ${
                                open
                                    ? "opacity-100"
                                    : "opacity-0 pointer-events-none -translate-x-5"
                            }`}
                        >
                            {TruncateText(auth?.user.name, 14)}
                        </span>
                        <span className="ml-auto">
                            <FaChevronDown
                                className={`duration-300 ${
                                    submenuOpen ? "rotate-180" : "rotate-0"
                                }`}
                            />
                        </span>
                    </div>
                    {submenuOpen && (
                        <div className={`pt-2 pb-3 px-5 duration-300`}>
                            <Link
                                href={route("profile.edit")}
                                className="flex items-center gap-x-3 hover:translate-x-2 duration-300"
                            >
                                <PiDotOutlineThin size={30} />
                                <h1>Profile</h1>
                            </Link>
                            <div
                                className="flex items-center gap-x-3 hover:translate-x-2 duration-300"
                                onClick={logout}
                            >
                                <PiDotOutlineThin size={30} />
                                <h1>Logout</h1>
                            </div>
                        </div>
                    )}
                </li>
            </ul>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
                <button
                    className="rounded-full p-3 bg-white/10 text-primary"
                    onClick={() => setOpen((open) => !open)}
                >
                    <FaChevronRight
                        size={25}
                        className={`duration-300 ${
                            open ? "rotate-180" : "rotate-0"
                        }`}
                    />
                </button>
            </div>
        </aside>
    );
}
