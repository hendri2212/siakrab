import { useState } from "react";
import { useForm } from "@inertiajs/react";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import { toast } from "react-hot-toast";

import MyButton from "@/Components/Button";
import Modal from "@/Components/Modal";
import Form from "./Form";
import Loading from "@/Components/Loading";
import { FaEdit, FaSave, FaTrash } from "react-icons/fa";
import { IoIosWarning } from "react-icons/io";
import { BiBlock } from "react-icons/bi";
import { MdClose } from "react-icons/md";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function RowActions({ row }) {
    const news = row.original;

    const { data, setData, post, processing, errors, reset } = useForm({
        judul: "",
        konten: "",
        gambar: null,
    });
    const [showModal, setShowModal] = useState(false);
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [action, setAction] = useState("");

    const contentState = editorState.getCurrentContent();
    const contentStateJSON = JSON.stringify(convertToRaw(contentState));

    function handleEditorStateChange(newEditorState) {
        setEditorState(newEditorState);
        setData("konten", contentStateJSON);
    }

    function handleEdit() {
        setAction("update");
        setShowModal(true);
        setData({ judul: news.judul });

        const parsedContentState = JSON.parse(news.konten);
        const contentState = convertFromRaw(parsedContentState);
        setEditorState(EditorState.createWithContent(contentState));
    }

    function handleUpdate(e) {
        e.preventDefault();

        post(route("news.update", news.id), {
            onSuccess: () => {
                toast.success("Berhasil mengupdate data berita.");
                setShowModal(false);
                reset();
            },
            onError: (error) => {
                toast.error("Gagal mengupdate data berita.");
                console.log(error);
            },
        });
    }

    function handleDelete() {
        setAction("delete");
        setShowModal(true);
    }

    function handleConfirmDelete() {
        post(route("news.delete", news.id), {
            onSuccess: () => {
                toast.success("Berhasil menghapus berita.");
                setShowModal(false);
            },
            onError: (error) => {
                toast.error("Gagal menghapus berita.");
                console.log(error);
            },
        });
    }

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    {/* <DropdownMenuItem>Detail</DropdownMenuItem> */}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleEdit}>
                        Edit Data
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleDelete}>
                        Delete Data
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <Modal show={showModal} onClose={() => setShowModal(false)}>
                {action === "update" && (
                    <>
                        {/* Header fixed */}
                        <div className="flex-shrink-0 bg-white z-10">
                            <div className="flex items-center justify-between px-4 py-3 border-b">
                                <h1 className="font-semibold text-base flex items-center gap-x-2">
                                    <FaEdit size={18} />
                                    <span>Edit Berita</span>
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
                        <form onSubmit={handleUpdate} className="flex-1 overflow-y-auto px-4 py-4">
                            <Form
                                {...data}
                                errors={errors}
                                editorState={editorState}
                                handleEditorStateChange={
                                    handleEditorStateChange
                                }
                                setData={setData}
                                news={news}
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
                    </>
                )}

                {action === "delete" && (
                    <>
                        {/* Header fixed */}
                        <div className="flex-shrink-0 bg-white z-10">
                            <div className="flex items-center justify-between px-4 py-3 border-b">
                                <h1 className="font-semibold text-base flex items-center gap-x-2">
                                    <IoIosWarning size={18} className="text-red-500" />
                                    <span>Hapus Berita</span>
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

                        {/* Body */}
                        <div className="px-4 py-4">
                            <p>
                                Apakah Anda yakin ingin menghapus berita{" "}
                                <span className="font-semibold text-primary">
                                    {news.judul}
                                </span>
                                ?
                            </p>

                            <div className="flex gap-x-3 mt-6">
                                {processing ? (
                                    <Loading />
                                ) : (
                                    <>
                                        <button
                                            type="button"
                                            onClick={() => setShowModal(false)}
                                            className="w-full flex items-center justify-center gap-2 border border-gray-300 text-gray-700 font-semibold py-3 rounded-lg hover:bg-gray-100 active:scale-95 transition"
                                        >
                                            <BiBlock />
                                            Batal
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleConfirmDelete}
                                            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold py-3 rounded-lg shadow-md hover:from-red-600 hover:to-red-700 active:scale-95 transition"
                                        >
                                            <FaTrash />
                                            Hapus
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </>
                )}
            </Modal>
        </>
    );
}
