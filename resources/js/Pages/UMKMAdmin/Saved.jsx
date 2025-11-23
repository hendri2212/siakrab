import UMKMAdminLayout from '@/Layouts/UMKMAdminLayout';

const formatRupiah = (value) => {
    if (value === null || value === undefined) return '-';

    const number = typeof value === 'string' ? parseInt(value, 10) : value;

    if (Number.isNaN(number)) return '-';

    return `Rp ${new Intl.NumberFormat('id-ID').format(number)}`;
};

const getWhatsappLink = (raw) => {
    if (!raw) return '#';

    const digits = raw.toString().replace(/\D/g, '');

    if (!digits) return '#';

    let phone = digits;

    // Jika nomor diawali 0, ubah ke format 62xxxxxxxxx
    if (phone.startsWith('0')) {
        phone = '62' + phone.slice(1);
    }

    return `https://wa.me/${phone}`;
};

export default function Saved({ auth, products }) {
    return (
        <UMKMAdminLayout auth={auth} cta={null}>
            <div className="w-full overflow-auto">
                <h1 className="text-base font-semibold mb-4">Produk yang disimpan pengguna</h1>
                <div className="space-y-4">
                    {products.map((p) => (
                        <div key={p.id} className="rounded-xl border bg-white p-3">
                            <div className="font-semibold">{p.nama}</div>
                            <div className="text-sm text-gray-500 mb-2">Harga: {formatRupiah(p.harga_fix)}</div>
                            <div className="text-sm font-medium mb-1">
                                Total save: {p.saves ? p.saves.length : 0}
                            </div>
                            {p.saves && p.saves.length > 0 && (
                                <ul className="text-sm list-disc pl-5">
                                    {p.saves.map((s) => (
                                        <li key={s.id}>
                                            {s.user?.name ?? 'User'}
                                            <p className="text-xs text-gray-500">
                                                Email: {s.user?.email ? ` ${s.user.email}` : ''}
                                            </p>
                                            {p.pelaku_umkm?.telepon && (
                                                <p className="text-xs text-gray-500">
                                                    WA:{' '}
                                                    <a
                                                        href={getWhatsappLink(p.pelaku_umkm.telepon)}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="underline"
                                                    >
                                                        {p.pelaku_umkm.telepon}
                                                    </a>
                                                </p>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </UMKMAdminLayout>
    );
}