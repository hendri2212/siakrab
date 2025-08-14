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
        accessorKey: "name",
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
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Email
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => (
            <div className="lowercase">{row.getValue("email")}</div>
        ),
    },
    {
        accessorKey: "role",
        header: ({ column }) => {
            return (
                <div className="w-fit ml-auto">
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === "asc")
                        }
                    >
                        Role
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            );
        },
        cell: ({ row }) => {
            return (
                <div className="text-right font-medium">
                    {row.getValue("role")}
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
