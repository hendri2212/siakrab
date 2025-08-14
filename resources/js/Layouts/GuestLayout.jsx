import { Link, usePage } from "@inertiajs/react";

import ApplicationLogo from "@/Components/ApplicationLogo";
import { BsArrowLeft } from "react-icons/bs";

export default function Guest({ children }) {
    const { url } = usePage();

    return (
        // <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100 dark:bg-gray-900">
        //     <div>
        //         <Link href="/">
        //             <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
        //         </Link>
        //     </div>

        //     <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white dark:bg-gray-800 shadow-md overflow-hidden sm:rounded-lg">
        //         {children}
        //     </div>
        // </div>

        <main className="h-screen">
            <div className="flex">
                <section className="hidden w-[60%] h-screen relative bg-dark sm:flex justify-center items-center">
                    <div
                        style={{
                            backgroundImage: `url("/images/hero/1.jpg")`,
                            backgroundSize: "cover",
                        }}
                        className="absolute inset-0 brightness-50"
                    />

                    <div className="absolute top-10 left-10 z-10 text-white">
                        <Link
                            href="/"
                            className="flex items-center gap-x-2 group"
                        >
                            <BsArrowLeft
                                size={20}
                                className="group-hover:-translate-x-2 duration-300"
                            />
                            <span>Kembali</span>
                        </Link>
                    </div>

                    <div className="absolute bottom-10 left-10 right-10 z-10 text-white">
                        <div className="relative p-10">
                            <div className="absolute inset-0 bg-white/10 rounded-md" />
                            <h1 className="text-4xl font-bold mb-3">
                                Siakrabkotabaru
                            </h1>
                            <p>
                                Sebuah sistem informasi yang didedikasikan untuk
                                mendorong kemajuan Kotabaru dengan mempercepat
                                perkembangan Ekonomi Kreatif.
                            </p>
                        </div>
                    </div>

                    {/* {url.startsWith("/register") ? (
                        <img
                            src="/images/guest/register.svg"
                            alt="register"
                            width="400"
                        />
                    ) : (
                        <img
                            src="/images/guest/login.svg"
                            alt="login"
                            width="400"
                        />
                    )} */}
                </section>
                <section className="sm:w-[40%] w-full h-screen py-10 sm:px-20 px-5">
                    <Link
                        href="/"
                        className="sm:hidden flex items-center gap-x-2 group mb-5"
                    >
                        <BsArrowLeft
                            size={20}
                            className="group-hover:-translate-x-2 duration-300"
                        />
                        <span>Kembali</span>
                    </Link>

                    {url.startsWith("/register") ? (
                        // <img
                        //     src="/images/guest/register.svg"
                        //     alt="register"
                        //     width="100"
                        //     className="mx-auto mb-10"
                        // />
                        ""
                    ) : (
                        <img
                            src="/images/guest/login.svg"
                            alt="login"
                            width="200"
                            className="mx-auto mb-10"
                        />
                    )}
                    {children}
                </section>
            </div>
        </main>
    );
}
