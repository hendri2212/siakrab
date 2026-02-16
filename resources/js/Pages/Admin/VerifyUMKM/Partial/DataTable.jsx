import * as React from "react";
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";
import { router } from "@inertiajs/react";
import { toast } from "react-hot-toast";
import { FaCheck } from "react-icons/fa6";
import { BiBlock } from "react-icons/bi";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import TextInput from "@/Components/TextInput";
import { columns } from "./Columns";

export function DataTable({ data }) {
    const tableData = React.useMemo(() => (Array.isArray(data) ? data : []), [data]);
    const [sorting, setSorting] = React.useState([]);
    const [columnFilters, setColumnFilters] = React.useState([]);
    const [expandedId, setExpandedId] = React.useState(null);
    const [columnVisibility, setColumnVisibility] = React.useState();
    const [rowSelection, setRowSelection] = React.useState({});
    const [globalFilter, setGlobalFilter] = React.useState("");
    const [pagination, setPagination] = React.useState({
        pageIndex: 0,
        pageSize: 10,
    });
    const isInitialGlobalFilterRender = React.useRef(true);

    const table = useReactTable({
        data: tableData,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        onGlobalFilterChange: setGlobalFilter,
        onPaginationChange: setPagination,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
            globalFilter,
            pagination,
        },
    });

    React.useEffect(() => {
        if (isInitialGlobalFilterRender.current) {
            isInitialGlobalFilterRender.current = false;
            return;
        }
        setPagination((prev) => ({ ...prev, pageIndex: 0 }));
    }, [globalFilter]);

    const handleVerify = (status, userId) => {
        const role = status === "Terima" ? "umkmAdmin" : "rejected";
        const message =
            status === "Terima"
                ? "Berhasil memverifikasi pendaftaran UMKM dengan status diterima."
                : "Berhasil memverifikasi pendaftaran UMKM dengan status ditolak.";

        router.post(
            route("verifyUMKM.update", userId),
            { role },
            {
                onSuccess: () => {
                    toast.success(message);
                    setExpandedId(null);
                },
                onError: () => {
                    toast.error("Gagal memverifikasi pendaftaran UMKM.");
                },
            }
        );
    };

    const DetailItem = ({ label, value }) => {
        if (!value) return null;
        return (
            <div className="flex flex-col space-y-1">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    {label}
                </span>
                <span className="text-sm font-medium text-gray-800 break-words">
                    {value}
                </span>
            </div>
        );
    };

    const totalRows = table.getPrePaginationRowModel().rows.length;
    const filteredRows = table.getFilteredRowModel().rows.length;
    const currentRows = table.getRowModel().rows.length;
    const totalPages = Math.max(table.getPageCount(), 1);
    const currentPage = Math.min(
        table.getState().pagination.pageIndex + 1,
        totalPages
    );
    const pageSize = table.getState().pagination.pageSize;
    const startRow = filteredRows === 0 ? 0 : (currentPage - 1) * pageSize + 1;
    const endRow =
        filteredRows === 0
            ? 0
            : Math.min(startRow + currentRows - 1, filteredRows);

    return (
        <div className="w-full max-w-none space-y-4">
            <div className="flex items-center justify-between py-4">
                <div className="w-full md:w-[20rem]">
                    <TextInput
                        label="Search"
                        placeholder="Search..."
                        value={globalFilter}
                        onChange={(e) => setGlobalFilter(e.target.value)}
                        className="w-full"
                    />
                </div>
                <div className="hidden md:block">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="outline"
                                className="ml-auto rounded-xl py-5 ml-2"
                            >
                                Columns <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {table
                                .getAllColumns()
                                .filter((column) => column.getCanHide())
                                .map((column) => {
                                    return (
                                        <DropdownMenuCheckboxItem
                                            key={column.id}
                                            className="capitalize"
                                            checked={column.getIsVisible()}
                                            onCheckedChange={(value) =>
                                                column.toggleVisibility(!!value)
                                            }
                                        >
                                            {column.id}
                                        </DropdownMenuCheckboxItem>
                                    );
                                })}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            {/* Card View (Mobile & Desktop) */}
            <div className="w-full flex flex-col gap-4">
                {table.getRowModel().rows.length ? (
                    table.getRowModel().rows.map((row) => (
                        <div
                            key={row.id}
                            className={`block w-full min-w-0 p-4 border rounded-xl bg-white shadow-sm flex flex-col gap-3 cursor-pointer transition-all active:scale-[0.99] touch-manipulation ${row.original.id === expandedId
                                ? "ring-2 ring-primary border-primary bg-blue-50/30"
                                : "hover:border-gray-300"
                                }`}
                            onClick={() => {
                                setExpandedId((current) =>
                                    current === row.original.id ? null : row.original.id
                                );
                            }}
                        >
                            <div className="flex justify-between items-start gap-2">
                                <h4 className="font-bold text-gray-900 line-clamp-2 leading-tight">
                                    {row.original.nama_usaha || "Tanpa Nama Usaha"}
                                </h4>
                                <span
                                    className={`px-2 py-1 rounded text-[10px] uppercase font-bold whitespace-nowrap ${row.original.user?.role === "umkmAdmin"
                                        ? "bg-green-100 text-green-700"
                                        : row.original.user?.role ===
                                            "rejected"
                                            ? "bg-red-100 text-red-700"
                                            : "bg-gray-100 text-gray-700"
                                        }`}
                                >
                                    {row.original.user?.role === "umkmAdmin"
                                        ? "Aktif"
                                        : row.original.user?.role === "rejected"
                                            ? "Ditolak"
                                            : "Pending"}
                                </span>
                            </div>
                            <div className="space-y-1.5 pt-1">
                                <p className="text-sm text-gray-600 flex justify-between">
                                    <span className="font-medium text-gray-500">
                                        Pemilik
                                    </span>
                                    <span className="text-right truncate max-w-[60%]">
                                        {row.original.user?.name}
                                    </span>
                                </p>
                                <p className="text-sm text-gray-600 flex justify-between">
                                    <span className="font-medium text-gray-500">
                                        Jenis
                                    </span>
                                    <span className="text-right truncate max-w-[60%]">
                                        {row.original.jenis_usaha}
                                    </span>
                                </p>
                                <p className="text-sm text-gray-600 flex justify-between">
                                    <span className="font-medium text-gray-500">
                                        Kecamatan
                                    </span>
                                    <span className="text-right truncate max-w-[60%]">
                                        {row.original.kecamatan}
                                    </span>
                                </p>
                            </div>
                            <div className="pt-3 border-t mt-1">
                                <span className="text-sm font-semibold text-primary flex items-center justify-center w-full">
                                    {expandedId === row.original.id
                                        ? "Tutup Detail"
                                        : "Lihat Detail & Verifikasi"}
                                </span>
                            </div>

                            {expandedId === row.original.id && (
                                <div className="pt-3 mt-1 border-t space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <DetailItem
                                            label="Status"
                                            value={
                                                <span
                                                    className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${row.original.user?.role === "umkmAdmin"
                                                        ? "bg-green-100 text-green-700"
                                                        : row.original.user?.role ===
                                                            "rejected"
                                                            ? "bg-red-100 text-red-700"
                                                            : "bg-gray-100 text-gray-700"
                                                        }`}
                                                >
                                                    {row.original.user?.role === "umkmAdmin"
                                                        ? "Aktif"
                                                        : row.original.user?.role === "rejected"
                                                            ? "Ditolak"
                                                            : "Pending"}
                                                </span>
                                            }
                                        />
                                        <DetailItem
                                            label="Nama Pemilik"
                                            value={row.original.user?.name}
                                        />
                                        <DetailItem
                                            label="WhatsApp"
                                            value={
                                                row.original.telepon ? (
                                                    <a
                                                        href={`https://wa.me/62${row.original.telepon.replace(/^0/, '')}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        onClick={(e) => e.stopPropagation()}
                                                        className="text-green-600 hover:text-green-700 hover:underline"
                                                    >
                                                        {row.original.telepon}
                                                    </a>
                                                ) : null
                                            }
                                        />
                                        <DetailItem
                                            label="Email"
                                            value={row.original.user?.email}
                                        />
                                        <DetailItem
                                            label="Nama Usaha"
                                            value={row.original.nama_usaha}
                                        />
                                        <DetailItem
                                            label="Jenis Usaha"
                                            value={row.original.jenis_usaha}
                                        />
                                        <DetailItem
                                            label="Bidang Usaha"
                                            value={row.original.bidang_usaha}
                                        />
                                        <DetailItem label="Produk" value={row.original.produk} />
                                        <DetailItem label="Merek" value={row.original.merk} />
                                        <DetailItem
                                            label="Alamat Usaha"
                                            value={row.original.alamat_usaha}
                                        />
                                        <DetailItem
                                            label="Alamat Rumah"
                                            value={row.original.alamat_rumah}
                                        />
                                        <DetailItem
                                            label="Kecamatan"
                                            value={row.original.kecamatan}
                                        />
                                        <DetailItem
                                            label="Jumlah Tenaga Kerja"
                                            value={
                                                row.original.jumlah_tenaga_kerja
                                                    ? `${row.original.jumlah_tenaga_kerja} Orang`
                                                    : "-"
                                            }
                                        />
                                        <DetailItem
                                            label="Nomor Izin Usaha"
                                            value={row.original.no_ijin_usaha}
                                        />
                                        <DetailItem
                                            label="Nomor NPWP"
                                            value={row.original.no_npwp}
                                        />
                                        <DetailItem label="NIK" value={row.original.nik} />
                                    </div>

                                    {row.original.foto_ktp && (
                                        <div>
                                            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                                                Foto KTP
                                            </p>
                                            <div className="overflow-hidden rounded-lg border bg-gray-50">
                                                <img
                                                    src={`/storage/${row.original.foto_ktp}`}
                                                    alt="Foto KTP"
                                                    className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
                                                />
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex gap-3 justify-end">
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            className="bg-red-500 hover:bg-red-600 text-white"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleVerify("Tolak", row.original.user_id);
                                            }}
                                        >
                                            <BiBlock className="mr-1.5 h-4 w-4" />
                                            Tolak
                                        </Button>
                                        <Button
                                            size="sm"
                                            className="bg-green-600 hover:bg-green-700 text-white"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleVerify("Terima", row.original.user_id);
                                            }}
                                        >
                                            <FaCheck className="mr-1.5 h-4 w-4" />
                                            Terima
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <div className="text-center p-8 text-muted-foreground bg-gray-50 rounded-lg border border-dashed my-4">
                        Tidak ada data ditemukan.
                    </div>
                )}
            </div>

            {/* Desktop Table View */}
            <div className="rounded-md border hidden">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef
                                                        .header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && "selected"
                                    }
                                    className={`cursor-pointer hover:bg-muted ${expandedId === row.original.id
                                        ? "bg-muted"
                                        : ""
                                        }`}
                                    onClick={() =>
                                        setExpandedId((current) =>
                                            current === row.original.id
                                                ? null
                                                : row.original.id
                                        )
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    Page {currentPage}/{totalPages} | Show {startRow}-{endRow} of {filteredRows}
                    {filteredRows !== totalRows ? ` (total ${totalRows})` : ""}
                </div>
                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
}
