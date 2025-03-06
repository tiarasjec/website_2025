"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { DataLoading } from "@/components/ui/page-loading";

interface Event {
    name: string;
    id: string;
    category: string;
    costs: number;
    isFinished: boolean;
}

export default function CoordinatorsPage() {
    const [events, setEvents] = useState<Event[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setIsLoading(true);
                const res = await fetch("/api/events");
                if (!res.ok) {
                    throw new Error("Failed to fetch events");
                }
                const data = await res.json();
                setEvents(data.events || []);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Failed to load events");
            } finally {
                setIsLoading(false);
            }
        };

        fetchEvents();
    }, []);

    if (isLoading) {
        return <DataLoading />;
    }

    if (error) {
        return <div className="flex items-center justify-center min-h-[400px] text-red-500">{error}</div>;
    }

    return (
        <div className="container mx-auto py-10">
            <div className="rounded-md border">
                <div className="relative w-full overflow-auto">
                    <Table>
                        <TableCaption>List of Events</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="min-w-[150px]">Event Name</TableHead>
                                <TableHead className="min-w-[100px]">Category</TableHead>
                                <TableHead className="min-w-[100px]">Cost</TableHead>
                                <TableHead className="min-w-[100px]">Status</TableHead>
                                <TableHead className="min-w-[100px]">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {events.map((event, index) => (
                                <TableRow key={event.id || index}>
                                    <TableCell className="font-medium">{event.name}</TableCell>
                                    <TableCell>{event.category}</TableCell>
                                    <TableCell>₹{event.costs}</TableCell>
                                    <TableCell>
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs ${
                                                event.isFinished
                                                    ? "bg-red-100 text-red-800"
                                                    : "bg-green-100 text-green-800"
                                            }`}
                                        >
                                            {event.isFinished ? "Finished" : "Active"}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <Link
                                            href={`/coordinators/${event.name}`}
                                            className="text-primary hover:underline"
                                        >
                                            View Details
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
}
