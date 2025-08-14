import { useState } from "react";
import { useForm } from "@inertiajs/react";
import { toast } from "react-hot-toast";

import Button from "@/Components/Button";
import Modal from "@/Components/Modal";
import SuperAdminLayout from "@/Layouts/SuperAdminLayout";
import Form from "./Partial/Form";
import { DataTable } from "./Partial/DataTable";
import Loading from "@/Components/Loading";
import { FaSave } from "react-icons/fa";
import { BsPlusLg } from "react-icons/bs";

export default function AccountManagement({ listUser }) {
    const [showModal, setShowModal] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        role: "",
    });

    function handleStore(e) {
        e.preventDefault();

        post(route("accountManagement.store"), {
            onSuccess: () => {
                toast.success("Berhasil membuat akun.");
                setShowModal(false);
                reset();
            },
            onError: () => {
                toast.error("Gagal membuat akun baru.");
            },
        });
    }

    return (
        <SuperAdminLayout
            cta={
                <Button
                    variant={"primary"}
                    text={"Buat Akun Baru"}
                    icon={<BsPlusLg />}
                    onClick={() => {
                        setShowModal((show) => !show);
                        reset();
                    }}
                />
            }
        >
            <DataTable data={listUser} />

            <Modal
                show={showModal}
                onClose={() => setShowModal(false)}
                maxWidth="lg"
            >
                <form onSubmit={handleStore}>
                    <h1 className="font-semibold text-xl mb-10 flex items-center gap-x-3">
                        <>
                            <BsPlusLg size={25} />
                            <span>Buat Akun</span>
                        </>
                    </h1>
                    <Form {...data} setData={setData} errors={errors} />
                    <div className="mt-5">
                        {processing ? (
                            <Loading />
                        ) : (
                            <Button
                                variant={"primary"}
                                text={"Simpan"}
                                icon={<FaSave />}
                                className="w-full"
                            />
                        )}
                    </div>
                </form>
            </Modal>
        </SuperAdminLayout>
    );
}
