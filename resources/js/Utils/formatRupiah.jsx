export function formatRupiah(amount) {
    const rupiahFormatter = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    });

    const formattedAmount = rupiahFormatter.format(amount);

    return formattedAmount;
}
