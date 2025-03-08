"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface Coordinator {
    name: string;
    phone: string;
    email?: string;
}

const coordinatorSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    phone: z.string().min(10, "Phone must be at least 10 characters"),
    email: z.string().email("Invalid email").optional(),
});

const eventFormSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    category: z.string().min(2, "Category must be at least 2 characters"),
    rules: z.string().transform((val) => val.split("\n").filter((rule) => rule.trim() !== "")),
    prerequisites: z
        .string()
        .optional()
        .transform((val) => (val ? val.split("\n").filter((prereq) => prereq.trim() !== "") : [])),
    general_rules: z
        .string()
        .optional()
        .transform((val) => (val ? val.split("\n").filter((rule) => rule.trim() !== "") : [])),
    thumbnail: z.string().url("Must be a valid URL"),
    startTime: z.string(),
    endTime: z.string().optional(),
    costs: z
        .string()
        .transform((val) => {
            const parsed = parseInt(val);
            return isNaN(parsed) ? 0 : parsed;
        })
        .pipe(z.number().min(0, "Cost must be a positive number")),
    teamEvent: z.boolean().default(false),
    facultyCoordinators: z.array(coordinatorSchema).min(1, "At least one faculty coordinator is required"),
    studentCoordinators: z
        .array(
            z.object({
                name: z.string().min(2, "Name must be at least 2 characters"),
                phone: z.string().min(10, "Phone must be at least 10 characters"),
                email: z.string().email("Invalid email").optional().or(z.literal("")),
            })
        )
        .min(1, "At least one student coordinator is required"),
});

