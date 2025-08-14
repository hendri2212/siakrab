import { TruncateText } from "@/Utils/truncateText";
import { formatTanggal } from "@/Utils/formatTanggal";

import RowActions from "./RowActions";

import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export const columns = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected()}
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "judul",
        header: "Judul",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("judul")}</div>
        ),
    },
    // {
    //     accessorKey: "subjudul",
    //     header: "Subjudul",
    //     cell: ({ row }) => (
    //         <div className="capitalize">{row.getValue("subjudul")}</div>
    //     ),
    // },
    {
        accessorKey: "gambar",
        header: "Gambar",
        cell: ({ row }) => (
            <div>
                <img
                    src={"/images/uploads/news/" + row.getValue("gambar")}
                    alt="berita kotabaru"
                    width="80"
                />
            </div>
        ),
    },
    {
        accessorKey: "konten",
        header: "Konten",
        cell: ({ row }) => {
            const konten = row.getValue("konten");
            const kontenJSON = JSON.parse(konten);

            return (
                <div className="capitalize">
                    {TruncateText(kontenJSON?.blocks[0]?.text, 12)}
                </div>
            );
        },
    },
    {
        accessorKey: "created_at",
        header: ({ column }) => {
            return (
                <div className="w-fit ml-auto">
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === "asc")
                        }
                    >
                        Tanggal Publish
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            );
        },
        cell: ({ row }) => {
            return (
                <div className="text-right font-medium">
                    {formatTanggal(row.getValue("created_at"))}
                </div>
            );
        },
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => <RowActions row={row} />,
    },
];
