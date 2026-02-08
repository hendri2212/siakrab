import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import { Head, useForm, Link } from "@inertiajs/react";
import Button from "@/Components/Button";
import Loading from "@/Components/Loading";

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("password.email"));
    };

    return (
        <div className="mx-auto w-full max-w-[420px] px-4">
            <Head title="Forgot Password" />

            {status && (
                <div className="mb-4 font-medium text-sm text-green-600 dark:text-green-400">
                    {status}
                </div>
            )}

            <div className="my-3">
                <h1 className="font-bold text-2xl">Lupa Password</h1>
                <p>
                    Masukkan alamat email anda yang terdaftar untuk melakukan reset
                    password.
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
                        isFocused={true}
                        onChange={(e) => setData("email", e.target.value)}
                        placeholder="Email"
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                {processing ? (
                    <Loading />
                ) : (
                    <Button
                        variant={"primary"}
                        text={"Email Password Reset Link"}
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
