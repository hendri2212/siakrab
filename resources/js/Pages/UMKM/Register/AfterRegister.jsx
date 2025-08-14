import { useCallback } from "react";
import Particles from "react-particles";
import { loadFull } from "tsparticles";
import { particleConfetti } from "@/Utils/particle-config";

import Button from "@/Components/Button";
import { Head, Link } from "@inertiajs/react";
import { GoHomeFill } from "react-icons/go";

export default function AfterRegisterUMKM() {
    const particlesInit = useCallback(async (engine) => {
        await loadFull(engine);
    }, []);

    const particlesLoaded = useCallback(async () => {
        // await console.log(container);
    }, []);

    return (
        <>
            <Head title="Pendaftaran Berhasil" />
            <Particles
                id="tsparticles"
                init={particlesInit}
                loaded={particlesLoaded}
                options={particleConfetti}
            />
            <main className="sm:w-auto w-full absolute z-[99] top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                <div className="lg:w-[40vw] sm:w-[60vw] sm:h-[75vh] w-full h-screen">
                    <div className="w-full sm:p-10 p-7 sm:shadow-md">
                        <div>
                            <img
                                src="/images/guest/4.svg"
                                alt="pendaftaran sukses"
                                width="100"
                                className="mx-auto"
                            />
                            <h1 className="font-semibold text-xl text-center mt-10 mb-5">
                                Menunggu Verifikasi Admin
                            </h1>
                            <p className="text-sm">
                                Selamat datang di Siakrabkotabaru! Terima kasih
                                telah mendaftar sebagai anggota komunitas UMKM
                                kami. Kami sangat menghargai keputusan Anda
                                untuk bergabung. Saat ini, akun Anda telah
                                berhasil dibuat. <br />
                                <br />
                                Namun, sebelum Anda dapat sepenuhnya
                                mengeksplorasi website kami, kami ingin
                                memberitahukan bahwa setiap akun yang baru
                                didaftarkan perlu melewati proses persetujuan
                                oleh admin kami. Proses ini biasanya memerlukan
                                waktu singkat, dan kami berusaha secepat mungkin
                                untuk menyelesaikannya.
                            </p>
                            <div className="sm:w-fit mx-auto mt-10">
                                <Link href="/">
                                    <Button
                                        variant={"primary"}
                                        text={"Beranda"}
                                        icon={<GoHomeFill />}
                                        className="sm:w-auto w-full"
                                    />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
