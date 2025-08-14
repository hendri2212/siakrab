import { useScreen } from "@/Hooks/useScreen";

import { FaFacebook, FaInstagram } from "react-icons/fa";
import { MdLocationOn, MdWhatsapp } from "react-icons/md";

export default function Footer() {
    const { isMobile } = useScreen();

    return (
        <footer className="py-10 bg-dark text-white">
            <div className="container mx-auto sm:px-20 px-5">
                <div className="sm:flex gap-20">
                    <img
                        src="/Wonderful_Indonesia_White.png"
                        alt="Wonderful Indonesia"
                        width="300"
                    />
                    <div>
                        <h1 className="font-bold sm:text-4xl text-2xl mb-5 text-primary">
                            Kontak Kami
                        </h1>
                        <ul className="flex sm:flex-row flex-col gap-5">
                            <li>
                                <a
                                    href="https://maps.app.goo.gl/zsNgreKQccMwxoK19"
                                    target="_blank"
                                    className="flex items-center gap-x-3 sm:text-2xl text-lg hover:text-primary duration-300"
                                >
                                    <MdLocationOn size={20} />
                                    <span>Lokasi</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://wa.me/+6287833539490"
                                    target="_blank"
                                    className="flex items-center gap-x-3 sm:text-2xl text-lg hover:text-primary duration-300"
                                >
                                    <MdWhatsapp size={20} />
                                    <span>Whatsapp</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.instagram.com/siakrab_ktb/"
                                    target="_blank"
                                    className="flex items-center gap-x-3 sm:text-2xl text-lg hover:text-primary duration-300"
                                >
                                    <FaInstagram size={20} />
                                    <span>Instagram</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.facebook.com/profile.php?id=100089457410389"
                                    target="_blank"
                                    className="flex items-center gap-x-3 sm:text-2xl text-lg hover:text-primary duration-300"
                                >
                                    <FaFacebook size={20} />
                                    <span>Facebook</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <hr className="my-10" />
                <div>
                    <p className={`text-center ${isMobile ? "text-xs" : ""}`}>
                        Situs ini merupakan situs resmi Kementerian dan Ekonomi
                        Kreatif Kotabaru. Semua isi yang tercantum di dalam
                        situs ini bertujuan untuk memberikan informasi dan
                        sebagai tujuan pengembangan berbagai sektor untuk Menuju Kotabaru Kreatif.
                        Penjualan yang ditampilkan merupakan tanda kemitraan
                        yang akan menghubungkan Anda kepada Mitra Kami.
                    </p>
                </div>
            </div>
        </footer>
    );
}
