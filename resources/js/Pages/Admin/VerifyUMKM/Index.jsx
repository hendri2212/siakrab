import AdminLayout from "@/Layouts/AdminLayout";
import { DataTable } from "./Partial/DataTable";
import Button from "@/Components/Button";

export default function VerifyUMKM({ listPelakuUMKM }) {
    return (
        <AdminLayout
            cta={
                <a href="/admin/pelaku-umkm/export">
                    <Button variant={"primary"} text={"Export Data"} />
                </a>
            }
        >
            <div className="w-full">
                <DataTable data={listPelakuUMKM} />
            </div>
        </AdminLayout>
    );
}
