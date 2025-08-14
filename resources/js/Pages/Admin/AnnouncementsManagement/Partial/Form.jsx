import InputError from "@/Components/InputError";
import TextArea from "@/Components/TextArea";
import TextInput from "@/Components/TextInput";

export default function Form({ judul, konten, setData, errors }) {
    return (
        <div className="w-full flex flex-col gap-y-7">
            <div>
                <TextInput
                    label="Judul Pengumuman"
                    placeholder="Judul Pengumuman"
                    onChange={(e) => setData("judul", e.target.value)}
                    value={judul}
                />
                <InputError message={errors["judul"]} />
            </div>
            <div>
                <TextArea
                    label="Isi Pengumuman"
                    placeholder="Isi Pengumuman"
                    onChange={(e) => setData("konten", e.target.value)}
                    value={konten}
                />
                <InputError message={errors["konten"]} />
            </div>
        </div>
    );
}
