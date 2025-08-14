import { useState } from "react";
import { useForm } from "@inertiajs/react";
import { toast } from "react-hot-toast";

import MyButton from "@/Components/Button";
import Modal from "@/Components/Modal";
import Form from "./Form";
import Loading from "@/Components/Loading";
import { FaEdit, FaSave, FaTrash } from "react-icons/fa";
import { IoIosWarning } from "react-icons/io";
import { BiBlock } from "react-icons/bi";

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
    const announcement = row.original;

    const { data, setData, post, processing, errors, reset } = useForm({
        judul: "",
        konten: "",
        gambar: null,
    });
    const [showModal, setShowModal] = useState(false);
    const [action, setAction] = useState("");

    function handleEditorStateChange(newEditorState) {
        setEditorState(newEditorState);
        setData("konten", contentStateJSON);
    }

    function handleEdit() {
        setAction("update");
        setShowModal(true);
        setData({ judul: announcement.judul, konten: announcement.konten });
    }

    function handleUpdate(e) {
        e.preventDefault();

        post(route("announcement.update", announcement.id), {
            onSuccess: () => {
                toast.success("Berhasil mengupdate pengumuman.");
                setShowModal(false);
                reset();
            },
            onError: (error) => {
                toast.error("Gagal mengupdate pengumuman.");
                console.log(error);
            },
        });
    }

    function handleDelete() {
        setAction("delete");
        setShowModal(true);
    }

    function handleConfirmDelete() {
        post(route("announcement.delete", announcement.id), {
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
                        <h1 className="font-semibold text-xl mb-10 flex items-center gap-x-3">
                            <FaEdit size={25} />
                            <span>Edit Berita</span>
                        </h1>
                        <form onSubmit={handleUpdate}>
                            <Form {...data} errors={errors} setData={setData} />
                            <div className="mt-5">
                                {processing ? (
                                    <Loading />
                                ) : (
                                    <MyButton
                                        variant={"primary"}
                                        text={"Simpan"}
                                        icon={<FaSave />}
                                        className="w-full"
                                    />
                                )}
                            </div>
                        </form>
                    </>
                )}

                {action === "delete" && (
                    <>
                        <div className="mb-10">
                            <h1 className="font-semibold text-xl flex items-center gap-x-3">
                                <IoIosWarning size={25} />
                                <span>Hapus Berita</span>
                            </h1>
                            <p className="mt-3">
                                Konfirmasi hapus berita{" "}
                                <span className="text-primary">
                                    {announcement.judul}
                                </span>
                                ?
                            </p>
                        </div>
                        <div className="flex gap-x-3 mt-10">
                            {processing ? (
                                <Loading />
                            ) : (
                                <>
                                    <MyButton
                                        type={"button"}
                                        text={"Batal"}
                                        icon={<BiBlock />}
                                        className="w-full border hover:bg-gray-100"
                                        onClick={() => setShowModal(false)}
                                    />
                                    <MyButton
                                        type={"button"}
                                        variant={"primary"}
                                        text={"Hapus"}
                                        icon={<FaTrash />}
                                        className="w-full"
                                        onClick={handleConfirmDelete}
                                    />
                                </>
                            )}
                        </div>
                    </>
                )}
            </Modal>
        </>
    );
}
