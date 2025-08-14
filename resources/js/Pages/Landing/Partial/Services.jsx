import { useScreen } from "@/Hooks/useScreen";
import { Swiper, SwiperSlide } from "swiper/react";

import { services } from "@/Constants";

export default function Services() {
    const { isMobile } = useScreen();

    return (
        <main id="services" className="container mx-auto sm:px-20 px-5 my-10">
            <header className="w-fit mx-auto text-center mb-10">
                <h1 className="font-extrabold text-4xl">Bersama Menuju Kotabaru Kreatif</h1>
                <p className="text-lg mt-1">Kami siap melayani anda</p>
            </header>
            {!isMobile && (
                <section className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-7">
                    {services.map((service, i) => (
                        <div
                            key={i}
                            className="p-5 rounded-md border hover:bg-dark hover:text-primary duration-300"
                        >
                            {service.icon}
                            <h1 className="mt-8 font-semibold">
                                {service.title}
                            </h1>
                            <p className="mt-1">{service.desc}</p>
                        </div>
                    ))}
                </section>
            )}
            {isMobile && (
                <Swiper slidesPerView={1.3} spaceBetween={10} loop={isMobile}>
                    {services.map((service, i) => (
                        <SwiperSlide key={i}>
                            <div className="p-5 rounded-md border min-h-[20rem] hover:bg-dark hover:text-primary duration-300">
                                {service.icon}
                                <h1 className="mt-8 font-semibold">
                                    {service.title}
                                </h1>
                                <p className="mt-1">{service.desc}</p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </main>
    );
}
