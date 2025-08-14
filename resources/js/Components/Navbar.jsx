import { useEffect, useState } from "react";
import { Link, useForm, usePage } from "@inertiajs/react";
import { Link as ScrollLink } from "react-scroll";

import Button from "./Button";
import Dropdown from "./Dropdown";
import { IoClose, IoLogIn, IoLogOut } from "react-icons/io5";
import { BiSolidUserDetail } from "react-icons/bi";
import { HiMenuAlt3, HiNewspaper, HiSpeakerphone } from "react-icons/hi";
import { GoHomeFill } from "react-icons/go";
import { FaSearch, FaStore } from "react-icons/fa";
import { MdCameraAlt, MdDashboard, MdHome } from "react-icons/md";
import TextInput from "./TextInput";

import { listKategori } from "@/Constants";

const navs = [
    // { name: "Beranda", path: "/", icon: <GoHomeFill size={20} /> },
    // { name: "Produk", path: "products", icon: <FaStore size={20} /> },
    { name: "Berita", path: "news", icon: <HiNewspaper size={20} /> },
    {
        name: "Pengumuman",
        path: "announcements",
        icon: <HiSpeakerphone size={20} />,
    },
    // {
    //     name: "Galeri",
    //     path: "galery",
    //     icon: <MdCameraAlt size={20} />,
    // },
];

