import AdminLayout from "@/Layouts/AdminLayout";
import { FaStore, FaThList } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi";

export default function Dashboard({ totalProducts, totalPelakuUMKM }) {
    return (
        <AdminLayout>
            <section className="grid grid-cols-3 gap-5">
                <div className="border-b-2 bg-[#9FFFFF] p-5 rounded-md relative">
                    <div className="absolute top-4 right-4">
                        <FaStore size={20} />
                    </div>
                    <h1 className="font-bold text-4xl">{totalProducts}</h1>
                    <p>Total Produk</p>
                </div>
                <div className="border-b-2 bg-[#FBB2FF] p-5 rounded-md relative">
                    <div className="absolute top-4 right-4">
                        <FaThList size={20} />
                    </div>
                    <h1 className="font-bold text-4xl">17</h1>
                    <p>Sektor Produk </p>
                </div>
                <div className="border-b-2 bg-[#daff7d] p-5 rounded-md relative">
                    <div className="absolute top-4 right-4">
                        <HiUserGroup size={20} />
                    </div>
                    <h1 className="font-bold text-4xl">{totalPelakuUMKM}</h1>
                    <p>Pelaku UMKM</p>
                </div>
            </section>
        </AdminLayout>
    );
}
