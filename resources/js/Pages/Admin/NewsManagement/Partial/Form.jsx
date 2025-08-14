import { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import { TbArrowsExchange2 } from "react-icons/tb";
import { BsPlusLg } from "react-icons/bs";

export default function Form({
    judul,
    errors,
    setData,
    editorState,
    handleEditorStateChange,
    news,
}) {
    const [image, setImage] = useState(null);
    const [imageName, setImageName] = useState("");

    function handleImageUpload(e) {
        const file = e.target.files[0];
        setData("gambar", file);

        if (file) {
            const reader = new FileReader();

            reader.onload = (e) => {
                setImage(e.target.result);
            };

            reader.readAsDataURL(file);
            setImageName(file.name);
        }
    }

    return (
        <div className="w-full flex flex-col gap-y-7">
            <div>
                <TextInput
                    label="Judul Berita"
                    placeholder="Judul Berita"
                    onChange={(e) => setData("judul", e.target.value)}
                    value={judul}
                />
                <InputError message={errors["judul"]} />
            </div>
            <div>
                <label className="text-label text-sm font-normal">Konten</label>
                <div className="border border-gray-300 p-2 rounded-md">
                    <Editor
                        editorState={editorState}
                        onEditorStateChange={handleEditorStateChange}
                    />
                </div>
                <InputError message={errors["konten"]} />
            </div>
            <div>
                <label>
                    <div className="rounded-md border border-dashed border-gray-300 h-[4rem] w-full flex justify-center items-center cursor-pointer hover:bg-gray-50 duration-300">
                        <div className="flex items-center gap-x-3 text-gray-500">
                            {image || news?.gambar !== null ? (
                                <TbArrowsExchange2 />
                            ) : (
                                <BsPlusLg />
                            )}
                            <span>
                                {image || news?.gambar !== null
                                    ? "Ganti"
                                    : "Upload"}{" "}
                                Gambar (Thumbnail)
                            </span>
                        </div>
                    </div>
                    <input type="file" hidden onChange={handleImageUpload} />
                </label>
                <InputError message={errors["gambar"]} />

                {image ? (
                    <div className="p-3 border rounded-md mt-3">
                        <div className="h-[5rem] flex gap-x-5">
                            <div>
                                <img
                                    src={image}
                                    alt="Preview"
                                    className="h-full"
                                />
                            </div>
                            <p className="text-gray-500">{imageName}</p>
                        </div>
                    </div>
                ) : (
                    <>
                        {news?.gambar && (
                            <div className="p-3 border rounded-md mt-3">
                                <div className="h-[5rem] flex gap-x-5">
                                    <div>
                                        <img
                                            src={`/images/uploads/news/${news.gambar}`}
                                            alt="Preview"
                                            className="h-full"
                                        />
                                    </div>
                                    <p className="text-gray-500">
                                        {news.gambar}
                                    </p>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
