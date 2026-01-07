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
                    Foto KTP <span className="text-red-500">*</span>
                </label>
                <label className="block w-full cursor-pointer">
                    <input
                        type="file"
                        name="foto_ktp"
                        accept="image/jpeg,image/jpg,image/png"
                        capture="environment"
                        className="block w-full text-sm text-gray-900 dark:text-gray-100
                                   cursor-pointer min-h-[48px] py-3
                                   file:mr-4 file:py-3 file:px-4 file:rounded-md
                                   file:border-0 file:text-sm file:font-semibold
                                   file:bg-indigo-50 file:text-indigo-700 file:cursor-pointer
                                   hover:file:bg-indigo-100 active:file:bg-indigo-200"
                        onChange={(e) =>
                            setData("foto_ktp", e.target.files[0] || null)
                        }
                    />
                </label>
                {foto_ktp && (
                    <p className="text-xs text-green-600 mt-1">
                        File terpilih: {foto_ktp.name}
                    </p>
                )}
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
