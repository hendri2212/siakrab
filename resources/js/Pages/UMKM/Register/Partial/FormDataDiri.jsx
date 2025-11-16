import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";

export default function FormDataDiri({
    nama,
    email,
    nik,
    foto_ktp,
    password,
    passwordConfirmation,
    setData,
    errorMessage,
    errors,
}) {
    return (
        <div className="flex flex-col gap-y-5">
            <div>
                <TextInput
                    label="Nama Lengkap"
                    placeholder={"Nama Lengkap"}
                    name="nama"
                    value={nama}
                    required
                    onChange={(e) => setData("nama", e.target.value)}
                />
                <InputError message={errors["nama"]} />
            </div>
            <div>
                <TextInput
                    type="email"
                    label="Email"
                    placeholder={"Email"}
                    name="email"
                    value={email}
                    required
                    onChange={(e) => setData("email", e.target.value)}
                />
                <InputError message={errors["email"]} />
            </div>
            <div>
                <TextInput
                    label="NIK (No. KTP)"
                    placeholder={"NIK (No. KTP)"}
                    name="nik"
                    value={nik}
                    required
                    maxLength={16}
                    inputMode="numeric"
                    onChange={(e) => setData("nik", e.target.value)}
                />
                <InputError message={errors["nik"]} />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Foto KTP
                </label>
                <input
                    type="file"
                    name="foto_ktp"
                    accept="image/*"
                    className="block w-full text-sm text-gray-900 dark:text-gray-100
                               file:mr-4 file:py-2 file:px-4 file:rounded-md
                               file:border-0 file:text-sm file:font-semibold
                               file:bg-indigo-50 file:text-indigo-700
                               hover:file:bg-indigo-100"
                    onChange={(e) =>
                        setData("foto_ktp", e.target.files[0] || null)
                    }
                />
                <InputError message={errors["foto_ktp"]} />
            </div>
            <div>
                <TextInput
                    type="password"
                    label="Password"
                    placeholder={"Password"}
                    name="password"
                    value={password}
                    required
                    pattern="^(?=.*[A-Za-z\d]).{8,}$"
                    title="Password 8 karakter dengan setidaknya satu huruf atau angka."
                    onChange={(e) => setData("password", e.target.value)}
                />
                <InputError message={errors["password"]} />
            </div>
            <div>
                <TextInput
                    type="password"
                    label="Konfirmasi Password"
                    placeholder={"Konfirmasi Password"}
                    name="passwordConfirmation"
                    value={passwordConfirmation}
                    required
                    pattern="^(?=.*[A-Za-z\d]).{8,}$"
                    title="Password 8 karakter dengan setidaknya satu huruf atau angka."
                    onChange={(e) =>
                        setData("passwordConfirmation", e.target.value)
                    }
                />
                {errorMessage && <InputError message={errorMessage} />}
            </div>
        </div>
    );
}
