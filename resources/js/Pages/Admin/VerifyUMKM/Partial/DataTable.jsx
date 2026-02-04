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
    const [sorting, setSorting] = React.useState([]);
    const [columnFilters, setColumnFilters] = React.useState([]);
    const [selectedRow, setSelectedRow] = React.useState(null);
    const [columnVisibility, setColumnVisibility] = React.useState();
    const [rowSelection, setRowSelection] = React.useState({});
    const [globalFilter, setGlobalFilter] = React.useState("");
    const [pagination, setPagination] = React.useState({
        pageIndex: 0,
        pageSize: 10,
    });

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        onGlobalFilterChanged: setGlobalFilter,
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

    const handleVerify = (status) => {
        const role = status === "Terima" ? "umkmAdmin" : "rejected";
        const message =
            status === "Terima"
                ? "Berhasil memverifikasi pendaftaran UMKM dengan status diterima."
                : "Berhasil memverifikasi pendaftaran UMKM dengan status ditolak.";

        router.post(
            route("verifyUMKM.update", selectedRow.user_id),
            { role },
            {
                onSuccess: () => {
                    toast.success(message);
                    setSelectedRow(null); // Close detail view on success maybe? Or keep it open.
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

    return (
        <div className="w-full space-y-4">
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

            {selectedRow && (
                <div className="p-4 sm:p-6 border rounded-xl bg-white shadow-sm space-y-6 animate-in fade-in zoom-in-95 duration-200">
                    <div className="flex justify-between items-start border-b pb-4">
                        <div>
                            <h3 className="text-xl font-bold text-gray-900">
                                {selectedRow.nama_usaha || "Tanpa Nama Usaha"}
                            </h3>
                            <p className="text-sm text-muted-foreground mt-1">
                                Detail Lengkap Data UMKM
                            </p>
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedRow(null)}
                            className="text-muted-foreground hover:text-foreground"
                        >
                            Tutup
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <DetailItem
                            label="Status"
                            value={
                                <span
                                    className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${selectedRow.user?.role === "umkmAdmin"
                                        ? "bg-green-100 text-green-700"
                                        : selectedRow.user?.role ===
                                            "rejected"
                                            ? "bg-red-100 text-red-700"
                                            : "bg-gray-100 text-gray-700"
                                        }`}
                                >
                                    {selectedRow.user?.role === "umkmAdmin"
                                        ? "Aktif"
                                        : selectedRow.user?.role === "rejected"
                                            ? "Ditolak"
                                            : "Pending"}
                                </span>
                            }
                        />
                        <DetailItem
                            label="Nama Pemilik"
                            value={selectedRow.user?.name}
                        />
                        <DetailItem
                            label="NIK"
                            value={selectedRow.nik}
                        />
                        <DetailItem
                            label="Email"
                            value={selectedRow.user?.email}
                        />
                        <DetailItem
                            label="Nama Usaha"
                            value={selectedRow.nama_usaha}
                        />
                        <DetailItem
                            label="Jenis Usaha"
                            value={selectedRow.jenis_usaha}
                        />
                        <DetailItem
                            label="Bidang Usaha"
                            value={selectedRow.bidang_usaha}
                        />
                        <DetailItem
                            label="Produk"
                            value={selectedRow.produk}
                        />
                        <DetailItem label="Merek" value={selectedRow.merk} />
                        <DetailItem
                            label="Alamat Usaha"
                            value={selectedRow.alamat_usaha}
                        />
                        <DetailItem
                            label="Alamat Rumah"
                            value={selectedRow.alamat_rumah}
                        />
                        <DetailItem
                            label="Kecamatan"
                            value={selectedRow.kecamatan}
                        />
                        <DetailItem
                            label="Jumlah Tenaga Kerja"
                            value={
                                selectedRow.jumlah_tenaga_kerja
                                    ? `${selectedRow.jumlah_tenaga_kerja} Orang`
                                    : "-"
                            }
                        />
                        <DetailItem
                            label="Nomor Izin Usaha"
                            value={selectedRow.no_ijin_usaha}
                        />
                        <DetailItem
                            label="Nomor NPWP"
                            value={selectedRow.no_npwp}
                        />
                    </div>

                    {selectedRow.foto_ktp && (
                        <div className="border-t pt-4">
                            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                                Foto KTP
                            </p>
                            <div className="overflow-hidden rounded-lg border bg-gray-50 max-w-sm">
                                <img
                                    src={`/storage/${selectedRow.foto_ktp}`}
                                    alt="Foto KTP"
                                    className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                        </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
                        <Button
                            variant="destructive"
                            className="bg-red-500 hover:bg-red-600 text-white flex-1 sm:flex-none justify-center"
                            onClick={() => handleVerify("Tolak")}
                        >
                            <BiBlock className="mr-2 h-4 w-4" />
                            Tolak
                        </Button>
                        <Button
                            className="bg-green-600 hover:bg-green-700 text-white flex-1 sm:flex-none justify-center"
                            onClick={() => handleVerify("Terima")}
                        >
                            <FaCheck className="mr-2 h-4 w-4" />
                            Terima
                        </Button>
                    </div>
                </div>
            )}

            {/* Mobile Card View */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
                {table.getRowModel().rows.length ? (
                    table.getRowModel().rows.map((row) => (
                        <div
                            key={row.id}
                            className={`p-4 border rounded-xl bg-white shadow-sm flex flex-col gap-3 cursor-pointer transition-all active:scale-[0.99] touch-manipulation ${row.original.id === selectedRow?.id
                                ? "ring-2 ring-primary border-primary bg-blue-50/30"
                                : "hover:border-gray-300"
                                }`}
                            onClick={() => {
                                setSelectedRow(row.original);
                                // Scroll to top of table/detail view smoothly
                                window.scrollTo({
                                    top: 100,
                                    behavior: "smooth",
                                });
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
                                    Lihat Detail & Verifikasi
                                </span>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center p-8 text-muted-foreground bg-gray-50 rounded-lg border border-dashed my-4">
                        Tidak ada data ditemukan.
                    </div>
                )}
            </div>

            {/* Desktop Table View */}
            <div className="rounded-md border hidden md:block">
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
                                    className={`cursor-pointer hover:bg-muted ${selectedRow?.id === row.original.id
                                        ? "bg-muted"
                                        : ""
                                        }`}
                                    onClick={() => setSelectedRow(row.original)}
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
                    <span className="hidden sm:inline">
                        Page {table.getState().pagination.pageIndex + 1} of{" "}
                        {table.getPageCount()} |{" "}
                    </span>
                    Total {table.getFilteredRowModel().rows.length} rows
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
