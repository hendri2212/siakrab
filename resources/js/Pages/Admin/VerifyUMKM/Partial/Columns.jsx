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
        accessorKey: "role",
        accessorFn: (row) => row.user.role,
        header: "Status",
        // header: ({ column }) => {
        //     return (
        //         <Button
        //             variant="ghost"
        //             onClick={() =>
        //                 column.toggleSorting(column.getIsSorted() === "asc")
        //             }
        //         >
        //             Status
        //             <ArrowUpDown className="ml-2 h-4 w-4" />
        //         </Button>
        //     );
        // },
        cell: ({ row }) => {
            const role = row.getValue("role");

            return (
                <div className="uppercase">
                    <span
                        className={`text-xs py-1 px-3 rounded-md ${
                            role === null
                                ? "bg-gray-100"
                                : role === "rejected"
                                ? "bg-red-500 text-white"
                                : "bg-primary text-white"
                        }`}
                    >
                        {role === null
                            ? "pending"
                            : role === "rejected"
                            ? "Ditolak"
                            : "Aktif"}
                    </span>
                </div>
            );
        },
    },
    {
        accessorKey: "name",
        accessorFn: (row) => row.user.name,
        filterFn: "fuzzy",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Nama
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("name")}</div>
        ),
    },
    {
        accessorKey: "email",
        accessorFn: (row) => row.user.email,
        filterFn: "fuzzy",
        header: ({ column }) => {
            return (
                <div>
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === "asc")
                        }
                    >
                        Email
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            );
        },
        cell: ({ row }) => {
            return <div>{row.getValue("email")}</div>;
        },
    },
    {
        accessorKey: "nama_usaha",
        header: ({ column }) => {
            return (
                <div>
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === "asc")
                        }
                    >
                        <span className="whitespace-nowrap">Nama Usaha</span>
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            );
        },
        cell: ({ row }) => {
            return <div>{row.getValue("nama_usaha")}</div>;
        },
    },
    {
        accessorKey: "jenis_usaha",
        header: ({ column }) => {
            return (
                <div>
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === "asc")
                        }
                    >
                        <span className="whitespace-nowrap">Jenis Usaha</span>
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            );
        },
        cell: ({ row }) => {
            return <div>{row.getValue("jenis_usaha")}</div>;
        },
    },
    {
        accessorKey: "bidang_usaha",
        header: ({ column }) => {
            return (
                <div>
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === "asc")
                        }
                    >
                        <span className="whitespace-nowrap">Bidang Usaha</span>
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            );
        },
        cell: ({ row }) => {
            return <div>{row.getValue("bidang_usaha")}</div>;
        },
    },
    {
        accessorKey: "produk",
        header: ({ column }) => {
            return (
                <div>
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === "asc")
                        }
                    >
                        <span className="whitespace-nowrap">Produk</span>
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            );
        },
        cell: ({ row }) => {
            return <div>{row.getValue("produk")}</div>;
        },
    },
    {
        accessorKey: "merk",
        header: ({ column }) => {
            return (
                <div>
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === "asc")
                        }
                    >
                        <span className="whitespace-nowrap">Merk</span>
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            );
        },
        cell: ({ row }) => {
            return <div>{row.getValue("merk")}</div>;
        },
    },
    {
        accessorKey: "alamat_usaha",
        header: ({ column }) => {
            return (
                <div>
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === "asc")
                        }
                    >
                        <span className="whitespace-nowrap">Alamat Usaha</span>
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            );
        },
        cell: ({ row }) => {
            return <div>{row.getValue("alamat_usaha")}</div>;
        },
    },
    {
        accessorKey: "alamat_rumah",
        header: ({ column }) => {
            return (
                <div>
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === "asc")
                        }
                    >
                        <span className="whitespace-nowrap">Alamat Rumah</span>
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            );
        },
        cell: ({ row }) => {
            return <div>{row.getValue("alamat_rumah")}</div>;
        },
    },
    {
        accessorKey: "kecamatan",
        header: ({ column }) => {
            return (
                <div>
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === "asc")
                        }
                    >
                        <span className="whitespace-nowrap">Kecamatan</span>
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            );
        },
        cell: ({ row }) => {
            return <div>{row.getValue("kecamatan")}</div>;
        },
    },
    {
        accessorKey: "jumlah_tenaga_kerja",
        header: ({ column }) => {
            return (
                <div>
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === "asc")
                        }
                    >
                        <span className="whitespace-nowrap">
                            Jumlah Tenaga Kerja
                        </span>
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            );
        },
        cell: ({ row }) => {
            return <div>{row.getValue("jumlah_tenaga_kerja")} Orang</div>;
        },
    },
    {
        accessorKey: "no_ijin_usaha",
        header: ({ column }) => {
            return <span className="whitespace-nowrap">No Ijin Usaha</span>;
        },
        cell: ({ row }) => {
            return <div>{row.getValue("no_ijin_usaha")}</div>;
        },
    },
    {
        accessorKey: "no_npwp",
        header: ({ column }) => {
            return <span className="whitespace-nowrap">No NPWP</span>;
        },
        cell: ({ row }) => {
            return <div>{row.getValue("no_npwp")}</div>;
        },
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => <RowActions row={row} />,
    },
];
