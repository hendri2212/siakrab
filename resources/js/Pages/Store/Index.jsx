import { Head, Link } from "@inertiajs/react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import { FaMapMarkerAlt, FaPhone, FaStore, FaWhatsapp } from "react-icons/fa";
import { MdCategory } from "react-icons/md";

export default function StoreIndex({ auth, pelakuUMKM, products }) {
    const formatPrice = (price) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(price);
    };

    const getDisplayPrice = (product) => {
        if (product.harga_fix) {
            return formatPrice(product.harga_fix);
        }
        if (product.harga_start && product.harga_end) {
            return `${formatPrice(product.harga_start)} - ${formatPrice(product.harga_end)}`;
        }
        if (product.harga_start) {
            return `Mulai ${formatPrice(product.harga_start)}`;
        }
        return "Hubungi penjual";
    };

    return (
        <>
            <Head title={pelakuUMKM?.nama_usaha || "Toko UMKM"} />
            <Navbar auth={auth} />

            <main className="min-h-screen pb-10">
                {/* Store Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                    <div className="container mx-auto px-4 py-8">
                        <div className="flex items-center gap-4">
                            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                                <FaStore className="text-blue-600 text-3xl" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold">
                                    {pelakuUMKM?.nama_usaha}
                                </h1>
                                <p className="text-blue-100 text-sm mt-1">
                                    {pelakuUMKM?.bidang_usaha} • {pelakuUMKM?.jenis_usaha}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Store Info */}
                <div className="container mx-auto px-4 -mt-4">
                    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                            <div className="flex items-start gap-2">
                                <FaMapMarkerAlt className="text-gray-400 mt-1 flex-shrink-0" />
                                <div>
                                    <p className="text-gray-500">Alamat</p>
                                    <p className="text-gray-800">
                                        {pelakuUMKM?.alamat_usaha}, {pelakuUMKM?.kecamatan}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-2">
                                <FaPhone className="text-gray-400 mt-1 flex-shrink-0" />
                                <div>
                                    <p className="text-gray-500">Telepon</p>
                                    <a
                                        href={`https://wa.me/${pelakuUMKM?.telepon?.replace(/^0/, '62')}`}
                                        className="text-green-600 hover:underline flex items-center gap-1"
                                    >
                                        <FaWhatsapp />
                                        {pelakuUMKM?.telepon}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container mx-auto">
                    {/* Products Section */}
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                            <MdCategory />
                            Produk ({products.length})
                        </h2>
                    </div>

                    {products.length > 0 ? (
                        <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-3 gap-2">
                            {products.map((product) => (
                                <Link
                                    key={product.id}
                                    href={`/product/${encodeURIComponent(product.nama)}`}
                                    className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                                >
                                    <div className="aspect-square">
                                        <img
                                            src={`/images/uploads/products/${product.thumbnail}`}
                                            alt={product.nama}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="p-2">
                                        <h3 className="text-sm font-medium text-gray-800 line-clamp-2">
                                            {product.nama}
                                        </h3>
                                        <p className="text-sm font-semibold text-blue-600 mt-1">
                                            {getDisplayPrice(product)}
                                        </p>
                                        <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                                            <span>❤️ {product.likes_count || 0}</span>
                                            <span>🔖 {product.saves_count || 0}</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white rounded-lg p-10 text-center text-gray-500">
                            <FaStore className="text-4xl mx-auto mb-3 text-gray-300" />
                            <p>Belum ada produk dari toko ini.</p>
                        </div>
                    )}
                </div>
            </main>

            {/* <Footer /> */}
        </>
    );
}
