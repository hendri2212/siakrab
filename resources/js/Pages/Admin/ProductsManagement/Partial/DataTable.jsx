import * as React from "react";
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    getExpandedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { ChevronDown, X } from "lucide-react";

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
import { getColumns } from "./Columns";

export function DataTable({ data }) {
    const [sorting, setSorting] = React.useState([]);
    const [columnFilters, setColumnFilters] = React.useState([]);
    const [columnVisibility, setColumnVisibility] = React.useState({});
    const [rowSelection, setRowSelection] = React.useState({});
    const [globalFilter, setGlobalFilter] = React.useState("");
    const [expanded, setExpanded] = React.useState({});

    // Responsive Visibility Effect
    React.useEffect(() => {
        // Function to check window size and hide columns
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setColumnVisibility({
                    kategori: false,
                    deskripsi: false,
                    harga_start: false,
                    harga_end: false,
                    harga_fix: false, // Hide all prices on mobile, show in expanded
                    // Keep visible: select, expander, thumbnail, nama, actions
                });
            } else {
                setColumnVisibility({}); // Reset to all visible on desktop
            }
        };

        // Initial check
        handleResize();

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // State untuk image modal
    const [selectedImage, setSelectedImage] = React.useState(null);
    const [showImageModal, setShowImageModal] = React.useState(false);
    const [pagination, setPagination] = React.useState({
        pageIndex: 0,
        pageSize: 10,
    });

    const handleImageClick = (imageUrl) => {
        setSelectedImage(imageUrl);
        setShowImageModal(true);
    };

    const closeImageModal = () => {
        setShowImageModal(false);
        setSelectedImage(null);
    };

    const columns = React.useMemo(
        () => getColumns({ onImageClick: handleImageClick }),
        []
    );

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        onGlobalFilterChanged: setGlobalFilter,
        onPaginationChange: setPagination,
        onExpandedChange: setExpanded,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
            globalFilter,
            pagination,
            expanded,
        },
    });

    // Format Rupiah Helper
    const formatRupiah = (number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(number);
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

            <div className="rounded-md border">
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
                                <React.Fragment key={row.id}>
                                    <TableRow
                                        data-state={
                                            row.getIsSelected() && "selected"
                                        }
                                        className={
                                            row.getIsExpanded()
                                                ? "bg-muted/50"
                                                : ""
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
                                    {row.getIsExpanded() && (
                                        <TableRow className="bg-muted/30 hover:bg-muted/30">
                                            <TableCell
                                                colSpan={
                                                    row.getVisibleCells().length
                                                }
                                            >
                                                <div className="grid gap-4 p-4 text-sm animate-in slide-in-from-top-2 duration-300">
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div className="space-y-1">
                                                            <p className="font-semibold text-muted-foreground text-xs uppercase">
                                                                Kategori
                                                            </p>
                                                            <div className="px-2 py-1 rounded bg-white border w-fit">
                                                                {
                                                                    row.original
                                                                        .kategori
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="space-y-1">
                                                            <p className="font-semibold text-muted-foreground text-xs uppercase">
                                                                Harga
                                                            </p>
                                                            <p className="font-medium text-green-600">
                                                                {row.original
                                                                    .harga_fix
                                                                    ? formatRupiah(
                                                                        row
                                                                            .original
                                                                            .harga_fix
                                                                    )
                                                                    : `${formatRupiah(
                                                                        row
                                                                            .original
                                                                            .harga_start
                                                                    )} - ${formatRupiah(
                                                                        row
                                                                            .original
                                                                            .harga_end
                                                                    )}`}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="space-y-1">
                                                        <p className="font-semibold text-muted-foreground text-xs uppercase">
                                                            Deskripsi
                                                        </p>
                                                        <p className="whitespace-pre-wrap text-gray-700 bg-white p-2 rounded border">
                                                            {
                                                                row.original
                                                                    .deskripsi
                                                            }
                                                        </p>
                                                    </div>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </React.Fragment>
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
                <div className="space-x-2">
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

            {/* Image Preview Modal */}
            {showImageModal && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
                    onClick={closeImageModal}
                >
                    <div className="relative max-w-[90vw] max-h-[90vh]">
                        <button
                            onClick={closeImageModal}
                            className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors"
                        >
                            <X size={32} />
                        </button>
                        <img
                            src={selectedImage}
                            alt="Preview"
                            className="max-w-full max-h-[85vh] object-contain rounded-lg"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
