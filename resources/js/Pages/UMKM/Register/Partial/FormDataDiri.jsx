import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";

export default function FormDataDiri({
    nama,
    email,
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
