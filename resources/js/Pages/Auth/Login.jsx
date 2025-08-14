import { useEffect } from "react";
import { Head, Link, useForm } from "@inertiajs/react";

import Checkbox from "@/Components/Checkbox";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import Button from "@/Components/Button";
import Loading from "@/Components/Loading";
import { IoLogIn } from "react-icons/io5";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route("login"));
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    {status}
                </div>
            )}

            <div className="mb-10">
                <h1 className="font-bold text-2xl">Login / Masuk</h1>
                <p>
                    Silakan masuk ke akun Anda untuk mengakses layanan kami.
                    Anda juga dapat mendaftar secara gratis.
                </p>
            </div>

            <form onSubmit={submit} className="flex flex-col gap-y-5">
                <div>
                    <TextInput
                        label="Email"
                        type="email"
                        name="email"
                        value={data.email}
                        placeholder="Email"
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData("email", e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div>
                    <TextInput
                        label="Password"
                        type="password"
                        name="password"
                        value={data.password}
                        placeholder="Password"
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={(e) => setData("password", e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div>
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData("remember", e.target.checked)
                            }
                        />
                        <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                            Remember me
                        </span>
                    </label>
                </div>

                {processing ? (
                    <Loading />
                ) : (
                    <Button
                        variant={"primary"}
                        text={"Login"}
                        icon={<IoLogIn />}
                        className="w-full"
                    />
                )}

                {canResetPassword && (
                    <Link
                        href={route("password.request")}
                        className="ml-auto underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                    >
                        Forgot your password?
                    </Link>
                )}
            </form>
        </GuestLayout>
    );
}
