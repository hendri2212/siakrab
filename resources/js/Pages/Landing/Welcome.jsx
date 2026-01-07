import { useEffect, useRef, useState } from "react";
import { Head, Link } from "@inertiajs/react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import { Link as ScrollLink } from "react-scroll";

import Button from "@/Components/Button";
import Navbar from "@/Components/Navbar";

import { MdOutlineTravelExplore } from "react-icons/md";
import { FaChevronLeft, FaChevronRight, FaFacebook } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { RiWhatsappFill } from "react-icons/ri";

// import Services from "./Partial/Services";
import Products from "./Partial/Products";
import News from "./Partial/News";
import Announcements from "./Partial/Announcements";
import Galery from "./Partial/Galery";
import Footer from "@/Components/Footer";

export default function Welcome({
    auth,
    listProdukUMKM,
    listAllProdukUMKM,
    listBerita,
    listPengumuman,
    listCarousel,
    queryKategori,
}) {
    // const swiper = useSwiper();
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    return (
        <>
            <Head title="Welcome" />
            <Navbar auth={auth} />
            <section className="relative px-3">
                <div className="z-30 sm:fixed absolute sm:top-1/2 top-[75%] sm:left-3 left-1/2 -translate-y-1/2 sm:-translate-x-0 -translate-x-1/2">
                    <div className="flex sm:flex-col flex-row gap-5">
                        <a
                            href="https://www.instagram.com/siakrab_ktb"
                            target="_blank"
                        >
                            <AiFillInstagram
                                size={40}
                                className={`${isScrolled
                                    ? "sm:text-primary text-white"
                                    : "text-white"
                                    }`}
                            />
                        </a>
                        <a
                            href="https://wa.me/+6287733204111"
                            target="_blank"
                        >
                            <RiWhatsappFill
                                size={40}
                                className={`${isScrolled
                                    ? "sm:text-primary text-white"
                                    : "text-white"
                                    }`}
                            />
                        </a>
                        <a
                            href="https://www.facebook.com/profile.php?id=100089457410389"
                            target="_blank"
                        >
                            <FaFacebook
                                size={40}
                                className={`${isScrolled
                                    ? "sm:text-primary text-white"
                                    : "text-white"
                                    }`}
                            />
                        </a>
                    </div>
                </div>

                <div className="block">
                    <Swiper
                        className="relative h-[200px]"
                        modules={[Navigation]}
                        navigation={{
                            prevEl: ".swiper-button-prev",
                            nextEl: ".swiper-button-next",
                        }}
                        slidesPerView={1}
                        onSwiper={(s) => {
                            s.navigation.update();
                        }}
                        onSlideChange={(swiper) => {
                            if (swiper.isEnd) {
                                setIsEnd(true);
                            } else {
                                setIsEnd(false);
                            }

                            if (swiper.isBeginning) {
                                setIsBeginning(true);
                            } else {
                                setIsBeginning(false);
                            }
                        }}
                    >
                        {listCarousel && listCarousel.length > 0 ? (
                            listCarousel.map((carousel) => (
                                <SwiperSlide key={carousel.id} className="h-full">
                                    {carousel.link ? (
                                        <a href={carousel.link} target="_blank" rel="noopener noreferrer">
                                            <img
                                                src={"/images/carousel/" + carousel.image}
                                                alt={carousel.title || "carousel"}
                                                className="h-full w-full object-cover block rounded-xl"
                                            />
                                        </a>
                                    ) : (
                                        <img
                                            src={"/images/carousel/" + carousel.image}
                                            alt={carousel.title || "carousel"}
                                            className="h-full w-full object-cover block rounded-xl"
                                        />
                                    )}
                                </SwiperSlide>
                            ))
                        ) : (
                            <>
                                <SwiperSlide className="h-full">
                                    <img src="/images/hero/1.jpg" alt="kotabaru" className="h-full w-full object-cover block rounded-xl" />
                                </SwiperSlide>
                                <SwiperSlide className="h-full">
                                    <img src="/images/hero/2.jpg" alt="kotabaru" className="h-full w-full object-cover block rounded-xl" />
                                </SwiperSlide>
                                <SwiperSlide className="h-full">
                                    <img src="/images/hero/3.jpg" alt="kotabaru" className="h-full w-full object-cover block rounded-xl" />
                                </SwiperSlide>
                                <SwiperSlide className="h-full">
                                    <img src="/images/hero/4.jpg" alt="kotabaru" className="h-full w-full object-cover block rounded-xl" />
                                </SwiperSlide>
                            </>
                        )}
                    </Swiper>
                </div>
            </section>
            {/* <Services /> */}
            <Products
                listProdukUMKM={listProdukUMKM}
                queryKategori={queryKategori}
            />
            {/* <News listBerita={listBerita} /> */}
            {/* <Announcements listPengumuman={listPengumuman} /> */}
            {/* <Galery /> */}
            {/* <Footer /> */}
        </>
    );
}
