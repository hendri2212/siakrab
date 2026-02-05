import { useState } from "react";
import { useForm } from "@inertiajs/react";

import MyButton from "@/Components/Button";
import Modal from "@/Components/Modal";
import Form from "./Form";
import Loading from "@/Components/Loading";
import { FaEdit, FaSave, FaTrash } from "react-icons/fa";
import { IoIosWarning } from "react-icons/io";
import { BiBlock } from "react-icons/bi";
import { toast } from "react-hot-toast";

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
    const user = row.original;

    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        role: "",
    });
    const [showModal, setShowModal] = useState(false);
    const [action, setAction] = useState("");

    function handleEdit() {
        setShowModal(true);
        setData({
            name: user.name,
            email: user.email,
            password: "",
            role: user.role,
        });
        setAction("update");
    }

    function handleUpdate(e) {
        e.preventDefault();

        post(route("accountManagement.update", user.id), {
            onSuccess: () => {
                toast.success("Berhasil mengupdate akun.");
                setShowModal(false);
                reset();
            },
            onError: () => {
                toast.error("Gagal mengupdate baru.");
            },
        });
    }

    function handleDelete() {
        setData("email", user.email);
        setShowModal(true);
        setAction("delete");
    }

    function handleConfirmDelete() {
        post(route("accountManagement.delete", user.id), {
            onSuccess: () => {
                toast.success("Berhasil menghapus akun.");
                setShowModal(false);
                reset();
            },
            onError: () => {
                toast.error("Gagal menghapus akun.");
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
                    <DropdownMenuItem
                        onClick={() =>
                            navigator.clipboard.writeText(user.email)
                        }
                    >
                        Copy email
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleEdit}>
                        Edit Data
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleDelete}>
                        Delete Data
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <Modal
                show={showModal}
                onClose={() => setShowModal(false)}
                maxWidth="lg"
            >
                <form onSubmit={handleUpdate}>
                    {action === "update" && (
                        <>
                            <h1 className="font-semibold text-xl mb-10 flex items-center gap-x-3">
                                <FaEdit size={25} />
                                <span>Edit Akun</span>
                            </h1>
                            <Form
                                {...data}
                                setData={setData}
                                errors={errors}
                                passwordRequired={false}
                            />
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
                        </>
                    )}

                    {action === "delete" && (
                        <>
                            <div className="mb-10">
                                <h1 className="font-semibold text-xl flex items-center gap-x-3">
                                    <IoIosWarning size={25} />
                                    <span>Hapus Akun</span>
                                </h1>
                                <p className="mt-3">
                                    Konfirmasi hapus akun{" "}
                                    <span className="text-primary">
                                        {data.email}
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
                </form>
            </Modal>
        </>
    );
}
