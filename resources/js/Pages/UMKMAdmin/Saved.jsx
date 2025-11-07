import UMKMAdminLayout from '@/Layouts/UMKMAdminLayout';

export default function Saved({ auth, products }) {
    return (
        <UMKMAdminLayout auth={auth} cta={null}>
            <div className="w-full overflow-auto">
                <h1 className="text-base font-semibold mb-4">Produk yang disimpan pengguna</h1>
                <div className="space-y-4">
                    {products.map((p) => (
                        <div key={p.id} className="rounded-xl border bg-white p-3">
                            <div className="font-semibold">{p.nama}</div>
                            <div className="text-sm text-gray-500 mb-2">Kategori: {p.kategori}</div>
                            <div className="text-sm font-medium mb-1">
                                Total save: {p.saves ? p.saves.length : 0}
                            </div>
                            {p.saves && p.saves.length > 0 && (
                                <ul className="text-sm list-disc pl-5">
                                    {p.saves.map((s) => (
                                        <li key={s.id}>
                                            {s.user?.name ?? 'User'}
                                            {s.user?.email ? ` (${s.user.email})` : ''}
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