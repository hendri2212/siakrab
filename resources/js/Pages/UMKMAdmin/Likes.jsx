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

export default function Likes({ auth, products }) {
    return (
        <UMKMAdminLayout auth={auth} cta={null}>
            <div className="w-full overflow-auto">
                <h1 className="text-base font-semibold mb-4">Produk yang di-like pengguna</h1>
                <div className="space-y-4">
                    {products.map((product) => (
                        <div key={product.id} className="w-full rounded-xl border bg-white p-3">
                            <div className="font-semibold">{product.nama}</div>
                            <div className="text-sm text-gray-500 mb-2">
                                Harga: {formatRupiah(product.harga_fix)}
                            </div>
                            <div className="text-sm font-medium mb-1">
                                Total like: {product.likes ? product.likes.length : 0}
                            </div>
                            {product.likes && product.likes.length > 0 && (
                                <ul className="text-sm list-disc pl-5">
                                    {product.likes.map((l) => (
                                        <li key={l.id}>
                                            {l.user?.name ?? 'User'}
                                            <p className="text-xs text-gray-500">
                                                Email: {l.user?.email ? ` ${l.user.email}` : ''}
                                            </p>
                                            {product.pelaku_umkm?.telepon && (
                                                <p className="text-xs text-gray-500">
                                                    WA:{' '}
                                                    <a
                                                        href={getWhatsappLink(product.pelaku_umkm.telepon)}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="underline"
                                                    >
                                                        {product.pelaku_umkm.telepon}
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