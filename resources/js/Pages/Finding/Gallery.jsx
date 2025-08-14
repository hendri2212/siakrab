import { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Head, Link } from "@inertiajs/react";

import UserLayout from "@/Layouts/UserLayout";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function Gallery({ auth, listGaleri: allGaleri }) {
    const INITIAL_LIST_GALERI = allGaleri.data;

    const [show, setShow] = useState(false);
    const [listGaleri, setListGaleri] = useState(INITIAL_LIST_GALERI);
    const fullScreenRef = useRef(null);
    const swiper = useSwiper();

    useEffect(() => {
        if (swiper) {
            const nextButton = document.getElementById(
                "swiper-button-next-galeri"
            );
            const prevButton = document.getElementById(
                "swiper-button-prev-galeri"
            );

            nextButton.addEventListener("click", function () {
                console.log("next");
                swiper.slideNext();
            });

            prevButton.addEventListener("click", function () {
                swiper.slidePrev();
            });
        }
    }, [swiper]);

    const handleClickGaleri = (galeri) => {
        const index = INITIAL_LIST_GALERI.findIndex((item) => item === galeri);

        const newList = [
            INITIAL_LIST_GALERI[index],
            ...INITIAL_LIST_GALERI.slice(0, index),
            ...INITIAL_LIST_GALERI.slice(index + 1),
        ];

        setListGaleri(newList);
    };

    const handleFullScreen = (galeri) => {
        handleClickGaleri(galeri);
        setShow(true);

        const element = fullScreenRef.current;

        if (element) {
            if (element.requestFullscreen) {
                element.requestFullscreen();
            } else if (element.mozRequestFullScreen) {
                element.mozRequestFullScreen();
            } else if (element.webkitRequestFullscreen) {
                element.webkitRequestFullscreen();
            } else if (element.msRequestFullscreen) {
                element.msRequestFullscreen();
            }
        }
    };

    useEffect(() => {
        const handleFullscreenChange = () => {
            const isFullscreen =
                document.fullscreenElement ||
                document.mozFullScreenElement ||
                document.webkitFullscreenElement ||
                document.msFullscreenElement;

            if (!isFullscreen) {
                setShow(false);
                setListGaleri(INITIAL_LIST_GALERI);
            }
        };

        document.addEventListener("fullscreenchange", handleFullscreenChange);
        document.addEventListener(
            "mozfullscreenchange",
            handleFullscreenChange
        );
        document.addEventListener(
            "webkitfullscreenchange",
            handleFullscreenChange
        );
        document.addEventListener("MSFullscreenChange", handleFullscreenChange);

        return () => {
            document.removeEventListener(
                "fullscreenchange",
                handleFullscreenChange
            );
            document.removeEventListener(
                "mozfullscreenchange",
                handleFullscreenChange
            );
            document.removeEventListener(
                "webkitfullscreenchange",
                handleFullscreenChange
            );
            document.removeEventListener(
                "MSFullscreenChange",
                handleFullscreenChange
            );
        };
    }, []);

    const totalItems = allGaleri.data.length;
    const itemsPerSection = Math.ceil(totalItems / 4);

    const section1 = allGaleri.data.slice(0, itemsPerSection);
    const section2 = allGaleri.data.slice(itemsPerSection, itemsPerSection * 2);
    const section3 = allGaleri.data.slice(
        itemsPerSection * 2,
        itemsPerSection * 3
    );
    const section4 = allGaleri.data.slice(itemsPerSection * 3);

    return (
        <UserLayout auth={auth}>
            <Head title="Galeri" />

            <header className="w-fit mx-auto text-center mb-10">
                <h1 className="font-extrabold text-4xl">Galeri Kotabaru</h1>
                <p className="text-lg mt-1">
                    Melihat Dunia Kotabaru Melalui Lensa Kami
                </p>
            </header>
            <section className="sm:grid hidden lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5">
                {INITIAL_LIST_GALERI.map((galeri, i) => (
                    <div
                        key={i}
                        className="relative overflow-hidden group cursor-pointer rounded-md"
                        onClick={() => handleFullScreen(galeri)}
                    >
                        <img
                            src={`/images/uploads/gallery/${galeri.gambar}`}
                            alt={galeri.nama}
                            className="h-[14rem] w-full rounded-md group-hover:scale-110 duration-300"
                        />
                        <div className="absolute bottom-0 h-14 w-full bg-black/70 blur-xl" />
                        <div className="absolute bottom-5 left-5 text-white">
                            <h1 className="text-xl font-semibold">
                                {galeri.nama}
                            </h1>
                        </div>
                    </div>
                ))}
            </section>

            <section className="sm:hidden block">
                <Swiper
                    slidesPerView={section1.length > 1 ? 1.5 : 1}
                    slidesPerGroup={1}
                    spaceBetween={10}
                    loop={true}
                    className="mb-5"
                >
                    {section1.map((galeri, i) => (
                        <SwiperSlide key={i}>
                            <div
                                className="relative overflow-hidden group cursor-pointer rounded-md"
                                onClick={() => handleFullScreen(galeri)}
                            >
                                <img
                                    src={`/images/uploads/gallery/${galeri.gambar}`}
                                    alt={galeri.nama}
                                    className="h-[12rem] w-full rounded-md group-hover:scale-110 duration-300"
                                />
                                <div className="absolute bottom-0 h-14 w-full bg-black/70 blur-xl" />
                                <div className="absolute bottom-5 left-5 text-white">
                                    <h1 className="text-xl font-semibold">
                                        {galeri.nama}
                                    </h1>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <Swiper
                    slidesPerView={section2.length > 1 ? 1.5 : 1}
                    slidesPerGroup={1}
                    spaceBetween={10}
                    loop={true}
                    className="mb-5"
                >
                    {section2.map((galeri, i) => (
                        <SwiperSlide key={i}>
                            <div
                                className="relative overflow-hidden group cursor-pointer rounded-md"
                                onClick={() => handleFullScreen(galeri)}
                            >
                                <img
                                    src={`/images/uploads/gallery/${galeri.gambar}`}
                                    alt={galeri.nama}
                                    className="h-[12rem] w-full rounded-md group-hover:scale-110 duration-300"
                                />
                                <div className="absolute bottom-0 h-14 w-full bg-black/70 blur-xl" />
                                <div className="absolute bottom-5 left-5 text-white">
                                    <h1 className="text-xl font-semibold">
                                        {galeri.nama}
                                    </h1>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <Swiper
                    slidesPerView={section3.length > 1 ? 1.5 : 1}
                    slidesPerGroup={1}
                    spaceBetween={10}
                    loop={true}
                    className="mb-5"
                >
                    {section3.map((galeri, i) => (
                        <SwiperSlide key={i}>
                            <div
                                className="relative overflow-hidden group cursor-pointer rounded-md"
                                onClick={() => handleFullScreen(galeri)}
                            >
                                <img
                                    src={`/images/uploads/gallery/${galeri.gambar}`}
                                    alt={galeri.nama}
                                    className="h-[12rem] w-full rounded-md group-hover:scale-110 duration-300"
                                />
                                <div className="absolute bottom-0 h-14 w-full bg-black/70 blur-xl" />
                                <div className="absolute bottom-5 left-5 text-white">
                                    <h1 className="text-xl font-semibold">
                                        {galeri.nama}
                                    </h1>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <Swiper
                    slidesPerView={section4.length > 1 ? 1.5 : 1}
                    slidesPerGroup={1}
                    spaceBetween={10}
                    loop={true}
                    className="mb-5"
                >
                    {section4.map((galeri, i) => (
                        <SwiperSlide key={i}>
                            <div
                                className="relative overflow-hidden group cursor-pointer rounded-md"
                                onClick={() => handleFullScreen(galeri)}
                            >
                                <img
                                    src={`/images/uploads/gallery/${galeri.gambar}`}
                                    alt={galeri.nama}
                                    className="h-[12rem] w-full rounded-md group-hover:scale-110 duration-300"
                                />
                                <div className="absolute bottom-0 h-14 w-full bg-black/70 blur-xl" />
                                <div className="absolute bottom-5 left-5 text-white">
                                    <h1 className="text-xl font-semibold">
                                        {galeri.nama}
                                    </h1>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </section>

            <div className="mt-5 mb-10 w-fit mx-auto flex items-center gap-x-3">
                {allGaleri.links.map((link, i) => {
                    if (i === 0)
                        return (
                            <Link
                                key={i}
                                href={allGaleri.prev_page_url}
                                className="hover:-translate-x-2 duration-300"
                            >
                                <span
                                    key={i}
                                    className={`cursor-pointer ${
                                        allGaleri.current_page === 1
                                            ? "hidden"
                                            : ""
                                    }`}
                                >
                                    <FaChevronLeft />
                                </span>
                            </Link>
                        );
                    if (i === allGaleri.links.length - 1)
                        return (
                            <Link
                                key={i}
                                href={allGaleri.next_page_url}
                                className={`hover:translate-x-2 duration-300 ${
                                    allGaleri.last_page ===
                                    allGaleri.current_page
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
                                    allGaleri.current_page != link.label
                                        ? "hover:scale-110 duration-300"
                                        : "pointer-events-none"
                                } `}
                            >
                                <span
                                    key={i}
                                    className={`cursor-pointer ${
                                        allGaleri.current_page == link.label
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

            <div ref={fullScreenRef}>
                {show && (
                    <>
                        <div className="z-[999] absolute top-1/2 -translate-y-1/2 w-full flex justify-between">
                            <button
                                className={`swiper-button-prev-galeri h-fit border border-primary text-primary rounded-full p-4 hover:bg-dark hover:text-primary duration-300`}
                            >
                                <FaChevronLeft size={30} />
                            </button>
                            <button
                                className={`swiper-button-next-galeri h-fit border border-primary text-primary rounded-full p-4 hover:bg-dark hover:text-primary duration-300`}
                            >
                                <FaChevronRight size={30} />
                            </button>
                        </div>
                        <Swiper
                            modules={[Navigation]}
                            navigation={{
                                prevEl: ".swiper-button-prev-galeri",
                                nextEl: ".swiper-button-next-galeri",
                            }}
                            onSwiper={(s) => {
                                s.navigation.update();
                            }}
                            loop={true}
                            className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"
                        >
                            {listGaleri.map((galeri, i) => (
                                <SwiperSlide key={i}>
                                    <img
                                        src={`/images/uploads/gallery/${galeri.gambar}`}
                                        alt={galeri.nama}
                                        className="w-full sm:h-screen h-auto"
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </>
                )}
            </div>
        </UserLayout>
    );
}
