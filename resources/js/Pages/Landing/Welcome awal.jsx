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

import Services from "./Partial/Services";
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
    queryKategori,
}) {
    const swiper = useSwiper();
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        if (swiper) {
            const nextButton = document.getElementById("swiper-button-next");
            const prevButton = document.getElementById("swiper-button-prev");

            nextButton.addEventListener("click", function () {
                console.log("next");
                swiper.slideNext();
            });

            prevButton.addEventListener("click", function () {
                swiper.slidePrev();
            });
        }
    }, [swiper]);

    useEffect(() => {
        const onScroll = document.addEventListener("scroll", () => {
            setIsScrolled(window.scrollY > 300);
        });

        return () => document.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <>
            <Head title="Welcome" />
            <Navbar auth={auth} />
            <section className="rleative">
                <div className="z-30 sm:fixed absolute sm:top-1/2 top-[75%] sm:left-3 left-1/2 -translate-y-1/2 sm:-translate-x-0 -translate-x-1/2">
                    <div className="flex sm:flex-col flex-row gap-5">
                        <a
                            href="https://www.instagram.com/siakrab_ktb"
                            target="_blank"
                        >
                            <AiFillInstagram
                                size={40}
                                className={`${
                                    isScrolled
                                        ? "sm:text-primary text-white"
                                        : "text-white"
                                }`}
                            />
                        </a>
                        <a
                            href="wa.me/+6287733204111"
                            target="_blank"
                        >
                            <RiWhatsappFill
                                size={40}
                                className={`${
                                    isScrolled
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
                                className={`${
                                    isScrolled
                                        ? "sm:text-primary text-white"
                                        : "text-white"
                                }`}
                            />
                        </a>
                    </div>
                </div>

                <div className="sm:hidden block h-screen">
                    <img
                        src="/images/hero/1.1.jpg"
                        alt="kotabaru"
                        className="h-full w-full brightness-100 sm:hidden block"
                    />
                </div>

                <div className="sm:block hidden">
                    <Swiper
                        className="relative h-screen"
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
                        <SwiperSlide>
                            <img
                                src="/images/hero/1.jpg"
                                alt="kotabaru"
                                className="h-screen w-full brightness-50 sm:block hidden"
                            />
                            {/* <img
                            src="/images/hero/1.1.jpg"
                            alt="kotabaru"
                            className="h-full w-full brightness-50 sm:hidden block"
                        /> */}
                        </SwiperSlide>
                        <SwiperSlide>
                            <img
                                src="/images/hero/2.jpg"
                                alt="kotabaru"
                                className="h-screen w-full brightness-50 sm:block hidden"
                            />
                            {/* <img
                            src="/images/hero/2.1.jpg"
                            alt="kotabaru"
                            className="h-screen w-full brightness-50 sm:hidden block"
                        /> */}
                        </SwiperSlide>
                        <SwiperSlide>
                            <img
                                src="/images/hero/3.jpg"
                                alt="kotabaru"
                                className="h-screen w-full brightness-50 sm:block hidden"
                            />
                            {/* <img
                            src="/images/hero/3.1.jpg"
                            alt="kotabaru"
                            className="h-screen w-full brightness-50 sm:hidden block"
                        /> */}
                        </SwiperSlide>
                        <SwiperSlide>
                            <img
                                src="/images/hero/4.jpg"
                                alt="kotabaru"
                                className="h-screen w-full brightness-50 sm:block hidden"
                            />
                            {/* <img
                            src="/images/hero/4.1.jpg"
                            alt="kotabaru"
                            className="h-screen w-full brightness-50 sm:hidden block"
                        /> */}
                        </SwiperSlide>
                    </Swiper>
                </div>
                        
                <div className="hero-shadow" />
                <div className="absolute top-48 left-0 right-0 z-50 container mx-auto sm:px-20 px-5">
                    <div className="relative text-white  w-full flex justify-between">
                        <div className="sm:text-start text-center">
                            <h1 className="font-bold sm:text-6xl text-3xl">
                               tulisan
                               
                            </h1>
                            <p className="mt-5 mb-10 sm:text-2xl">
                            tulisan
                                
                            </p>
                            <Link href="/finding/products">
                                <Button
                                    variant="primary"
                                    text="Explore Pelaku Ekonomi Kreatif"
                                    icon={<MdOutlineTravelExplore />}
                                    className="w-fit sm:mx-0 mx-auto"
                                />
                            </Link>
                        </div>
                        <div className="w-[33vw] sm:block hidden">
                            <Swiper
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
                                <SwiperSlide>
                                    <div className="rounded-md bg-white p-0.5">
                                        <img
                                            src="/images/hero/1.jpg"
                                            alt="kotabaru"
                                            width="800"
                                            height="600"
                                            className="rounded-md h-[16rem]"
                                        />
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="rounded-md bg-white p-0.5">
                                        <img
                                            src="/images/hero/2.jpg"
                                            alt="kotabaru"
                                            width="800"
                                            height="600"
                                            className="rounded-md h-[16rem]"
                                        />
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="rounded-md bg-white p-0.5">
                                        <img
                                            src="/images/hero/3.jpg"
                                            alt="kotabaru"
                                            width="800"
                                            height="600"
                                            className="rounded-md h-[16rem]"
                                        />
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="rounded-md bg-white p-0.5">
                                        <img
                                            src="/images/hero/4.jpg"
                                            alt="kotabaru"
                                            width="800"
                                            height="600"
                                            className="rounded-md h-[16rem]"
                                        />
                                    </div>
                                </SwiperSlide>
                            </Swiper>
                        </div>
                        <div className="w-full absolute -bottom-[8rem] sm:flex hidden justify-between">
                            <div className="w-fit ml-auto mt-12 flex gap-x-5">
                                <button
                                    className={`swiper-button-prev h-fit border border-primary text-primary rounded-full p-4 ${
                                        isBeginning
                                            ? "opacity-50 pointer-events-none"
                                            : ""
                                    } hover:bg-dark hover:text-primary duration-300`}
                                >
                                    <FaChevronLeft size={30} />
                                </button>
                                <button
                                    className={`swiper-button-next h-fit border border-primary text-primary rounded-full p-4 ${
                                        isEnd
                                            ? "opacity-50 pointer-events-none"
                                            : ""
                                    } hover:bg-dark hover:text-primary duration-300`}
                                >
                                    <FaChevronRight size={30} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Services />
            <Products
                listProdukUMKM={listProdukUMKM}
                queryKategori={queryKategori}
            />
            <News listBerita={listBerita} />
            <Announcements listPengumuman={listPengumuman} />
            {/* <Galery /> */}
            <Footer />
        </>
    );
}
