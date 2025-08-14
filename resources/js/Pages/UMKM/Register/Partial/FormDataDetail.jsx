import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";

export default function FormDataDetail({
    bidangUsaha,
    jumlahTenagaKerja,
    noIjinUsaha,
    noNPWP,
    setData,
    errors,
}) {
    return (
        <div className="flex flex-col gap-y-5">
            <div>
                <TextInput
                    label="Bidang Usaha"
                    placeholder={"Bidang Usaha"}
                    name="bidangUsaha"
                    value={bidangUsaha}
                    required
                    onChange={(e) => setData("bidangUsaha", e.target.value)}
                />
                <InputError message={errors["bidangUsaha"]} />
            </div>
            <div>
                <TextInput
                    type="number"
                    label="Jumlah Tenaga Kerja"
                    placeholder={"Jumlah Tenaga Kerja"}
                    name="jumlahTenagaKerja"
                    value={jumlahTenagaKerja}
                    required
                    onChange={(e) =>
                        setData("jumlahTenagaKerja", e.target.value)
                    }
                />
                <InputError message={errors["jumlahTenagaKerja"]} />
            </div>
            <div>
                <TextInput
                    label="Nomor Ijin Usaha"
                    placeholder={"Nomor Ijin Usaha"}
                    name="noIjinUsaha"
                    value={noIjinUsaha}
                    required
                    onChange={(e) => setData("noIjinUsaha", e.target.value)}
                />
                <InputError message={errors["noIjinUsaha"]} />
            </div>
            <div>
                <TextInput
                    label="Nomor NPWP"
                    placeholder={"Nomor NPWP"}
                    name="noNPWP"
                    value={noNPWP}
                    required
                    onChange={(e) => setData("noNPWP", e.target.value)}
                />
                <InputError message={errors["noNPWP"]} />
            </div>
        </div>
    );
}
