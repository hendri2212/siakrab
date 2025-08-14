import { useRef, useState } from "react";
import DangerButton from "@/Components/DangerButton";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import Button from "@/Components/Button";
import { FaTrash } from "react-icons/fa";
import { BiBlock } from "react-icons/bi";
import Loading from "@/Components/Loading";

export default function DeleteUserForm({ className = "" }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        password: "",
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route("profile.destroy"), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Delete Account
                </h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Once your account is deleted, all of its resources and data
                    will be permanently deleted. Before deleting your account,
                    please download any data or information that you wish to
                    retain.
                </p>
            </header>

            <Button
                text={"Hapus Akun"}
                icon={<FaTrash />}
                onClick={confirmUserDeletion}
                className="border-red-500 bg-red-500 text-white"
            />
            {/* <DangerButton onClick={confirmUserDeletion}>
                Delete Account
            </DangerButton> */}

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        Are you sure you want to delete your account?
                    </h2>

                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Once your account is deleted, all of its resources and
                        data will be permanently deleted. Please enter your
                        password to confirm you would like to permanently delete
                        your account.
                    </p>

                    <div className="mt-6">
                        {/* <InputLabel
                            htmlFor="password"
                            value="Password"
                            className="sr-only"
                        /> */}

                        <TextInput
                            id="password"
                            label="Password"
                            placeholder="Password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            className="mt-1 block w-3/4"
                            isFocused
                        />

                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-10 flex gap-x-3">
                        {processing ? (
                            <Loading />
                        ) : (
                            <>
                                <Button
                                    type={"button"}
                                    text={"Batal"}
                                    icon={<BiBlock />}
                                    className="w-full border hover:bg-gray-100"
                                    onClick={closeModal}
                                />
                                <Button
                                    type={"submit"}
                                    text={"Hapus Akun"}
                                    icon={<FaTrash />}
                                    className="w-full border-red-500 bg-red-500 text-white"
                                />
                            </>
                        )}
                        {/* <SecondaryButton onClick={closeModal}>
                            Cancel
                        </SecondaryButton>

                        <DangerButton className="ml-3" disabled={processing}>
                            Delete Account
                        </DangerButton> */}
                    </div>
                </form>
            </Modal>
        </section>
    );
}
