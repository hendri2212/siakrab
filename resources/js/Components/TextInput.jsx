import { forwardRef, useEffect, useRef, useState } from "react";

export default forwardRef(function TextInput(
    { type = "text", className = "", isFocused = false, label, ...props },
    ref
) {
    const input = ref ? ref : useRef();

    const [focus, setFocus] = useState(false);

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <div className="w-full relative">
            {(input.current?.value || focus) && (
                <span className="absolute text-sm -top-3 left-5 px-1.5 bg-white text-primary">
                    {label}
                </span>
            )}
            <input
                {...props}
                type={type}
                className={`w-full px-5 border-gray-300 focus:border-primary focus:ring-primary rounded-xl ${
                    focus && "placeholder-transparent"
                } ${className}`}
                ref={input}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
            />
        </div>
    );
});
