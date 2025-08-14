import { useRef, useEffect } from "react";
import { useScreen } from "@/Hooks/useScreen";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link, usePage } from "@inertiajs/react";
import { MdAnnouncement } from "react-icons/md";

export default function Announcements({ listPengumuman }) {
    const { isMobile, isTablet } = useScreen();
    const announcementsRef = useRef();
    const { url } = usePage();

    useEffect(() => {
        if (announcementsRef.current && url.startsWith("/?announcements"))
            announcementsRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
                inline: "nearest",
            });
    }, []);

    return (
        <main
            ref={announcementsRef}
            id="announcements"
            className="min-h-[50vh] container mx-auto sm:px-20 px-5 my-10"
        >
            <header className="w-fit mx-auto text-center mb-10">
                <h1 className="font-extrabold text-4xl">Pengumuman</h1>
                <p className="text-lg mt-1">
                    Pemberitahuan penting yang kami bagikan
                </p>
            </header>

            <section>
                <Swiper
                    slidesPerView={isMobile ? 1.5 : isTablet ? 2.5 : 4}
                    spaceBetween={10}
                >
                    {listPengumuman.length > 0 ? (
                        listPengumuman.map((pengumuman) => (
                            <SwiperSlide key={pengumuman.id}>
                                <Link
                                    href={route(
                                        "announcement.detail",
                                        pengumuman.id
                                    )}
                                >
                                    <div
                                        className={`p-5 rounded-md bg-dark text-white border-l-8 border-primary hover:bg-primary duration-300`}
                                    >
                                        <MdAnnouncement
                                            size={30}
                                            className="mx-auto"
                                        />
                                        <h1 className="font-bold mt-5">
                                            {pengumuman.judul}
                                        </h1>
                                    </div>
                                </Link>
                            </SwiperSlide>
                        ))
                    ) : (
                        <div className="mt-5">
                            <h1 className="text-2xl font-bold">
                                Tidak ada pengumuman
                            </h1>
                            <p>Saat ini belum ada pengumuman.</p>
                        </div>
                    )}
                </Swiper>
            </section>
        </main>
    );
}
