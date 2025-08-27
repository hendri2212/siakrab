import * as React from "react";
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";

import TextInput from "@/Components/TextInput";
import { columns } from "./Columns";

export function DataTable({ data }) {
    const [sorting, setSorting] = React.useState([]);
    const [columnFilters, setColumnFilters] = React.useState([]);
    const [globalFilter, setGlobalFilter] = React.useState("");

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onGlobalFilterChange: setGlobalFilter,
        state: {
            sorting,
            columnFilters,
            globalFilter,
        },
    });

    // --- Helpers for resolving values and formatting ---
    const coerceString = (val) => {
        if (val == null) return "";
        if (typeof val === "string") return val;
        if (typeof val === "number") return String(val);
        if (typeof val === "object") {
            for (const k of ["url", "src", "path", "file", "value"]) {
                if (typeof val[k] === "string" && val[k].trim() !== "") return val[k];
            }
        }
        return "";
    };

    const normalizeSrc = (src) => {
        const s = coerceString(src).trim();
        if (!s) return "";
        if (s.startsWith("data:")) return s; // data URI
        if (/^https?:\/\//i.test(s) || s.startsWith("//")) return s; // absolute URL
        // ensure leading slash for relative storage paths
        return s.startsWith("/") ? s : `/${s}`;
    };

    const resolve = (row, keys, defaultVal = "") => {
        for (const k of keys) {
            try {
                // Try via react-table accessor
                const v = row.getValue?.(k);
                if (v !== undefined && v !== null && String(v).trim() !== "") return coerceString(v);
            } catch (_e) { }
            // Try raw original object
            if (
                row.original &&
                row.original[k] !== undefined &&
                row.original[k] !== null &&
                String(row.original[k]).trim() !== ""
            ) {
                return coerceString(row.original[k]);
            }
        }
        return defaultVal;
    };

    const toIDR = (val) => {
        const num = typeof val === "number" ? val : Number(String(val ?? "").replace(/[^\d.-]/g, ""));
        if (Number.isFinite(num)) {
            return new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                maximumFractionDigits: 0,
            }).format(num);
        }
        return val ?? "";
    };

    const findCellByIds = (row, ids) => {
        const idSet = new Set(ids);
        return row
            .getVisibleCells()
            .find((c) => idSet.has(c.column.id) && !isSelectionColumn(c.column));
    };

    const getColumnLabel = (column) => {
        const def = column.columnDef || {};
        if (typeof def.header === "string") return def.header;
        if (def?.meta && typeof def.meta.label === "string") return def.meta.label;
        return column.id;
    };

    const isSelectionColumn = (column) => {
        const def = column.columnDef || {};
        if (column.id === "select") return true;
        if (def?.meta && (def.meta.isSelection || def.meta.type === "selection")) return true;
        return false;
    };

    const isActionColumn = (column) => {
        const def = column.columnDef || {};
        // Prefer explicit meta flags from Columns.jsx
        if (def?.meta && (def.meta.isAction || def.meta.isActions || def.meta.type === "action" || def.meta.type === "actions")) {
            return true;
        }
        // Common id/header names
        const id = String(column.id || "").toLowerCase();
        if (id === "action" || id === "actions") return true;
        if (typeof def.header === "string" && ["action", "actions"].includes(def.header.toLowerCase())) return true;
        return false;
    };

    const Pill = ({ label, children }) => (
        <span className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px]">
            <span className="uppercase text-muted-foreground">{label}</span>
            <span className="font-medium">{children}</span>
        </span>
    );

    return (
        <div className="w-full">
            <div className="flex items-center pb-3">
                <div className="flex-1">
                    <TextInput
                        label="Search"
                        placeholder="Search..."
                        value={globalFilter}
                        onChange={(e) => setGlobalFilter(e.target.value)}
                        className="w-full"
                    />
                </div>
            </div>
            <div className="space-y-2">
                {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => {
                        const thumbKeys = [
                            "thumbnail",
                            "thumb",
                            "image",
                            "image_url",
                            "gambar",
                            "photo",
                            "thumbnail_url",
                        ];
                        const nameKeys = [
                            "name",
                            "nama",
                            "product_name",
                            "nama_produk",
                            "title",
                        ];
                        const categoryKeys = [
                            "category",
                            "kategori",
                            "category_name",
                            "nama_kategori",
                        ];
                        const descriptionKeys = ["description", "deskripsi", "desc"];
                        const priceStartKeys = [
                            "price_start",
                            "harga_start",
                            "harga_mulai",
                            "min_price",
                            "harga_min",
                        ];
                        const priceEndKeys = [
                            "price_end",
                            "harga_end",
                            "harga_akhir",
                            "max_price",
                            "harga_max",
                        ];
                        const priceFixKeys = [
                            "price_fix",
                            "harga_fix",
                            "harga",
                            "price",
                        ];

                        const thumbnail = resolve(row, thumbKeys, "");
                        const name = resolve(row, nameKeys, "");
                        const category = resolve(row, categoryKeys, "");
                        const description = resolve(row, descriptionKeys, "");
                        const priceStart = resolve(row, priceStartKeys, "");
                        const priceEnd = resolve(row, priceEndKeys, "");
                        const priceFix = resolve(row, priceFixKeys, "");

                        const thumbCell = findCellByIds(row, thumbKeys);
                        const actionCell = row.getVisibleCells().find((c) => isActionColumn(c.column));

                        return (
                            <div key={row.id} className="rounded-xl border bg-white p-3">
                                <div className="flex items-start gap-3">
                                    {/* Left: Thumbnail */}
                                    <div className="w-24 h-24 rounded-xl overflow-hidden bg-muted flex-shrink-0 flex items-center justify-center">
                                        {thumbCell ? (
                                            <div className="w-full h-full flex items-center justify-center">
                                                {flexRender(thumbCell.column.columnDef.cell, thumbCell.getContext())}
                                            </div>
                                        ) : thumbnail ? (
                                            <img
                                                src={normalizeSrc(thumbnail)}
                                                alt={String(name || "thumbnail")}
                                                className="w-full h-full object-cover"
                                                loading="lazy"
                                            />
                                        ) : (
                                            <div className="text-xs text-muted-foreground">No Image</div>
                                        )}
                                    </div>

                                    {/* Right: Product Info */}
                                    <div className="flex-1 min-w-0">
                                        <div className="text-sm font-semibold truncate">{name || "-"}</div>
                                        <div className="text-xs text-muted-foreground mb-1">{category || "-"}</div>
                                        <div className="text-xs mb-2 break-words">{description || "-"}</div>

                                        <div className="mt-1 flex flex-wrap gap-1 text-xs">
                                            {priceStart && <Pill label="Start">{toIDR(priceStart)}</Pill>}
                                            {priceEnd && <Pill label="End">{toIDR(priceEnd)}</Pill>}
                                            {priceFix && <Pill label="Fix">{toIDR(priceFix)}</Pill>}
                                            {!priceStart && !priceEnd && !priceFix && <span>-</span>}
                                        </div>
                                        {/* END Product Info */}
                                        {/* Action Area */}
                                        {actionCell && (
                                            <div className="flex-shrink-0 self-start">
                                                {flexRender(actionCell.column.columnDef.cell, actionCell.getContext())}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="rounded-md border h-24 flex items-center justify-center text-sm text-muted-foreground">
                        No results.
                    </div>
                )}
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredRowModel().rows.length} row(s)
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
        </div>
    );
}