export default function Navbar({ auth }) {
    const { post } = useForm();
    const [isScrolled, setIsScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    const { url } = usePage();
    const { query, queryKategori } = usePage().props;
    const { data, setData, get } = useForm({
        query: query || "",
    });
    const [selectedKategori, setSelectedKategori] = useState(
        queryKategori || ""
    );

    useEffect(() => {
        const onScroll = document.addEventListener("scroll", () => {
            setIsScrolled(window.scrollY > 600);
        });

        return () => document.removeEventListener("scroll", onScroll);
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
                    query: query,
                },
            })
        );
    }

    function filterByKategori(kategori) {
        setSelectedKategori(kategori);
        get(
            route("productUMKM.find", {
                _query: {
                    page: 1,
                    kategori: kategori,
                },
            })
        );
    }

    return (
        <nav
            className={`w-full py-3 z-[99] ${
                isScrolled
                    ? "fixed top-0 bg-white/10 backdrop-blur-md"
                    : url === "/" || url.startsWith("/?")
                    ? "fixed top-0 text-white"
                    : "sticky top-0 bg-white border-b"
            }`}
        >
            <div className="relative z-50 flex justify-between items-center container mx-auto sm:px-20 px-7">
                <div>
                    <Link href="/">
                        <h1
                            className={`font-bold uppercase text-lg hover:text-primary duration-300 ${
                                isScrolled ? "text-primary" : ""
                            }`}
                        >
                            Siakrabkotabaru
                        </h1>
                    </Link>
                </div>
                <div className="sm:block hidden">
                    <ul className="flex gap-x-7">
                        {url === "/" || url.startsWith("/?") ? (
                            <>
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <div className="hover:scale-110 duration-300">
                                            Produk
                                        </div>
                                    </Dropdown.Trigger>
                                    <Dropdown.Content
                                        contentClasses="w-[50vw] bg-white text-black border"
                                        align="center"
                                    >
                                        <div className="p-5 grid grid-cols-3 gap-x-5">
                                            {listKategori.map((kategori, i) => (
                                                <span
                                                    key={i}
                                                    className={`text-sm h-fit rounded-md py-2 px-3 cursor-pointer hover:bg-gray-100 duration-300 ${
                                                        kategori ===
                                                        selectedKategori
                                                            ? "bg-dark text-primary"
                                                            : ""
                                                    }`}
                                                    onClick={() =>
                                                        filterByKategori(
                                                            kategori
                                                        )
                                                    }
                                                >
                                                    {kategori}
                                                </span>
                                            ))}
                                        </div>
                                    </Dropdown.Content>
                                </Dropdown>

                                {navs.map((nav, i) => (
                                    <li
                                        key={i}
                                        className="hover:scale-110 duration-300 cursor-pointer"
                                    >
                                        <ScrollLink
                                            activeClass="text-primary"
                                            to={nav.path}
                                            spy={true}
                                            smooth={true}
                                        >
                                            {nav.name}
                                        </ScrollLink>
                                    </li>
                                ))}

                                <li className="hover:scale-110 duration-300 cursor-pointer">
                                    <Link href={route("gallery.find")}>
                                        Galeri
                                    </Link>
                                </li>
                            </>
                        ) : url.startsWith("/finding/products") ||
                          url.startsWith("/product") ? (
                            <div className="flex gap-x-7 items-center">
                                <li className="hover:scale-110 duration-300 cursor-pointer">
                                    <Link href={"/"}>Beranda</Link>
                                </li>
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <div className="hover:scale-110 duration-300">
                                            Produk
                                        </div>
                                    </Dropdown.Trigger>
                                    <Dropdown.Content
                                        contentClasses="w-[50vw] bg-white text-black border"
                                        align="center"
                                    >
                                        <div className="p-5 grid grid-cols-3 gap-x-5">
                                            {listKategori.map((kategori, i) => (
                                                <span
                                                    key={i}
                                                    className={`text-sm h-fit rounded-md py-2 px-3 cursor-pointer hover:bg-gray-100 duration-300 ${
                                                        kategori ===
                                                        selectedKategori
                                                            ? "bg-dark text-primary"
                                                            : ""
                                                    }`}
                                                    onClick={() =>
                                                        filterByKategori(
                                                            kategori
                                                        )
                                                    }
                                                >
                                                    {kategori}
                                                </span>
                                            ))}
                                        </div>
                                    </Dropdown.Content>
                                </Dropdown>
                                <li className="hover:scale-110 duration-300 cursor-pointer">
                                    <Link href={"/?news"}>Berita</Link>
                                </li>
                                <li className="hover:scale-110 duration-300 cursor-pointer">
                                    <Link href={"/?announcements"}>
                                        Pengumuman
                                    </Link>
                                </li>
                                <li className="hover:scale-110 duration-300 cursor-pointer">
                                    <Link href={route("gallery.find")}>
                                        Galeri
                                    </Link>
                                </li>
                                <div className="w-[20vw]">
                                    <form
                                        onSubmit={handleSearch}
                                        className="flex gap-x-3"
                                    >
                                        <TextInput
                                            label="Search"
                                            placeholder="Search produk..."
                                            value={data.query}
                                            className
                                            onChange={(e) =>
                                                setData("query", e.target.value)
                                            }
                                        />
                                        <Button icon={<FaSearch />} />
                                    </form>
                                </div>
                            </div>
                        ) : (
                            <div className="flex gap-x-7 items-center">
                                <li className="hover:scale-110 duration-300 cursor-pointer">
                                    <Link href={"/"}>Beranda</Link>
                                </li>
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <div className="hover:scale-110 duration-300">
                                            Produk
                                        </div>
                                    </Dropdown.Trigger>
                                    <Dropdown.Content
                                        contentClasses="w-[50vw] bg-white text-black border"
                                        align="center"
                                    >
                                        <div className="p-5 grid grid-cols-3 gap-x-5">
                                            {listKategori.map((kategori, i) => (
                                                <span
                                                    key={i}
                                                    className={`text-sm h-fit rounded-md py-2 px-3 cursor-pointer hover:bg-gray-100 duration-300 ${
                                                        kategori ===
                                                        selectedKategori
                                                            ? "bg-dark text-primary"
                                                            : ""
                                                    }`}
                                                    onClick={() =>
                                                        filterByKategori(
                                                            kategori
                                                        )
                                                    }
                                                >
                                                    {kategori}
                                                </span>
                                            ))}
                                        </div>
                                    </Dropdown.Content>
                                </Dropdown>
                                <li className="hover:scale-110 duration-300 cursor-pointer">
                                    <Link href={"/?news"}>Berita</Link>
                                </li>
                                <li className="hover:scale-110 duration-300 cursor-pointer">
                                    <Link href={"/?announcements"}>
                                        Pengumuman
                                    </Link>
                                </li>
                                <li
                                    className={`hover:scale-110 duration-300 cursor-pointer ${
                                        url === "/finding/gallery"
                                            ? "text-primary"
                                            : ""
                                    }`}
                                >
                                    <Link href={route("gallery.find")}>
                                        Galeri
                                    </Link>
                                </li>
                            </div>
                        )}
                    </ul>
                </div>
                <div className="sm:flex hidden gap-x-3">
                    {auth?.user ? (
                        <Dropdown>
                            <Dropdown.Trigger>
                                {auth.user.name}
                            </Dropdown.Trigger>
                            <Dropdown.Content>
                                <ul className="text-black py-3">
                                    <li>
                                        <Link
                                            href={`${
                                                auth.user.role ===
                                                    "umkmAdmin" ||
                                                auth.user.role === null
                                                    ? "/umkm-admin/dashboard"
                                                    : auth.user.role === "admin"
                                                    ? "/admin/dashboard"
                                                    : auth.user.role ===
                                                          "superAdmin" &&
                                                      "/super-admin/dashboard"
                                            }`}
                                            className="py-2 px-3 rounded-md hover:bg-gray-100 flex items-center gap-x-3"
                                        >
                                            <MdDashboard size={20} />
                                            <span>Dashboard</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href={route("profile.edit")}
                                            className="py-2 px-3 rounded-md hover:bg-gray-100 flex items-center gap-x-3"
                                        >
                                            <BiSolidUserDetail size={20} />
                                            <span>Profile</span>
                                        </Link>
                                    </li>
                                    <li
                                        className="py-2 px-3 rounded-md hover:bg-gray-100 cursor-pointer"
                                        onClick={logout}
                                    >
                                        <button className="flex items-center gap-x-3">
                                            <IoLogOut size={20} />
                                            <span>Logout</span>
                                        </button>
                                    </li>
                                </ul>
                            </Dropdown.Content>
                        </Dropdown>
                    ) : (
                        <>
                            <Link href={route("login")}>
                                <Button
                                    variant="secondary"
                                    text="login"
                                    icon={<IoLogIn />}
                                    className={`${
                                        isScrolled ? "hover:text-primary" : ""
                                    }`}
                                />
                            </Link>
                            <Link href={route("registerUMKM.create")}>
                                <Button
                                    variant="primary"
                                    text="Register"
                                    icon={<IoLogIn />}
                                />
                            </Link>
                        </>
                    )}
                </div>
                <div className="sm:hidden block">
                    <button onClick={() => setOpen(true)}>
                        <HiMenuAlt3 size={30} />
                    </button>
                    <div
                        className={`z-[99] fixed inset-0 ${
                            open ? "block" : "hidden"
                        }`}
                        onClick={() => setOpen(false)}
                    />
                    <div
                        className={`z-[99] fixed top-0 w-[65vw] h-screen bg-dark text-white duration-300 ${
                            open
                                ? "right-0 opacity-100"
                                : "-right-[100%] opacity-0"
                        }`}
                    >
                        <div className="p-5 ">
                            <div className="flex justify-end">
                                <button onClick={() => setOpen(false)}>
                                    <IoClose
                                        size={30}
                                        className="text-red-500"
                                    />
                                </button>
                            </div>
                            <ul className="mt-10 flex flex-col gap-y-5">
                                {url === "/" || url.startsWith("/?") ? (
                                    <>
                                        <li className="py-2 px-4">
                                            <Dropdown>
                                                <Dropdown.Trigger>
                                                    <div className="flex gap-x-3">
                                                        <FaStore size={20} />
                                                        <span>Produk</span>
                                                    </div>
                                                </Dropdown.Trigger>
                                                <Dropdown.Content contentClasses="bg-white text-black border max-h-[70vh] overflow-auto">
                                                    <div className="py-3 flex flex-col gap-y-3">
                                                        {listKategori.map(
                                                            (kategori, i) => (
                                                                <span
                                                                    key={i}
                                                                    className={`text-sm h-fit rounded-md py-2 px-3 cursor-pointer hover:bg-gray-100 duration-300 ${
                                                                        kategori ===
                                                                        selectedKategori
                                                                            ? "bg-dark text-primary"
                                                                            : ""
                                                                    }`}
                                                                    onClick={() =>
                                                                        filterByKategori(
                                                                            kategori
                                                                        )
                                                                    }
                                                                >
                                                                    {kategori}
                                                                </span>
                                                            )
                                                        )}
                                                    </div>
                                                </Dropdown.Content>
                                            </Dropdown>
                                        </li>
                                        {navs.map((nav, i) => (
                                            <li
                                                key={i}
                                                className="rounded-md hover:bg-white/10 duration-300 cursor-pointer"
                                            >
                                                <ScrollLink
                                                    to={nav.path}
                                                    className="py-2 px-4 flex items-center gap-x-3"
                                                    spy={true}
                                                    smooth={true}
                                                    activeClass="text-primary"
                                                    onClick={() =>
                                                        setOpen(false)
                                                    }
                                                >
                                                    {nav.icon}
                                                    <span>{nav.name}</span>
                                                </ScrollLink>
                                            </li>
                                        ))}

                                        <li className="rounded-md hover:bg-white/10 duration-300 cursor-pointer">
                                            <Link
                                                href={route("gallery.find")}
                                                className="py-2 px-4 flex items-center gap-x-3"
                                            >
                                                <MdCameraAlt size={20} />
                                                Galeri
                                            </Link>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <li
                                            className={`rounded-md duration-300 cursor-pointer hover:bg-white/10`}
                                        >
                                            <Link
                                                href={"/"}
                                                className="py-2 px-4 flex items-center gap-x-3"
                                            >
                                                <MdHome size={20} />
                                                Beranda
                                            </Link>
                                        </li>
                                        <li className="py-2 px-4">
                                            <Dropdown>
                                                <Dropdown.Trigger>
                                                    <div className="flex gap-x-3">
                                                        <FaStore size={20} />
                                                        <span>Produk</span>
                                                    </div>
                                                </Dropdown.Trigger>
                                                <Dropdown.Content contentClasses="bg-white text-black border max-h-[70vh] overflow-auto">
                                                    <div className="py-3 flex flex-col gap-y-3">
                                                        {listKategori.map(
                                                            (kategori, i) => (
                                                                <span
                                                                    key={i}
                                                                    className={`text-sm h-fit rounded-md py-2 px-3 cursor-pointer hover:bg-gray-100 duration-300 ${
                                                                        kategori ===
                                                                        selectedKategori
                                                                            ? "bg-dark text-primary"
                                                                            : ""
                                                                    }`}
                                                                    onClick={() =>
                                                                        filterByKategori(
                                                                            kategori
                                                                        )
                                                                    }
                                                                >
                                                                    {kategori}
                                                                </span>
                                                            )
                                                        )}
                                                    </div>
                                                </Dropdown.Content>
                                            </Dropdown>
                                        </li>
                                        <li
                                            className={`rounded-md duration-300 cursor-pointer ${
                                                url === "/finding/gallery"
                                                    ? "text-primary"
                                                    : "hover:bg-white/10"
                                            }`}
                                        >
                                            <Link
                                                href={route("gallery.find")}
                                                className="py-2 px-4 flex items-center gap-x-3"
                                            >
                                                <MdCameraAlt size={20} />
                                                Galeri
                                            </Link>
                                        </li>
                                    </>
                                )}
                                {auth?.user ? (
                                    <>
                                        <li className="rounded-md hover:bg-white/10 duration-300 cursor-pointer">
                                            <Link
                                                href={`${
                                                    auth.user.role ===
                                                        "umkmAdmin" ||
                                                    auth.user.role === null
                                                        ? "/umkm-admin/dashboard"
                                                        : auth.user.role ===
                                                          "admin"
                                                        ? "/admin/dashboard"
                                                        : auth.user.role ===
                                                              "superAdmin" &&
                                                          "/super-admin/dashboard"
                                                }`}
                                                className="py-2 px-4 flex items-center gap-x-3"
                                            >
                                                <MdDashboard size={20} />
                                                <span>Dashboard</span>
                                            </Link>
                                        </li>
                                        <li className="rounded-md hover:bg-white/10 duration-300 cursor-pointer">
                                            <Link
                                                href={"/profile"}
                                                className="py-2 px-4 flex items-center gap-x-3"
                                            >
                                                <BiSolidUserDetail size={20} />
                                                <span>Profile</span>
                                            </Link>
                                        </li>
                                        <li className="rounded-md hover:bg-white/10 duration-300 cursor-pointer">
                                            <div
                                                className="py-2 px-4 flex items-center gap-x-3"
                                                onClick={logout}
                                            >
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
                                                className={`w-full ${
                                                    isScrolled
                                                        ? "hover:text-primary"
                                                        : ""
                                                }`}
                                            />
                                        </Link>
                                        <Link
                                            href={route("registerUMKM.create")}
                                        >
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
