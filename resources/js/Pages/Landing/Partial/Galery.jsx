import { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Navigation } from "swiper/modules";

import { listGaleri } from "@/Constants";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const INITIAL_LIST_GALERI = listGaleri;

export default function Galery() {
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

    return (
        <main id="galery" className="container mx-auto sm:px-20 px-5 my-10">
            <header className="w-fit mx-auto text-center mb-10">
                <h1 className="font-extrabold text-4xl">Galeri Kotabaru</h1>
                <p className="text-lg mt-1">
                    Melihat Dunia Kotabaru Melalui Lensa Kami
                </p>
            </header>

            <section className="sm:grid hidden lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-3">
                {INITIAL_LIST_GALERI.map((galeri, i) => (
                    <div
                        key={i}
                        className="relative overflow-hidden group cursor-pointer rounded-md"
                        onClick={() => handleFullScreen(galeri)}
                    >
                        <img
                            src={`/images/hero/${galeri.image}`}
                            alt={galeri.title}
                            className="h-[14rem] w-full rounded-md group-hover:scale-110 duration-300"
                        />
                        <div className="absolute bottom-0 h-14 w-full bg-black/70 blur-xl" />
                        <div className="absolute bottom-5 left-5 text-white">
                            <h1 className="text-xl font-semibold">
                                {galeri.title}
                            </h1>
                        </div>
                    </div>
                ))}
            </section>

            <section className="sm:hidden block">
                <Swiper
                    slidesPerView={1.5}
                    slidesPerGroup={1}
                    spaceBetween={10}
                    loop={true}
                >
                    {INITIAL_LIST_GALERI.map((galeri, i) => (
                        <SwiperSlide key={i}>
                            <div
                                className="relative overflow-hidden group cursor-pointer rounded-md"
                                onClick={() => handleFullScreen(galeri)}
                            >
                                <img
                                    src={`/images/hero/${galeri.image}`}
                                    alt={galeri.title}
                                    className="h-[12rem] w-full rounded-md group-hover:scale-110 duration-300"
                                />
                                <div className="absolute bottom-0 h-14 w-full bg-black/70 blur-xl" />
                                <div className="absolute bottom-5 left-5 text-white">
                                    <h1 className="text-xl font-semibold">
                                        {galeri.title}
                                    </h1>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </section>

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
                                        src={`/images/hero/${galeri.image}`}
                                        alt={galeri.title}
                                        className="w-full sm:h-screen h-auto"
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </>
                )}
            </div>
        </main>
    );
}
