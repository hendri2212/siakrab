export function slug(text) {
    return text.toLowerCase().replace(/\s+/g, "-");
}
