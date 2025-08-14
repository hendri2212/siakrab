import { useRef, useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";
import { useScreen } from "@/Hooks/useScreen";
import { Swiper, SwiperSlide } from "swiper/react";
import { convertFromRaw } from "draft-js";
import { TruncateText } from "@/Utils/truncateText";
import { slug } from "@/Utils/formatSlug";

import { FaYoutube } from "react-icons/fa";

export default function News({ listBerita }) {
    const { isMobile, isTablet } = useScreen();
    const newsRef = useRef();
    const { url } = usePage();

    useEffect(() => {
        if (newsRef.current && url.startsWith("/?news"))
            newsRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
                inline: "nearest",
            });
    }, []);

    return (
        <main
            ref={newsRef}
            id="news"
            className="container mx-auto sm:px-20 px-5 my-10"
        >
            <div className="overflow-hidden rounded-md mb-5 text-white">
                <div
                    style={{
                        backgroundImage: `url("/images/hero/2.jpg")`,
                        backgroundSize: "cover",
                        backgroundPosition: "top",
                    }}
                    className="relative h-[10rem] rounded-md flex justify-center items-center hover:scale-110 duration-300"
                >
                    <div className="absolute inset-0" />
                    <div className="font-bold sm:text-4xl text-2xl relative text-center sm:flex items-center gap-x-3">
                        <FaYoutube size={30} className="w-fit mx-auto" />
                        Youtube Siakrabkotabaru
                    </div>
                </div>
            </div>

            <header className="w-fit mx-auto text-center mb-10">
                <h1 className="font-extrabold text-4xl">Informasi Terbaru</h1>
                <p className="text-lg mt-1">Mengikuti Perkembangan Kotabaru</p>
            </header>

            <section>
                <Swiper
                    slidesPerView={isMobile ? 1.5 : isTablet ? 2.5 : 4}
                    spaceBetween={10}
                >
                    {listBerita.length > 0 ? (
                        listBerita.map((berita) => {
                            const contentStateData = JSON.parse(berita.konten);
                            const contentState =
                                convertFromRaw(contentStateData);
                            const plainText = contentState.getPlainText();

                            return (
                                <SwiperSlide key={berita.id}>
                                    <Link
                                        href={route(
                                            "news.detail",
                                            slug(berita.judul)
                                        )}
                                        className="group"
                                    >
                                        <div className="sm:h-[12rem] h-[10rem] rounded-md overflow-hidden">
                                            <img
                                                src={`/images/uploads/news/${berita.gambar}`}
                                                alt="Berita"
                                                className="rounded-md h-full w-full group-hover:scale-110 duration-300"
                                            />
                                        </div>
                                        <div className="mt-3">
                                            <h1 className="font-bold text-xl">
                                                {TruncateText(berita.judul, 64)}
                                            </h1>
                                            <p className="mt-1 text-gray-500">
                                                {TruncateText(plainText, 72)}
                                            </p>
                                        </div>
                                    </Link>
                                </SwiperSlide>
                            );
                        })
                    ) : (
                        <div className="mt-5">
                            <h1 className="text-2xl font-bold">
                                Tidak ada berita
                            </h1>
                            <p>Saat ini belum ada berita.</p>
                        </div>
                    )}
                </Swiper>
            </section>
        </main>
    );
}
