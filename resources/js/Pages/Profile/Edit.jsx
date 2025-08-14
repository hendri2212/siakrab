import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import { Head } from "@inertiajs/react";

export default function Edit({ auth, mustVerifyEmail, status, pelakuUMKM }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Profile
                </h2>
            }
        >
            <Head title="Profile" />

            <main className="my-10 grid sm:grid-cols-2 grid-cols-1 gap-5">
                <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 rounded-md border">
                    <UpdateProfileInformationForm
                        auth={auth}
                        mustVerifyEmail={mustVerifyEmail}
                        status={status}
                        pelakuUMKM={pelakuUMKM}
                        className="max-w-xl"
                    />
                </div>

                <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 rounded-md border">
                    <UpdatePasswordForm className="max-w-xl" />
                </div>

                <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 rounded-md border">
                    <DeleteUserForm className="max-w-xl" />
                </div>
            </main>
        </AuthenticatedLayout>
    );
}
