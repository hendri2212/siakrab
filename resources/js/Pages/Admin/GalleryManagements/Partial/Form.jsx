import { useState } from "react";

import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import { TbArrowsExchange2 } from "react-icons/tb";
import { BsPlusLg } from "react-icons/bs";

export default function Form({ nama, setData, errors, gallery }) {
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
                    label="Nama Galeri"
                    placeholder="Nama Galeri"
                    onChange={(e) => setData("nama", e.target.value)}
                    value={nama}
                />
                <InputError message={errors["nama"]} />
            </div>
            <div>
                <label>
                    <div className="rounded-md border border-dashed border-gray-300 h-[4rem] w-full flex justify-center items-center cursor-pointer hover:bg-gray-50 duration-300">
                        <div>
                            {image !== null ? (
                                <div className="flex items-center gap-x-3 text-gray-500">
                                    <TbArrowsExchange2 />
                                    <span>Ganti Gambar</span>
                                </div>
                            ) : gallery !== undefined &&
                              gallery?.gambar !== null ? (
                                <div className="flex items-center gap-x-3 text-gray-500">
                                    <TbArrowsExchange2 />
                                    <span>Ganti Gambar</span>
                                </div>
                            ) : (
                                <div className="flex items-center gap-x-3 text-gray-500">
                                    <BsPlusLg />
                                    <span>Upload Gambar</span>
                                </div>
                            )}
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
                        {gallery?.gambar && (
                            <div className="p-3 border rounded-md mt-3">
                                <div className="h-[5rem] flex gap-x-5">
                                    <div>
                                        <img
                                            src={`/images/uploads/gallery/${gallery.gambar}`}
                                            alt="Preview"
                                            className="h-full"
                                        />
                                    </div>
                                    <p className="text-gray-500">
                                        {gallery.gambar}
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
