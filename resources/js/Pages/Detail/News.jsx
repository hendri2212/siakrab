import { Head, Link } from "@inertiajs/react";
import { convertFromRaw, EditorState, Editor } from "draft-js";
import { slug } from "@/Utils/formatSlug";
import { TruncateText } from "@/Utils/truncateText";
import { formatTanggalSimple } from "@/Utils/formatTanggal";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import Navbar from "@/Components/Navbar";
import { BsArrowLeft } from "react-icons/bs";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function NewsDetail({ auth, newsDetail, otherLatestNews }) {
    const parsedContent = JSON.parse(newsDetail.konten);
    const contentState = convertFromRaw(parsedContent);
    const editorState = EditorState.createWithContent(contentState);

    return (
        <>
            <Head title={newsDetail.judul} />

            <Navbar auth={auth} />
            {/* <header
                className="pt-14 pb-14 relative bg-dark text-white p-5"
                // style={{
                //     backgroundImage: `url("/images/hero/2.jpg")`,
                //     backgroundSize: "cover",
                // }}
            >
                <div className="absolute inset-0 bg-black/20" />
                <div className="relative container mx-auto md:px-5 sm:px-20 text-center">
                    <h1 className="sm:text-4xl text-2xl font-bold">
                        {newsDetail.judul}
                    </h1>
                    <h2>
                        {newsDetail.author.name} -{" "}
                        {formatTanggalSimple(newsDetail.created_at)}
                    </h2>
                </div>
            </header> */}
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
                    <div className="sm:w-[65vw] w-full">
                        <img
                            src={`/images/uploads/news/${newsDetail.gambar}`}
                            alt="berita"
                            className="w-full rounded-md"
                        />
                        <div className="mt-5 border-b">
                            <div className="border-b pb-5">
                                <h1 className="font-bold text-2xl">
                                    {newsDetail.judul}
                                </h1>
                                <p className="text-label">
                                    {newsDetail.author.name} -{" "}
                                    {formatTanggalSimple(newsDetail.created_at)}
                                </p>
                            </div>
                            <Editor editorState={editorState} readOnly={true} />
                        </div>
                    </div>
                    <div className="sm:w-[35vw] w-full flex flex-col gap-y-5 overflow-hidden">
                        <h1 className="font-bold border-b pb-3">
                            Berita Terbaru Lainnya
                        </h1>
                        {otherLatestNews.data.map((news) => {
                            const contentStateData = JSON.parse(news.konten);
                            const contentState =
                                convertFromRaw(contentStateData);
                            const plainText = contentState.getPlainText();

                            return (
                                <Link
                                    href={route(
                                        "news.detail",
                                        slug(news.judul)
                                    )}
                                    key={news.id}
                                    className="flex gap-x-3 border-b pb-5"
                                >
                                    <img
                                        src={`/images/uploads/news/${news.gambar}`}
                                        alt="berita"
                                        className="sm:w-[12rem] w-[9rem] h-fit rounded-md"
                                    />
                                    <div>
                                        <h1 className="font-bold whitespace-normal">
                                            {TruncateText(news.judul, 14)}
                                        </h1>
                                        <p>{TruncateText(plainText, 50)}</p>
                                    </div>
                                </Link>
                            );
                        })}

                        <div className="mt-5 w-fit mx-auto flex items-center gap-x-3">
                            {otherLatestNews.links.map((link, i) => {
                                if (i === 0)
                                    return (
                                        <Link
                                            key={i}
                                            href={otherLatestNews.prev_page_url}
                                            className="hover:-translate-x-2 duration-300"
                                        >
                                            <span
                                                key={i}
                                                className={`cursor-pointer ${
                                                    otherLatestNews.current_page ===
                                                    1
                                                        ? "hidden"
                                                        : ""
                                                }`}
                                            >
                                                <FaChevronLeft />
                                            </span>
                                        </Link>
                                    );
                                if (i === otherLatestNews.links.length - 1)
                                    return (
                                        <Link
                                            key={i}
                                            href={otherLatestNews.next_page_url}
                                            className={`hover:translate-x-2 duration-300 ${
                                                otherLatestNews.last_page ===
                                                otherLatestNews.current_page
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
                                                otherLatestNews.current_page !=
                                                link.label
                                                    ? "hover:scale-110 duration-300"
                                                    : "pointer-events-none"
                                            } `}
                                        >
                                            <span
                                                key={i}
                                                className={`cursor-pointer ${
                                                    otherLatestNews.current_page ==
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