export default function CreateEventPage() {
    const router = useRouter();
    const form = useForm<z.infer<typeof eventFormSchema>>({
        resolver: zodResolver(eventFormSchema),
        defaultValues: {
            teamEvent: false,
            facultyCoordinators: [{ name: "", phone: "", email: "" }],
            studentCoordinators: [{ name: "", phone: "", email: "" }],
            costs: 0,
        },
    });

    async function onSubmit(values: z.infer<typeof eventFormSchema>) {
        try {
            const response = await fetch("/api/events/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...values,
                    costs: Number(values.costs),
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to create event");
            }

            toast.success("Event created successfully");
            router.push("/admin/events");
        } catch (error) {
            toast.error("Failed to create event");
        }
    }

    return (
        <div className="max-w-5xl mx-auto">
            <Card className="shadow-lg border-2">
                <CardHeader className="space-y-1 bg-muted/50 border-b px-6 py-4">
                    <CardTitle className="text-2xl font-bold">Create New Event</CardTitle>
                    <CardDescription>Add a new event to Tiara 2025</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <div className="space-y-6">
                                <div className="grid gap-6">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-base">Event Name</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        className="h-11"
                                                        placeholder="Enter event name"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="description"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-base">Description</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        className="min-h-[120px] resize-y"
                                                        placeholder="Event description"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="grid gap-6">
                                    <FormField
                                        control={form.control}
                                        name="category"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-base">Category</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        className="h-11"
                                                        placeholder="Event category"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <div className="grid gap-6 md:grid-cols-2">
                                        <FormField
                                            control={form.control}
                                            name="startTime"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-base">Start Time</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            className="h-11"
                                                            type="datetime-local"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="endTime"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-base">End Time</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            className="h-11"
                                                            type="datetime-local"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>

                                <div className="grid gap-6">
                                    <FormField
                                        control={form.control}
                                        name="rules"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-base">Rules</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        className="min-h-[150px] resize-y"
                                                        placeholder="Enter rules (one per line)"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormDescription>
                                                    Enter each rule on a new line
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="prerequisites"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-base">
                                                    Prerequisites (Optional)
                                                </FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        className="min-h-[150px] resize-y"
                                                        placeholder="Enter prerequisites (one per line) - Optional"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormDescription>
                                                    Enter each prerequisite on a new line (if any)
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="general_rules"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-base">
                                                    General Rules (Optional)
                                                </FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        className="min-h-[150px] resize-y"
                                                        placeholder="Enter general rules (one per line) - Optional"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormDescription>
                                                    Enter each general rule on a new line (if any)
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="grid gap-6">
                                    <FormField
                                        control={form.control}
                                        name="thumbnail"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-base">Thumbnail URL</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        className="h-11"
                                                        placeholder="Image URL"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="costs"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-base">Cost (in INR)</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        className="h-11"
                                                        type="number"
                                                        min="0"
                                                        step="1"
                                                        {...field}
                                                        onChange={(e) => field.onChange(e.target.value)}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="teamEvent"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm">
                                                <div className="space-y-0.5">
                                                    <FormLabel className="text-base">Team Event</FormLabel>
                                                    <FormDescription>Is this a team event?</FormDescription>
                                                </div>
                                                <FormControl>
                                                    <Switch
                                                        checked={field.value}
                                                        onCheckedChange={field.onChange}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-lg font-medium mb-4">Faculty Coordinators</h3>
                                        <div className="space-y-4">
                                            {form.watch("facultyCoordinators").map((_, index) => (
                                                <div
                                                    key={index}
                                                    className="grid md:grid-cols-4 gap-4 items-start p-4 border rounded-lg bg-muted/50"
                                                >
                                                    <FormField
                                                        control={form.control}
                                                        name={`facultyCoordinators.${index}.name`}
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormControl>
                                                                    <Input
                                                                        className="h-11"
                                                                        placeholder="Name"
                                                                        {...field}
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                    <FormField
                                                        control={form.control}
                                                        name={`facultyCoordinators.${index}.phone`}
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormControl>
                                                                    <Input
                                                                        className="h-11"
                                                                        placeholder="Phone"
                                                                        {...field}
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                    <FormField
                                                        control={form.control}
                                                        name={`facultyCoordinators.${index}.email`}
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormControl>
                                                                    <Input
                                                                        className="h-11"
                                                                        placeholder="Email"
                                                                        {...field}
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                    <Button
                                                        type="button"
                                                        variant="destructive"
                                                        className="mt-0"
                                                        onClick={() => {
                                                            const current =
                                                                form.getValues("facultyCoordinators");
                                                            if (current.length > 1) {
                                                                form.setValue(
                                                                    "facultyCoordinators",
                                                                    current.filter((_, i) => i !== index)
                                                                );
                                                            }
                                                        }}
                                                    >
                                                        Remove
                                                    </Button>
                                                </div>
                                            ))}
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() => {
                                                    const current = form.getValues("facultyCoordinators");
                                                    form.setValue("facultyCoordinators", [
                                                        ...current,
                                                        { name: "", phone: "", email: "" },
                                                    ]);
                                                }}
                                            >
                                                Add Faculty Coordinator
                                            </Button>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-medium mb-4">Student Coordinators</h3>
                                        <div className="space-y-4">
                                            {form.watch("studentCoordinators").map((_, index) => (
                                                <div
                                                    key={index}
                                                    className="grid md:grid-cols-4 gap-4 items-start p-4 border rounded-lg bg-muted/50"
                                                >
                                                    <FormField
                                                        control={form.control}
                                                        name={`studentCoordinators.${index}.name`}
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormControl>
                                                                    <Input
                                                                        className="h-11"
                                                                        placeholder="Name"
                                                                        {...field}
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                    <FormField
                                                        control={form.control}
                                                        name={`studentCoordinators.${index}.phone`}
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormControl>
                                                                    <Input
                                                                        className="h-11"
                                                                        placeholder="Phone"
                                                                        {...field}
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                    <FormField
                                                        control={form.control}
                                                        name={`studentCoordinators.${index}.email`}
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormControl>
                                                                    <Input
                                                                        className="h-11"
                                                                        placeholder="Email"
                                                                        {...field}
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                    <Button
                                                        type="button"
                                                        variant="destructive"
                                                        className="mt-0"
                                                        onClick={() => {
                                                            const current =
                                                                form.getValues("studentCoordinators");
                                                            if (current.length > 1) {
                                                                form.setValue(
                                                                    "studentCoordinators",
                                                                    current.filter((_, i) => i !== index)
                                                                );
                                                            }
                                                        }}
                                                    >
                                                        Remove
                                                    </Button>
                                                </div>
                                            ))}
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() => {
                                                    const current = form.getValues("studentCoordinators");
                                                    form.setValue("studentCoordinators", [
                                                        ...current,
                                                        { name: "", phone: "", email: "" },
                                                    ]);
                                                }}
                                            >
                                                Add Student Coordinator
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end pt-6 border-t">
                                <Button type="submit" size="lg">
                                    Create Event
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
