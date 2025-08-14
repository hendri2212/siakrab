import AdminLayout from "@/Layouts/AdminLayout";
import { DataTable } from "./Partial/DataTable";
import Button from "@/Components/Button";

export default function VerifyUMKM({ listPelakuUMKM }) {
    return (
        <AdminLayout
            cta={
                <a href="/admin/pelaku-umkm/export">
                    <Button variant={"primary"} text={"Export to Excel"} />
                </a>
            }
        >
            <div className="max-w-[75vw] overflow-auto">
                <DataTable data={listPelakuUMKM} />
            </div>
        </AdminLayout>
    );
}
