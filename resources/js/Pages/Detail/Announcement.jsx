import { Head, Link } from "@inertiajs/react";
import { slug } from "@/Utils/formatSlug";
import { TruncateText } from "@/Utils/truncateText";
import { formatTanggalSimple } from "@/Utils/formatTanggal";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import Navbar from "@/Components/Navbar";
import { BsArrowLeft } from "react-icons/bs";
import { MdAnnouncement } from "react-icons/md";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function AnnouncementDetail({
    auth,
    announcementDetail,
    otherLatestAnnouncements,
}) {
    return (
        <>
            <Head title={announcementDetail.judul} />

            <Navbar auth={auth} />
            <header
                className="pt-14 pb-14 relative bg-dark text-white p-5"
                // style={{
                //     backgroundImage: `url("/images/hero/2.jpg")`,
                //     backgroundSize: "cover",
                // }}
            >
                {/* <div className="absolute inset-0 bg-black/20" /> */}
                <div className="relative container mx-auto md:px-5 sm:px-20 text-center">
                    <h1 className="sm:text-4xl text-2xl font-bold text-primary mb-3">
                        {announcementDetail.judul}
                    </h1>
                    <h2 className="text-xl">
                        {announcementDetail.author.name} -{" "}
                        {formatTanggalSimple(announcementDetail.created_at)}
                    </h2>
                </div>
            </header>
            <main className="container mx-auto sm:px-20 px-5 mb-10">
                <div className="my-3">
                    <Link href="/" className="flex items-center gap-x-3 group">
                        <BsArrowLeft
                            size={20}
                            className="group-hover:-translate-x-1 duration-300"
                        />
                        <span>Kembali</span>
                    </Link>
                </div>

                <div className="flex sm:flex-row flex-col gap-10">
                    <div className="sm:w-[65vw] rounded-md border p-5">
                        <h1 className="font-bold text-2xl mb-3">
                            {announcementDetail.judul}
                        </h1>
                        <p>{announcementDetail.konten}</p>
                    </div>
                    <div className="sm:w-[35vw] flex flex-col gap-5">
                        <h1 className="font-bold border-b pb-3">
                            Pengumuman Terbaru Lainnya
                        </h1>
                        {otherLatestAnnouncements.data.map((item) => (
                            <Link
                                key={item.id}
                                href={route("announcement.detail", item.id)}
                            >
                                <div
                                    className={`p-5 rounded-md border border-l-8 border-l-primary hover:bg-dark hover:text-primary duration-300`}
                                >
                                    <MdAnnouncement
                                        size={30}
                                        className="mx-auto"
                                    />
                                    <h1 className="font-bold mt-5">
                                        {item.judul}
                                    </h1>
                                </div>
                            </Link>
                        ))}

                        <div className="mt-5 w-fit mx-auto flex items-center gap-x-3">
                            {otherLatestAnnouncements.links.map((link, i) => {
                                if (i === 0)
                                    return (
                                        <Link
                                            key={i}
                                            href={
                                                otherLatestAnnouncements.prev_page_url
                                            }
                                            className="hover:-translate-x-2 duration-300"
                                        >
                                            <span
                                                key={i}
                                                className={`cursor-pointer ${
                                                    otherLatestAnnouncements.current_page ===
                                                    1
                                                        ? "hidden"
                                                        : ""
                                                }`}
                                            >
                                                <FaChevronLeft />
                                            </span>
                                        </Link>
                                    );
                                if (
                                    i ===
                                    otherLatestAnnouncements.links.length - 1
                                )
                                    return (
                                        <Link
                                            key={i}
                                            href={
                                                otherLatestAnnouncements.next_page_url
                                            }
                                            className={`hover:translate-x-2 duration-300 ${
                                                otherLatestAnnouncements.last_page ===
                                                otherLatestAnnouncements.current_page
                                                    ? "hidden"
                                                    : ""
                                            }`}
                                        >
                                            <span className="cursor-pointer">
                                                <FaChevronRight />
                                            </span>
                                        </Link>
                                    );
                                else
                                    return (
                                        <Link
                                            key={i}
                                            href={link.url}
                                            className={`${
                                                otherLatestAnnouncements.current_page !=
                                                link.label
                                                    ? "hover:scale-110 duration-300"
                                                    : "pointer-events-none"
                                            } `}
                                        >
                                            <span
                                                key={i}
                                                className={`cursor-pointer ${
                                                    otherLatestAnnouncements.current_page ==
                                                    link.label
                                                        ? "text-primary"
                                                        : ""
                                                }`}
                                            >
                                                {link.label}
                                            </span>
                                        </Link>
                                    );
                            })}
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
