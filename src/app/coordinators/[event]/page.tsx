"use client";

import { ColumnDef } from "@tanstack/react-table";
import { useState, useEffect } from "react";
import { AdvancedDataTable } from "@/components/datatable";
import { DataTableCheckBox } from "@/components/datatable/data-table-checkbox";
import { Payment } from "@prisma/client";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

async function getData(event: string) {
    const response = await fetch(`/api/coordinators/${event}`);
    const data = await response.json();
    return { users: data.users, totalRegistrations: data.totalRegistrations };
}

export default function IndividualEventPage({ params }: { params: { event: string } }) {
    const filename = decodeURIComponent(params.event);
    const [data, setData] = useState([]);
    const [totalRegistrations, setTotalRegistrations] = useState(0);

    useEffect(() => {
        getData(params.event).then((result) => {
            setData(result.users);
            setTotalRegistrations(result.totalRegistrations);
        });
    }, [params.event]);

    const columns: ColumnDef<Payment>[] = [
        {
            id: "select",
            header: ({ table }) => (
                <DataTableCheckBox
                    {...{
                        checked: table.getIsAllRowsSelected(),
                        indeterminate: table.getIsSomeRowsSelected(),
                        onChange: table.getToggleAllRowsSelectedHandler(),
                    }}
                />
            ),
            cell: ({ row }) => (
                <DataTableCheckBox
                    {...{
                        checked: row.getIsSelected(),
                        disabled: !row.getCanSelect(),
                        indeterminate: row.getIsSomeSelected(),
                        onChange: row.getToggleSelectedHandler(),
                    }}
                />
            ),
            size: 20,
        },
        {
            header: "Name",
            accessorKey: "name",
            id: "name",
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: "email",
            id: "email",
            header: "Email",
            meta: {
                filterVariant: "text",
            },
        },
        {
            accessorKey: "college",
            id: "college",
            header: "College",
            meta: {
                filterVariant: "text",
            },
        },
        {
            accessorKey: "contact",
            id: "contact",
            header: "Contact",
            meta: {
                filterVariant: "text",
            },
        },
    ];

    return (
        <div className="space-y-4">
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl">
                        Total Registrations for {filename}: {totalRegistrations}
                    </CardTitle>
                </CardHeader>
            </Card>

            <AdvancedDataTable<Payment>
                columns={columns}
                data={data}
                exportProps={{
                    exportFileName: filename,
                }}
            />
        </div>
    );
}
