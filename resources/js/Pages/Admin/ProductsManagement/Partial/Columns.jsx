import { TruncateText } from "@/Utils/truncateText";
import { formatRupiah } from "@/Utils/formatRupiah";

import RowActions from "./RowActions";

import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export const getColumns = ({ onImageClick }) => [
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
        accessorKey: "kategori",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Kategori Produk
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => (
            <div className="capitalize text-center">
                {row.getValue("kategori")}
            </div>
        ),
    },
    {
        accessorKey: "thumbnail",
        header: "Gambar Thumbnail",
        cell: ({ row }) => {
            const imageUrl = "/images/uploads/products/" + row.getValue("thumbnail");
            return (
                <div
                    className="cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => onImageClick(imageUrl)}
                >
                    <img
                        src={imageUrl}
                        alt="produk umkm"
                        width="80"
                        className="rounded"
                    />
                </div>
            );
        },
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
                        Nama Produk
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            );
        },
        cell: ({ row }) => {
            return (
                <div className="text-center font-medium">
                    {row.getValue("nama")}
                </div>
            );
        },
    },
    {
        accessorKey: "deskripsi",
        header: "Deskripsi",
        cell: ({ row }) => {
            return (
                <div className="font-medium">
                    {TruncateText(row.getValue("deskripsi"), 10)}
                </div>
            );
        },
    },
    {
        accessorKey: "harga_start",
        header: ({ column }) => {
            return (
                <div>
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === "asc")
                        }
                    >
                        Mulai Harga
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            );
        },
        cell: ({ row }) => {
            return (
                <div className="text-center font-medium">
                    {formatRupiah(row.getValue("harga_start"))}
                </div>
            );
        },
    },
    {
        accessorKey: "harga_end",
        header: ({ column }) => {
            return (
                <div>
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === "asc")
                        }
                    >
                        Hingga Harga
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            );
        },
        cell: ({ row }) => {
            return (
                <div className="text-center font-medium">
                    {formatRupiah(row.getValue("harga_end"))}
                </div>
            );
        },
    },
    {
        accessorKey: "harga_fix",
        header: ({ column }) => {
            return (
                <div className="w-fit ml-auto">
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === "asc")
                        }
                    >
                        Harga
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            );
        },
        cell: ({ row }) => {
            return (
                <div className="text-center font-medium">
                    {formatRupiah(row.getValue("harga_fix"))}
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
