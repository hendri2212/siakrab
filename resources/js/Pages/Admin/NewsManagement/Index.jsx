import { useState } from "react";
import { useForm } from "@inertiajs/react";
import { EditorState, convertToRaw } from "draft-js";

import AdminLayout from "@/Layouts/AdminLayout";
import Button from "@/Components/Button";
import Modal from "@/Components/Modal";
import Form from "./Partial/Form";
import Loading from "@/Components/Loading";
import { DataTable } from "./Partial/DataTable";
import { BsPlusLg } from "react-icons/bs";
import { FaSave } from "react-icons/fa";
import { toast } from "react-hot-toast";

export default function NewsManagement({ listBerita }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        judul: "",
        konten: "",
        gambar: null,
    });
    const [showModal, setShowModal] = useState(false);
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const contentState = editorState.getCurrentContent();
    const contentStateJSON = JSON.stringify(convertToRaw(contentState));

    function handleEditorStateChange(newEditorState) {
        setEditorState(newEditorState);
        setData("konten", contentStateJSON);
    }

    function handleStore(e) {
        e.preventDefault();

        post(route("news.store"), {
            onSuccess: () => {
                setEditorState(EditorState.createEmpty());
                toast.success("Berhasil membuat berita.");
                setShowModal(false);
            },
            onError: (error) => {
                toast.error("Gagal membuat berita.");
                console.log(error);
            },
        });
    }

    return (
        <AdminLayout
            cta={
                <Button
                    variant={"primary"}
                    text={"Buat Berita"}
                    icon={<BsPlusLg />}
                    onClick={() => {
                        setShowModal((show) => !show);
                        reset();
                    }}
                />
            }
        >
            <DataTable data={listBerita} />

            <Modal show={showModal} onClose={() => setShowModal(false)}>
                <h1 className="font-semibold text-xl mb-10 flex items-center gap-x-3">
                    <BsPlusLg size={25} />
                    <span>Buat Berita</span>
                </h1>
                <form onSubmit={handleStore}>
                    <Form
                        {...data}
                        errors={errors}
                        editorState={editorState}
                        handleEditorStateChange={handleEditorStateChange}
                        setData={setData}
                    />
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
