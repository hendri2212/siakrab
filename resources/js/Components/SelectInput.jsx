import { createContext, useContext, useState } from "react";

import { BsFillCaretDownFill } from "react-icons/bs";

const SelectInputContext = createContext();

function SelectInput({ children }) {
    const [open, setOpen] = useState(false);

    return (
        <SelectInputContext.Provider value={{ open, setOpen }}>
            <div className="relative">{children}</div>
        </SelectInputContext.Provider>
    );
}

function Trigger({ children, label, selected }) {
    const { open, setOpen } = useContext(SelectInputContext);

    return (
        <>
            {(open || selected) && (
                <label className="absolute -top-3.5 left-4 px-2 text-sm bg-white text-primary">
                    {label}
                </label>
            )}
            <div
                className={`w-full border rounded-md py-2 px-5 cursor-pointer ${
                    open ? "border-2 border-primary" : "border border-gray-300"
                }`}
                onClick={() => setOpen((open) => !open)}
            >
                <div className="flex items-center justify-between">
                    <span>{children}</span>
                    <span>
                        <BsFillCaretDownFill
                            className={`duration-300 ${
                                open ? "rotate-180" : "rotate-0"
                            } `}
                        />
                    </span>
                </div>

                {open && <div className="fixed inset-0"></div>}
            </div>
        </>
    );
}

function Content({ children, positionClass = "" }) {
    const { open, setOpen } = useContext(SelectInputContext);

    return (
        <div
            className={`absolute z-10 left-0 right-0 ${positionClass} py-4 px-5 rounded-md bg-white border duration-300 ${
                open
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 pointer-events-none -translate-y-5"
            }`}
            onClick={() => setOpen(false)}
        >
            {children}
        </div>
    );
}

SelectInput.Trigger = Trigger;
SelectInput.Content = Content;

export default SelectInput;
