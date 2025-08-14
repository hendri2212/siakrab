import React, { useEffect, useState } from "react";
import { useMultistepForm } from "@/Hooks/useMultistepForm";
import { Head, router, useForm } from "@inertiajs/react";
import { toast } from "react-hot-toast";

import GuestLayout from "@/Layouts/GuestLayout";
import FormDataDiri from "./Partial/FormDataDiri";
import FormDataUsaha from "./Partial/FormDataUsaha";
import FormDataDetail from "./Partial/FormDataDetail";
import Button from "@/Components/Button";
import Loading from "@/Components/Loading";
import { BsArrowRight } from "react-icons/bs";
import { IoLogIn } from "react-icons/io5";

const INITAL_VALUE = {
    nama: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    namaUsaha: "",
    alamatUsaha: "",
    kecamatan: "",
    telepon: "",
    jenisUsaha: "",
    bidangUsaha: "",
    jumlahTenagaKerja: "",
    noIjinUsaha: "",
    noNPWP: "",
};

export default function RegisterUMKM() {
    const { data, setData, post, processing, errors } = useForm(INITAL_VALUE);
    const {
        nama,
        email,
        password,
        passwordConfirmation,
        namaUsaha,
        alamatUsaha,
        kecamatan,
        telepon,
        jenisUsaha,
        bidangUsaha,
        jumlahTenagaKerja,
        noIjinUsaha,
        noNPWP,
    } = data;
    const [fulfilledFormIndex, setFulfilledFormIndex] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    const {
        currentStep,
        currentStepIndex,
        isFirstStep,
        isLastStep,
        goTo,
        nextStep,
    } = useMultistepForm([
        <FormDataDiri
            {...data}
            setData={setData}
            errorMessage={errorMessage}
            errors={errors}
        />,
        <FormDataUsaha {...data} setData={setData} errors={errors} />,
        <FormDataDetail {...data} setData={setData} errors={errors} />,
    ]);

    const stepsHeader = ["Data Diri", "Data Usaha", "Data Detail"];

    function goToStep(index) {
        if (!fulfilledFormIndex.includes(index)) return;
        goTo(index);
    }

    function onSubmit(e) {
        e.preventDefault();

        if (isFirstStep && password !== passwordConfirmation)
            return setErrorMessage("Konfirmasi password tidak sesuai");
        setErrorMessage("");

        if (!fulfilledFormIndex.includes(currentStepIndex))
            setFulfilledFormIndex([...fulfilledFormIndex, currentStepIndex]);

        if (!isLastStep) return nextStep();

        post(route("registerUMKM.store"), {
            onSuccess: () => {
                toast.success("Pendaftaran UMKM Sukses.");
                router.get("/register/umkm/waiting");
            },
            onError: () => {
                if (typeof errors === "object") {
                    Object.values(errors).forEach((error, index) => {
                        toast.error(
                            `Pendaftaran Gagal \n ${index + 1}. ${error}`
                        );
                    });
                } else {
                    // Jika errors bukan objek
                    toast.error("Pendaftaran UMKM Gagal.");
                }
            },
        });
    }

    useEffect(() => {
        const firstFormFulfilled =
            nama != "" &&
            email != "" &&
            password != "" &&
            passwordConfirmation != "";

        const secondFormFulfilled =
            namaUsaha != "" &&
            alamatUsaha != "" &&
            kecamatan != "" &&
            telepon != "" &&
            jenisUsaha != "";

        const thirdFormFulfilled =
            bidangUsaha != "" &&
            jumlahTenagaKerja != "" &&
            noIjinUsaha != "" &&
            noNPWP != "";

        if (firstFormFulfilled) {
            setFulfilledFormIndex((currentIndexs) => [...currentIndexs, 0]);
        } else {
            setFulfilledFormIndex((currentIndexs) =>
                currentIndexs.filter((index) => index !== 0)
            );
        }

        if (secondFormFulfilled) {
            setFulfilledFormIndex((currentIndexs) => [...currentIndexs, 1]);
        } else {
            setFulfilledFormIndex((currentIndexs) =>
                currentIndexs.filter((index) => index !== 1)
            );
        }

        if (thirdFormFulfilled) {
            setFulfilledFormIndex((currentIndexs) => [...currentIndexs, 2]);
        } else {
            setFulfilledFormIndex((currentIndexs) =>
                currentIndexs.filter((index) => index !== 2)
            );
        }
    }, [
        nama,
        email,
        password,
        passwordConfirmation,
        namaUsaha,
        alamatUsaha,
        kecamatan,
        telepon,
        jenisUsaha,
        bidangUsaha,
        jumlahTenagaKerja,
        noIjinUsaha,
        noNPWP,
    ]);

    return (
        <GuestLayout>
            <Head title="Daftar Pelaku Ekonomi Kreatif" />

            <div className="mb-10">
                <h1 className="font-bold text-2xl">Daftar Pelaku Ekonomi Kreatif</h1>
                <p>Bergabunglah bersama kami, wujudkan kesuksesan bersama</p>
            </div>

            <form onSubmit={onSubmit}>
                <section className="mb-10 flex justify-between">
                    {stepsHeader.map((header, i) => (
                        <div key={i} className="flex">
                            <div
                                className="w-fit cursor-pointer"
                                onClick={() => goToStep(i)}
                            >
                                <div
                                    className={`mx-auto rounded-full w-10 h-10 flex justify-center items-center font-semibold ${
                                        currentStepIndex === i &&
                                        !fulfilledFormIndex.includes(i)
                                            ? "bg-black text-white"
                                            : fulfilledFormIndex.includes(i)
                                            ? "bg-primary text-white"
                                            : "bg-gray-200 text-black"
                                    }`}
                                >
                                    {i + 1}
                                </div>
                                <h1 className="text-sm mt-3 text-center sm:whitespace-nowrap">
                                    {header}
                                </h1>
                            </div>

                            {i !== stepsHeader.length - 1 && (
                                <div className="h-[1px] sm:w-[6.5rem] w-[5.5rem] bg-gray-200 mt-5" />
                            )}
                        </div>
                    ))}
                </section>
                <section>{currentStep}</section>
                <div className="w-full mt-5">
                    {processing ? (
                        <Loading />
                    ) : (
                        <Button
                            variant={"primary"}
                            text={!isLastStep ? "Selanjutnya" : "Daftar"}
                            icon={!isLastStep ? <BsArrowRight /> : <IoLogIn />}
                            className="w-full"
                        />
                    )}
                </div>
            </form>
        </GuestLayout>
    );
}
