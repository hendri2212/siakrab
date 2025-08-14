import { forwardRef, useEffect, useRef, useState } from "react";

export default forwardRef(function TextArea(
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
        <div className="relative">
            {(input.current?.value || focus) && (
                <span className="absolute text-sm -top-3 left-5 px-1.5 bg-white text-primary">
                    {label}
                </span>
            )}
            <textarea
                {...props}
                type={type}
                className={`w-full px-5 border-gray-300 focus:border-primary focus:ring-primary rounded-md ${
                    focus && "placeholder-transparent"
                } ${className}`}
                rows={5}
                ref={input}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
            />
        </div>
    );
});
