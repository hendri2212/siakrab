import { useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Link as Scrollink } from "react-scroll";
import { Link } from "@inertiajs/react";
import { useScreen } from "@/Hooks/useScreen";

import Button from "@/Components/Button";
import { AiFillInstagram } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";
import { RiWhatsappFill } from "react-icons/ri";
import { MdArrowDownward, MdOutlineTravelExplore } from "react-icons/md";

const images = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"];

export default function Hero() {
    const { isMobile } = useScreen();

    return (
        <main id="hero" className="container mx-auto sm:px-20 px-5 my-10">
            <section className="mx-auto sm:max-w-[70vw]">
                <div className=" flex items-center sm:gap-x-5 gap-x-3">
                    <h1 className="uppercase sm:text-6xl text-2xl font-extrabold whitespace-nowrap">
                        Welcome To
                    </h1>
                    <div
                        style={{
                            backgroundImage: `url("/images/hero/2.jpg")`,
                            backgroundSize: "cover",
                        }}
                        className="sm:h-20 h-8 w-full rounded-md"
                    ></div>
                </div>
                <div className="flex justify-center items-center sm:gap-x-5 gap-x-3 sm:-mt-20">
                    <img
                        src="/Arrow_Right.png"
                        alt="arrow"
                        className="sm:w-full w-[3.5rem] sm:h-[40vh]"
                    />
                    <h1 className="uppercase text-primary sm:text-6xl text-2xl font-extrabold">
                        Siakrabkotabaru
                    </h1>
                </div>
            </section>
            <section className="sm:-mt-10 mt-5 flex sm:flex-row flex-col gap-5 justify-between">
                <div className="flex-1">
                    <p className="max-w-xs sm:text-start text-center mb-3">
                        Jelajahi Potensi KotaBaru: UMKM Berkembang, Wisata
                        Mempesona!
                    </p>
                </div>
                <div className="flex-1 flex justify-center gap-x-3 mb-3">
                    <Scrollink to="services" spy={true} smooth={true}>
                        <Button
                            text={"Scroll"}
                            icon={<MdArrowDownward />}
                            className="h-fit"
                        />
                    </Scrollink>
                    <Link href={route("productUMKM.find")}>
                        <Button
                            variant={"primary"}
                            text={"Explore UMKM"}
                            icon={<MdOutlineTravelExplore />}
                            className="h-fit"
                        />
                    </Link>
                </div>
                <div className="flex-1 flex items-center sm:justify-end justify-center gap-x-5">
                    <a
                        href="https://instagram.com/festivalbudayasaijaan?igshid=NTc4MTIwNjQ2YQ=="
                        target="_blank"
                        className="hover:text-primary duration-300"
                    >
                        <AiFillInstagram size={40} />
                    </a>
                    <a
                        href="wa.me/+6287733204111"
                        target="_blank"
                        className="hover:text-primary duration-300"
                    >
                        <RiWhatsappFill size={40} />
                    </a>
                    <a
                        href="https://instagram.com/festivalbudayasaijaan?igshid=NTc4MTIwNjQ2YQ=="
                        target="_blank"
                        className="hover:text-primary duration-300"
                    >
                        <FaFacebook size={35} />
                    </a>
                </div>
            </section>
            <section className="mt-10 mb-20">
                <Swiper
                    slidesPerView={isMobile ? 1.5 : 3}
                    spaceBetween={20}
                    modules={[Autoplay]}
                    autoplay={{ delay: 1500 }}
                >
                    {images.map((image, i) => (
                        <SwiperSlide key={i}>
                            <img
                                src={`/images/hero/${image}`}
                                alt="Wisata Kotabaru"
                                className="rounded-md sm:h-auto h-[10rem]"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </section>
        </main>
    );
}
