import { DataTable } from "./Partial/DataTable";
import { useState } from "react";
import { useForm } from "@inertiajs/react";

import AdminLayout from "@/Layouts/AdminLayout";
import Button from "@/Components/Button";
import Modal from "@/Components/Modal";
import Loading from "@/Components/Loading";
import Form from "./Partial/Form";
import { BsPlusLg } from "react-icons/bs";
import { FaSave } from "react-icons/fa";
import { toast } from "react-hot-toast";

export default function AnnouncementsManagement({ listPengumuman }) {
    const [showModal, setShowModal] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        judul: "",
        konten: "",
    });

    function handleStore(e) {
        e.preventDefault();

        post(route("announcement.store"), {
            onSuccess: () => {
                toast.success("Berhasil membuat pengumuman.");
                setShowModal(false);
            },
            onError: (error) => {
                toast.error("Gagal membuat pengumuman.");
                console.log(error);
            },
        });
    }

    return (
        <AdminLayout
            cta={
                <Button
                    variant={"primary"}
                    text={"Pengumuman"}
                    icon={<BsPlusLg />}
                    onClick={() => {
                        setShowModal((show) => !show);
                        reset();
                    }}
                />
            }
        >
            <DataTable data={listPengumuman} />

            <Modal show={showModal} onClose={() => setShowModal(false)}>
                <h1 className="font-semibold text-xl mb-10 flex items-center gap-x-3">
                    <BsPlusLg size={25} />
                    <span>Buat Pengumuman</span>
                </h1>
                <form onSubmit={handleStore}>
                    <Form {...data} errors={errors} setData={setData} />
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
        </AdminLayout>
    );
}
