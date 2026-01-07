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
    const handleFileChange = (e) => {
        const file = e.target.files[0] || null;
        setData("foto_ktp", file);
    };

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
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Foto KTP <span className="text-red-500">*</span>
                </label>

                {/* Label-wrapped input - most reliable for Android WebView */}
                <label className="relative block w-full min-h-[56px] cursor-pointer">
                    {/* Actual file input - visible but styled to be invisible, positioned over the button */}
                    <input
                        type="file"
                        name="foto_ktp"
                        accept="image/*"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        style={{ fontSize: '16px' }} // Prevents iOS zoom
                        onChange={handleFileChange}
                    />

                    {/* Visual button layer */}
                    <div className="w-full min-h-[56px] px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg
                                   bg-gray-50 hover:bg-gray-100 active:bg-gray-200
                                   flex items-center justify-center gap-2
                                   text-gray-600 font-medium text-sm
                                   transition-colors duration-200">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {foto_ktp ? "Ganti Foto KTP" : "Pilih Foto KTP"}
                    </div>
                </label>

                {foto_ktp && (
                    <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded-md">
                        <p className="text-sm text-green-700 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            {foto_ktp.name}
                        </p>
                    </div>
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
