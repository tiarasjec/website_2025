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
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

interface Event {
    name: string;
    id: string;
    category: string;
    isFinished: boolean;
    costs: number;
}

export default function AdminPage() {
    const [events, setEvents] = useState<Event[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const getEvents = async () => {
        try {
            const res = await fetch("/api/events");
            const data = await res.json();
            console.log(data);
            setEvents(data.events);
        } catch (error) {
            console.error("Failed to fetch events:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const updateEventStatus = async (id: string, isFinished: boolean) => {
        try {
            const response = await fetch(`/api/events/${id}/update-status`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ isFinished }),
            });

            if (!response.ok) throw new Error("Failed to update event status");

            toast.success("Event status updated successfully");
            getEvents(); // Refresh the events list
        } catch (error) {
            toast.error("Failed to update event status");
            console.error("Error updating event status:", error);
        }
    };

    useEffect(() => {
        getEvents();
    }, []);

    if (isLoading) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Events</CardTitle>
                    <CardDescription>Manage all events for Tiara 2025</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-end mb-4">
                        <Skeleton className="h-10 w-[120px]" />
                    </div>
                    <div className="space-y-4">
                        <Skeleton className="h-12 w-full" />
                        <Skeleton className="h-12 w-full" />
                        <Skeleton className="h-12 w-full" />
                    </div>
                </CardContent>
            </Card>
        );
    }

    if (!events.length) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Events</CardTitle>
                    <CardDescription>Manage all events for Tiara 2025</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-end mb-4">
                        <Link href="/admin/events/create">
                            <Button>
                                <PlusIcon className="h-4 w-4 mr-2" />
                                Create Event
                            </Button>
                        </Link>
                    </div>
                    <div className="flex flex-col items-center justify-center h-[200px] text-center">
                        <p className="text-muted-foreground mb-4">No events found</p>
                        <Link href="/admin/events/create">
                            <Button variant="outline">Create your first event</Button>
                        </Link>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Events</CardTitle>
                <CardDescription>Manage all events for Tiara 2025</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex justify-end mb-4">
                    <Link href="/admin/events/create">
                        <Button>
                            <PlusIcon className="h-4 w-4 mr-2" />
                            Create Event
                        </Button>
                    </Link>
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Event Name</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Cost</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {events.map((event) => (
                            <TableRow key={event.id}>
                                <TableCell>
                                    <Link href={`/admin/events/${event.id}`} className="hover:underline">
                                        {event.name}
                                    </Link>
                                </TableCell>
                                <TableCell>{event.category}</TableCell>
                                <TableCell>
                                    {event.isFinished ? (
                                        <span className="text-red-500">Finished</span>
                                    ) : (
                                        <span className="text-green-500">Active</span>
                                    )}
                                </TableCell>
                                <TableCell className="text-right">₹{event.costs}</TableCell>
                                <TableCell>
                                    <div className="flex items-center space-x-2">
                                        <Switch
                                            checked={event.isFinished}
                                            onCheckedChange={(checked) =>
                                                updateEventStatus(event.id, checked)
                                            }
                                        />
                                        <span className="text-sm text-muted-foreground">
                                            {event.isFinished ? "Mark as Active" : "Mark as Finished"}
                                        </span>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
