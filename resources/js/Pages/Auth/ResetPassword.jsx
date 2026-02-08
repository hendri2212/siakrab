import { useEffect } from "react";
import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import { Head, useForm, Link } from "@inertiajs/react";
import Loading from "@/Components/Loading";
import Button from "@/Components/Button";

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: "",
        password_confirmation: "",
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route("password.store"));
    };

    return (
        <div className="mx-auto w-full max-w-[420px] px-4">
            <Head title="Reset Password" />

            <div className="my-3">
                <h1 className="font-bold text-2xl">Reset Password</h1>
                <p>
                    Masukkan password baru anda untuk mengatur ulang password akun.
                </p>
            </div>

            <form onSubmit={submit} className="flex flex-col gap-y-5">
                <div>
                    <TextInput
                        label="Email"
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="block w-full rounded-xl"
                        autoComplete="username"
                        onChange={(e) => setData("email", e.target.value)}
                        placeholder="Email"
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div>
                    <TextInput
                        label="Password Baru"
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="block w-full rounded-xl"
                        autoComplete="new-password"
                        isFocused={true}
                        onChange={(e) => setData("password", e.target.value)}
                        placeholder="Password Baru"
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div>
                    <TextInput
                        label="Konfirmasi Password"
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="block w-full rounded-xl"
                        autoComplete="new-password"
                        onChange={(e) =>
                            setData("password_confirmation", e.target.value)
                        }
                        placeholder="Konfirmasi Password"
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                {processing ? (
                    <Loading />
                ) : (
                    <Button
                        variant={"primary"}
                        text={"Reset Password"}
                        className="w-full rounded-xl"
                    />
                )}

                <div className="flex justify-end">
                    <Link
                        href={route("login")}
                        className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                    >
                        Kembali ke Login
                    </Link>
                </div>
            </form>
        </div>
    );
}

