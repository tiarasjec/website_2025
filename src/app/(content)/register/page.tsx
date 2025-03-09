"use client";
import { EventTabs } from "@/components/razorpay/perCategory";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Checkout from "@/components/ui/checkout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { tiaraFont } from "@/lib/fonts";
import { CheckedItem, Event, Events } from "@/lib/interfaces";
import { cn } from "@/lib/utils";
import { UserRole } from "@prisma/client";
import { signIn, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { PageLoading } from "@/components/ui/page-loading";
import { DataLoading } from "@/components/ui/page-loading";
import { RestrictedAccess } from "@/components/ui/restricted-access";

// export const maxDuration = 300;

function processEvents(
    category: string,
    categoriesList: any,
    setEvents: React.Dispatch<React.SetStateAction<Event[]>>
) {
    const eventsData: Event[] = [];
    const categoryEvents = categoriesList[category]?.events[0] || {};

    Object.keys(categoryEvents).forEach((key) => {
        const event = categoryEvents[key];
        eventsData.push({
            name: event.name,
            key: key,
            amount: event.costs,
            team: event.team,
            isDisabled: true,
        });
    });

    setEvents(eventsData);
}

const Register: React.FC = () => {
    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated: async () => {
            await signIn("google");
        },
    });

    const [technicalCheckedItems, setTechnicalCheckedItems] = useState<CheckedItem[]>([]);
    const [nontechnicalCheckedItems, setNontechnicalCheckedItems] = useState<CheckedItem[]>([]);
    const [culturalCheckedItems, setCulturalCheckedItems] = useState<CheckedItem[]>([]);
    const [megaCheckedItems, setMegaCheckedItems] = useState<CheckedItem[]>([]);

    const [teamName, setTeamName] = React.useState("");
    const [technical, setTechnical] = React.useState<Event[]>([]);
    const [nontechnical, setNonTechnical] = React.useState<Event[]>([]);
    const [cultural, setCultural] = React.useState<Event[]>([]);
    const [mega, setMega] = React.useState<Event[]>([]);
    const [hasTeams, setHasTeams] = React.useState<boolean>(false);
    const [teamCount, setTeamCount] = React.useState<number>(0);
    const [selectedEventNames, setSelectedEventNames] = React.useState<string[]>([]);
    const [categories, setCategories] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch("/api/events/active");
                if (!response.ok) throw new Error("Failed to fetch events");
                const data = await response.json();
                setCategories(data);

                // Process events for each category
                processEvents("technical", data, setTechnical);
                processEvents("non_technical", data, setNonTechnical);
                processEvents("cultural", data, setCultural);
                processEvents("mega", data, setMega);
            } catch (error) {
                console.error("Error fetching events:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchEvents();
    }, []);

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, category: string) => {
        const key = event.target.value;
        const isChecked = event.target.checked;
        if (isChecked) {
            if (category === "technical") {
                const selectedEvent = technical.find((event) => event.key === key);
                if (selectedEvent) {
                    setSelectedEventNames([...selectedEventNames, selectedEvent.name]);
                    setTechnicalCheckedItems([...technicalCheckedItems, { ...selectedEvent, checked: true }]);
                }
            } else if (category === "nontechnical") {
                const selectedEvent = nontechnical.find((event) => event.key === key);
                if (selectedEvent) {
                    setSelectedEventNames([...selectedEventNames, selectedEvent.name]);
                    setNontechnicalCheckedItems([
                        ...nontechnicalCheckedItems,
                        { ...selectedEvent, checked: true },
                    ]);
                    if (selectedEvent.team) {
                        setHasTeams(true);
                    }
                }
            } else if (category === "cultural") {
                const selectedEvent = cultural.find((event) => event.key === key);
                if (selectedEvent) {
                    setSelectedEventNames([...selectedEventNames, selectedEvent.name]);
                    setCulturalCheckedItems([...culturalCheckedItems, { ...selectedEvent, checked: true }]);
                }
            } else if (category === "mega") {
                const selectedEvent = mega.find((event) => event.key === key);
                if (selectedEvent) {
                    setSelectedEventNames([...selectedEventNames, selectedEvent.name]);
                    setMegaCheckedItems([...megaCheckedItems, { ...selectedEvent, checked: true }]);
                }
            }
        } else {
            if (category === "technical") {
                const event = technical.find((item) => item.key === key);
                if (event) {
                    setSelectedEventNames(selectedEventNames.filter((name) => name !== event.name));
                }
                setTechnicalCheckedItems(technicalCheckedItems.filter((item) => item.key !== key));
            } else if (category === "nontechnical") {
                const event = nontechnical.find((item) => item.key === key);
                if (event) {
                    setSelectedEventNames(selectedEventNames.filter((name) => name !== event.name));
                }
                const newCheckedItems = nontechnicalCheckedItems.filter((item) => item.key !== key);
                newCheckedItems.find((item) => item.team) ? setHasTeams(true) : setHasTeams(false);
                setNontechnicalCheckedItems(newCheckedItems);
            } else if (category === "cultural") {
                const event = cultural.find((item) => item.key === key);
                if (event) {
                    setSelectedEventNames(selectedEventNames.filter((name) => name !== event.name));
                }
                setCulturalCheckedItems(culturalCheckedItems.filter((item) => item.key !== key));
            } else if (category === "mega") {
                const event = mega.find((item) => item.key === key);
                if (event) {
                    setSelectedEventNames(selectedEventNames.filter((name) => name !== event.name));
                }
                setMegaCheckedItems(megaCheckedItems.filter((item) => item.key !== key));
            }
        }
    };

    const [itemswith300, setItemswith300] = React.useState<CheckedItem[]>([]);

    useEffect(() => {
        const allItems: CheckedItem[] = [
            ...technicalCheckedItems,
            ...nontechnicalCheckedItems,
            ...culturalCheckedItems,
            ...megaCheckedItems,
        ];

        const itemsWithAmount300 = allItems.filter((item) => item.amount === 300);
        setItemswith300(itemsWithAmount300);
    }, [technicalCheckedItems, nontechnicalCheckedItems, culturalCheckedItems, megaCheckedItems]);

    const getSumofCheckedItems = () => {
        // Get all selected items
        const allItems = [
            ...technicalCheckedItems,
            ...nontechnicalCheckedItems,
            ...culturalCheckedItems,
            ...megaCheckedItems,
        ];

        // Separate team events and individual events
        const teamEvents = allItems.filter((item) => item.team);
        const individualEvents = allItems.filter((item) => !item.team);

        let totalSum = 0;

        // Calculate team events total (each team event is charged separately)
        totalSum += teamEvents.reduce((acc, item) => acc + item.amount, 0);

        // Handle individual events
        if (individualEvents.length > 0) {
            // Separate mega events (450) and regular events (300)
            const megaEvents = individualEvents.filter((item) => item.amount === 450);
            const regularEvents = individualEvents.filter((item) => item.amount === 300);

            // If there are mega events
            if (megaEvents.length > 0) {
                // Add cost for all mega events
                totalSum += megaEvents.length * 450;

                // Calculate free regular events (3 per mega event)
                const totalFreeRegularEvents = megaEvents.length * 3;

                // If there are more regular events than free slots
                if (regularEvents.length > totalFreeRegularEvents) {
                    // Calculate cost for additional regular events
                    const additionalEvents = regularEvents.length - totalFreeRegularEvents;
                    const additionalSets = Math.ceil(additionalEvents / 4);
                    totalSum += additionalSets * 300;
                }
            } else {
                // No mega events, handle regular events in sets of 4
                if (regularEvents.length > 0) {
                    const sets = Math.ceil(regularEvents.length / 4);
                    totalSum += sets * 300;
                }
            }

            // Add cost of any other events with different pricing
            const otherEvents = individualEvents.filter((item) => item.amount !== 300 && item.amount !== 450);
            totalSum += otherEvents.reduce((acc, item) => acc + item.amount, 0);
        }

        return totalSum;
    };

    if (status === "loading") {
        return <PageLoading />;
    }

    if (isLoading) {
        return <DataLoading />;
    }

    return (
        <div className="w-full p-2 pt-20 sm:pt-28 md:pt-36 md:px-4 lg:px-8 xl:px-12 mx-auto duration-500">
            <Card className="w-full">
                <CardHeader className="flex flex-col md:flex-row items-start bg-muted/50 p-4">
                    <div className="grid gap-0.5 w-full">
                        <CardTitle className="group flex items-center gap-2 text-lg">
                            <span className={cn("tracking-widest", tiaraFont.className)}>
                                Ti<span className="text-red-500">ar</span>a {"'"}25
                            </span>{" "}
                            Event Registration
                        </CardTitle>
                        <CardDescription className="text-sm">
                            Your name and email are pre-filled from your Google account.
                            <br /> Select the events you want to participate in and complete the payment.
                        </CardDescription>
                    </div>
                </CardHeader>
                <div className="flex flex-col sm:grid sm:grid-cols-2 md:flex md:flex-row md:items-center p-4 gap-4">
                    <div className="flex flex-col w-full md:w-1/2 gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            type="text"
                            id="name"
                            aria-label="Name"
                            placeholder="Name"
                            value={session?.user?.name!}
                            disabled
                        />
                    </div>
                    <div className="flex flex-col w-full md:w-1/2 gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            type="email"
                            id="email"
                            aria-label="Email"
                            placeholder="Email"
                            value={session?.user?.email!}
                            disabled
                        />
                    </div>
                </div>
                <Separator className="my-2" />
                <div className="flex flex-col lg:flex-row">
                    <div className="w-full lg:w-3/5 xl:w-2/3 overflow-auto">
                        <EventTabs
                            {...{ technical, nontechnical, cultural, mega }}
                            technicalCheckedItems={technicalCheckedItems}
                            nontechnicalCheckedItems={nontechnicalCheckedItems}
                            culturalCheckedItems={culturalCheckedItems}
                            megaCheckedItems={megaCheckedItems}
                            handleCheckboxChange={handleCheckboxChange}
                        />
                    </div>
                    <div className="w-full lg:w-2/5 xl:w-1/3">
                        <Checkout
                            technicalCheckedItems={technicalCheckedItems}
                            nontechnicalCheckedItems={nontechnicalCheckedItems}
                            culturalCheckedItems={culturalCheckedItems}
                            megaCheckedItems={megaCheckedItems}
                            itemsWith300={itemswith300}
                            sumOfCheckedItemsAmount={getSumofCheckedItems}
                            selectedEvents={selectedEventNames}
                        />
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default Register;
