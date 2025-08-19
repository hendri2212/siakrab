import { useEffect, useState } from "react";
import { Link, useForm, usePage } from "@inertiajs/react";

import Button from "./Button";
import { IoClose, IoLogIn, IoLogOut } from "react-icons/io5";
import { BiSolidUserDetail } from "react-icons/bi";
import { HiMenuAlt3 } from "react-icons/hi";
import { FaSearch } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import TextInput from "./TextInput";

export default function Navbar({ auth }) {
    const { post } = useForm();
    const [isScrolled, setIsScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    const { query, queryKategori } = usePage().props;
    const { data, setData, get } = useForm({
        query: query || "",
    });

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 600);
        };
        document.addEventListener("scroll", handleScroll);
        return () => document.removeEventListener("scroll", handleScroll);
    }, []);

    function logout() {
        post(route("logout"));
    }

    function handleSearch(e) {
        e.preventDefault();
        get(
            route("productUMKM.find", {
                _query: {
                    page: 1,
                    kategori: queryKategori,
                    query: data.query,
                },
            })
        );
    }

    return (
        <nav className="w-full py-3 px-3 z-[99] relative text-black">
            <div className="relative z-50 flex justify-between items-center container mx-auto">
                <div>
                    <Link href="/" aria-label="Beranda">
                        <img
                            src="/icon.png"
                            alt="Beranda"
                            className="w-7 h-7 object-contain"
                        />
                    </Link>
                </div>
                <div className="block flex-1 px-3">
                    <form onSubmit={handleSearch} className="flex gap-x-3">
                        <div className="relative w-full">
                            <TextInput
                                placeholder="Search produk..."
                                value={data.query}
                                onChange={(e) => setData("query", e.target.value)}
                                className="!rounded-2xl !bg-white !pl-12 border-0 focus:ring-0 shadow-sm placeholder:text-gray-500"
                            />
                            <FaSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 z-10" />
                        </div>
                    </form>
                </div>

                {/* Toggle Drawer */}
                <div className="block">
                    <button onClick={() => setOpen(true)}>
                        <HiMenuAlt3 size={30} />
                    </button>
                    <div
                        className={`z-[99] fixed inset-0 ${open ? "block" : "hidden"}`}
                        onClick={() => setOpen(false)}
                    />
                    <div
                        className={`z-[99] fixed top-0 w-[65vw] h-screen bg-dark text-white duration-300 ${open ? "right-0 opacity-100" : "-right-[100%] opacity-0"
                            }`}
                    >
                        <div className="p-5 ">
                            <div className="flex justify-end">
                                <button onClick={() => setOpen(false)}>
                                    <IoClose size={30} className="text-red-500" />
                                </button>
                            </div>
                            <ul className="mt-10 flex flex-col gap-y-5">
                                {auth?.user ? (
                                    <>
                                        <li className="rounded-md hover:bg-white/10 duration-300 cursor-pointer">
                                            <Link
                                                href={
                                                    auth.user.role === "admin"
                                                        ? "/admin/dashboard"
                                                        : auth.user.role === "superAdmin"
                                                            ? "/super-admin/dashboard"
                                                            : "/umkm-admin/dashboard"
                                                }
                                                className="py-2 px-4 flex items-center gap-x-3"
                                            >
                                                <MdDashboard size={20} />
                                                <span>Dashboard</span>
                                            </Link>
                                        </li>
                                        <li className="rounded-md hover:bg-white/10 duration-300 cursor-pointer">
                                            <Link href={"/profile"} className="py-2 px-4 flex items-center gap-x-3">
                                                <BiSolidUserDetail size={20} />
                                                <span>Profile</span>
                                            </Link>
                                        </li>
                                        <li className="rounded-md hover:bg-white/10 duration-300 cursor-pointer">
                                            <div className="py-2 px-4 flex items-center gap-x-3" onClick={logout}>
                                                <IoLogOut size={20} />
                                                <span>Logout</span>
                                            </div>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <Link href={route("login")}>
                                            <Button
                                                variant="secondary"
                                                text="login"
                                                icon={<IoLogIn />}
                                                className={`w-full ${isScrolled ? "hover:text-primary" : ""}`}
                                            />
                                        </Link>
                                        <Link href={route("registerUMKM.create")}>
                                            <Button
                                                variant="primary"
                                                text="Register"
                                                icon={<IoLogIn />}
                                                className="w-full"
                                            />
                                        </Link>
                                    </>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`${isScrolled ? "" : "nav-shadow"}`} />
        </nav>
    );
}
