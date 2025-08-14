export function TruncateText(text, maxLength) {
    if (text.length > maxLength) {
        const truncatedText = text.substring(0, maxLength) + "...";

        return <span>{truncatedText}</span>;
    }

    return <span>{text}</span>;
}
