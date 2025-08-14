import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { formatPhone } from "@/Utils/formatPhone";

import Button from "@/Components/Button";
import Navbar from "@/Components/Navbar";
import { formatRupiah } from "@/Utils/formatRupiah";
import { Head, Link } from "@inertiajs/react";
import { IoLogoWhatsapp } from "react-icons/io5";
import { MdLocationOn, MdVerified } from "react-icons/md";
import { BsArrowLeft } from "react-icons/bs";
import { useState } from "react";

export default function ProductDetail({ auth, productDetail }) {
    const images = productDetail && JSON.parse(productDetail.images);
    const [hoveredImage, setHoveredImage] = useState(null);

    return (
        <>
            <Head title={productDetail?.nama} />

            <Navbar auth={auth} />

            {/* <header
                className="pt-14 pb-14 relative bg-dark text-white p-5"
                // style={{
                //     backgroundImage: `url("/images/hero/2.jpg")`,
                //     backgroundSize: "cover",
                // }}
            >
                <div className="absolute inset-0 bg-black/20" />
                <div className="relative container mx-auto md:px-5 sm:px-20 text-center">
                    <h1 className="sm:text-4xl text-2xl font-bold">
                        {productDetail.pelaku_umkm.user.name}
                    </h1>
                    <p className="mb-3">(Pemilik Usaha)</p>
                    <div className="w-fit mx-auto flex items-center gap-x-3 text-xl">
                        <MdVerified className="text-primary" />
                        {productDetail.pelaku_umkm.nama_usaha}
                    </div>
                </div>
            </header> */}
            <main className="container mx-auto sm:px-20 px-5 mb-10">
                <div className="my-3">
                    <Link
                        href={route("productUMKM.find")}
                        className="flex items-center gap-x-3 group"
                    >
                        <BsArrowLeft
                            size={20}
                            className="group-hover:-translate-x-1 duration-300"
                        />
                        <span>Kembali</span>
                    </Link>
                </div>

                <section className="flex sm:flex-row flex-col sm:gap-10 gap-5">
                    <div className="sm:w-[50vw] w-full sm:h-fit">
                        {hoveredImage ? (
                            <img
                                src={`/images/uploads/products/${hoveredImage}`}
                                alt={hoveredImage}
                                className="rounded-md w-full sm:h-[50vh] h-[30vh]"
                            />
                        ) : (
                            <img
                                src={`/images/uploads/products/${productDetail?.thumbnail}`}
                                alt={productDetail?.nama}
                                className="rounded-md w-full sm:h-[50vh] h-[30vh]"
                            />
                        )}

                        <div className="mt-3 sm:w-[40vw]">
                            <Swiper
                                slidesPerView={3}
                                direction="horizontal"
                                spaceBetween={10}
                                modules={[Autoplay]}
                                autoplay
                            >
                                {images &&
                                    images.length > 0 &&
                                    images.map((image, i) => (
                                        <SwiperSlide key={i}>
                                            <div>
                                                <img
                                                    src={`/images/uploads/products/${image}`}
                                                    alt={image}
                                                    className="w-full sm:h-[8rem] h-[5rem] rounded-md cursor-pointer border-2 border-transparent hover:border-primary"
                                                    onMouseEnter={() =>
                                                        setHoveredImage(image)
                                                    }
                                                    onMouseLeave={() =>
                                                        setHoveredImage(null)
                                                    }
                                                />
                                            </div>
                                        </SwiperSlide>
                                    ))}
                            </Swiper>
                        </div>
                    </div>
                    <div className="sm:w-[60vw] w-full h-fit border rounded-md p-5">
                        <div className="mb-5 font-semibold flex sm:flex-row flex-col sm:items-center items-start gap-3">
                            <span className="h-fit w-fit rounded-md py-0.5 px-3 bg-dark text-white">
                                {productDetail?.kategori}
                            </span>
                            <span className="sm:text-2xl text-xl">
                                {productDetail?.nama}
                            </span>
                        </div>
                        <div>
                            {productDetail?.harga_fix !== "" &&
                            productDetail?.harga_fix !== null ? (
                                <span className="font-semibold sm:text-4xl text-2xl">
                                    {formatRupiah(productDetail?.harga_fix)}
                                </span>
                            ) : (
                                <span className="font-semibold sm:text-4xl text-2xl">
                                    {formatRupiah(productDetail?.harga_start)}-
                                    {formatRupiah(productDetail?.harga_end)}
                                </span>
                            )}
                        </div>

                        <div className="mt-3 flex items-center gap-x-3 text-xl">
                            <MdVerified className="text-primary" />
                            {productDetail?.pelaku_umkm.nama_usaha}
                        </div>
                        <div className="font-light mt-3">
                            {productDetail?.deskripsi}
                        </div>

                        <div className="mt-5 flex items-center gap-x-3">
                            <a
                                href={`https://wa.me/${formatPhone(
                                    productDetail?.pelaku_umkm.telepon
                                )}?text=Halo saya tertarik dengan produk ${
                                    productDetail?.nama
                                }.`}
                                target="_blank"
                            >
                                <Button
                                    text={"Whatsapp"}
                                    icon={<IoLogoWhatsapp size={20} />}
                                />
                            </a>
                            <h1 className="font-semibold">
                                {productDetail?.pelaku_umkm.user.name}
                            </h1>
                        </div>
                        <div className="mt-10 text-xl text-label">
                            <div className="flex items-center gap-x-3 mb-2">
                                <MdLocationOn size={20} />
                                <p>{productDetail?.pelaku_umkm.alamat_usaha}</p>
                            </div>
                            <span className="py-1 px-2 text-sm bg-gray-100 rounded-md text-black">
                                Kec.{productDetail?.pelaku_umkm.kecamatan}
                            </span>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
