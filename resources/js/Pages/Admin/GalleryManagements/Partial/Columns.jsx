import { usePage } from "@inertiajs/react";
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
        accessorKey: "nama",
        header: ({ column }) => {
            return (
                <div>
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === "asc")
                        }
                    >
                        Nama Galeri
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            );
        },
        cell: ({ row }) => {
            return <div className="font-medium">{row.getValue("nama")}</div>;
        },
    },
    {
        accessorKey: "gambar",
        header: "Gambar",
        cell: ({ row }) => {
            return (
                <div>
                    <img
                        src={`/images/uploads/gallery/${row.getValue(
                            "gambar"
                        )}`}
                        alt={row.nama}
                        width="100"
                    />
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
