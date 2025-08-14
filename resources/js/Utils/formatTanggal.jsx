export function formatTanggal(tanggalISO) {
    const tanggal = new Date(tanggalISO);

    const options = {
        year: "numeric", // Menampilkan tahun (contoh: "2023")
        month: "long", // Menampilkan nama bulan (contoh: "September")
        day: "numeric", // Menampilkan tanggal (contoh: "25")
        hour: "numeric", // Menampilkan jam (contoh: "08")
        minute: "numeric", // Menampilkan menit (contoh: "32")
        second: "numeric", // Menampilkan detik (contoh: "22")
        timeZoneName: "short", // Menampilkan nama zona waktu (contoh: "GMT")
    };

    return new Intl.DateTimeFormat("id-ID", options).format(tanggal);
}

export function formatTanggalSimple(dateString) {
    const dateObject = new Date(dateString);

    const options = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    };

    const formattedDate = new Intl.DateTimeFormat("id-ID", options).format(
        dateObject
    );

    return formattedDate;
}
