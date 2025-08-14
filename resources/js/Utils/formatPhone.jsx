export function formatPhone(phoneNumber) {
    if (phoneNumber?.startsWith("0") && !phoneNumber?.startsWith("62")) {
        phoneNumber = "62" + phoneNumber.substring(1);
    }
    return phoneNumber;
}
