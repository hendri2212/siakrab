export default function Button({
    variant,
    text,
    icon,
    iconPosition = "right",
    className = "",
    onClick,
    type,
}) {
    let style = "";

    switch (variant) {
        case "primary":
            style +=
                "border border-primary bg-primary text-white hover:bg-dark hover:text-primary";
            break;
        case "secondary":
            style += "border border-white hover:bg-white hover:text-primary";
            break;
        default:
            style += "border border-primary text-primary hover:bg-dark";
    }

    return (
        <button
            type={type}
            className={`py-2 px-4 font-semibold rounded-md flex gap-x-3 justify-center items-center ${style} duration-300 ${className}`}
            onClick={onClick}
        >
            {iconPosition === "right" ? (
                <>
                    {text}
                    {icon}
                </>
            ) : (
                <>
                    {icon}
                    {text}
                </>
            )}
        </button>
    );
}
