import { useState } from "react";

import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
import InputError from "@/Components/InputError";

const roles = [
    { name: "Super Admin", value: "superAdmin" },
    { name: "Admin", value: "admin" },
    { name: "Pelaku UMKM", value: "umkm" },
];

export default function Form({ name, email, role, setData, errors }) {
    const [selectedRole, setSelectedRole] = useState(role || "Pilih Role");

    return (
        <div className="flex flex-col gap-y-7 w-full">
            <div>
                <TextInput
                    type="text"
                    label="Nama"
                    placeholder="Nama"
                    value={name}
                    required
                    onChange={(e) => setData("name", e.target.value)}
                />
                <InputError message={errors["name"]} />
            </div>
            <div>
                <TextInput
                    type="email"
                    label="Email"
                    placeholder="Email"
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
                    placeholder="Password"
                    required
                    onChange={(e) => setData("password", e.target.value)}
                />
                <InputError message={errors["password"]} />
            </div>
            <div>
                <SelectInput>
                    <SelectInput.Trigger
                        label={"Role"}
                        selected={selectedRole !== "Pilih Role"}
                    >
                        <div
                            className={
                                selectedRole === "Pilih Role"
                                    ? "text-gray-500"
                                    : ""
                            }
                        >
                            {selectedRole}
                        </div>
                    </SelectInput.Trigger>
                    <SelectInput.Content positionClass={"top-12"}>
                        <div className="max-h-[10rem] overflow-auto">
                            <ul>
                                {roles.map((role, i) => (
                                    <li
                                        key={i}
                                        className="py-2 rounded-md cursor-pointer hover:bg-gray-100 hover:px-4 duration-300"
                                        onClick={() => {
                                            setSelectedRole(role.name);
                                            setData("role", role.value);
                                        }}
                                    >
                                        {role.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </SelectInput.Content>
                </SelectInput>
                <InputError message={errors["role"]} />
            </div>
        </div>
    );
}
