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
import { MdClose } from "react-icons/md";
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
                    text={"Berita"}
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
                {/* Header fixed */}
                <div className="flex-shrink-0 bg-white z-10">
                    <div className="flex items-center justify-between px-4 py-3 border-b">
                        <h1 className="font-semibold text-base flex items-center gap-x-2">
                            <BsPlusLg size={16} />
                            <span>Buat Berita</span>
                        </h1>
                        <button
                            type="button"
                            onClick={() => setShowModal(false)}
                            aria-label="Tutup"
                            className="p-2 -mr-2"
                        >
                            <MdClose size={20} />
                        </button>
                    </div>
                </div>
                <form onSubmit={handleStore} className="flex-1 overflow-y-auto px-4 py-4">
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
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold py-3 rounded-lg shadow-md hover:from-blue-600 hover:to-indigo-600 active:scale-95 transition"
                            >
                                <FaSave />
                                Simpan
                            </button>
                        )}
                    </div>
                </form>
            </Modal>
        </AdminLayout>
    );
}
