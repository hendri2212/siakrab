import { useEffect, useRef, useState, useCallback } from "react";
import { Head, Link } from "@inertiajs/react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import { Link as ScrollLink } from "react-scroll";
import Particles from "react-particles";
import { loadFull } from "tsparticles";
import { options } from "@/utils/particle-config";

import Button from "@/Components/Button";
import Navbar from "@/Components/Navbar";

import { MdOutlineTravelExplore } from "react-icons/md";
import { FaChevronLeft, FaChevronRight, FaFacebook } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { RiWhatsappFill } from "react-icons/ri";

import Hero from "./Partial/Hero";
import Services from "./Partial/Services";
import Products from "./Partial/Products";
import News from "./Partial/News";
import Announcements from "./Partial/Announcements";
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

    const particlesInit = useCallback(async (engine) => {
        await loadFull(engine);
    }, []);

    const particlesLoaded = useCallback(async () => {
        // await console.log(container);
    }, []);

    return (
        <>
            <div className="fixed inset-0 -z-10">
                <Particles
                    id="tsparticles"
                    init={particlesInit}
                    loaded={particlesLoaded}
                    options={options}
                />
            </div>

            <Head title="Welcome" />

            <Navbar auth={auth} />
            <Hero />
            <Services />
            <Products
                listProdukUMKM={listProdukUMKM}
                queryKategori={queryKategori}
            />
            <News listBerita={listBerita} />
            <Announcements listPengumuman={listPengumuman} />
            <Footer />
        </>
    );
}
