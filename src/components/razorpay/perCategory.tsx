"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";

interface Event {
    name: string;
    key: string;
    amount: number;
    team: boolean;
    isDisabled: boolean;
}

interface RegistrationCount {
    currentCount: number;
    maxLimit: number | null;
    isLimitReached: boolean;
}

interface CheckedItem extends Event {
    checked: boolean;
}

interface CheckboxProps {
    className: string;
    value: string;
    checked: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({ className, value, checked, onChange, disabled }) => {
    return (
        <Input
            type="checkbox"
            className={className}
            value={value}
            checked={checked}
            onChange={onChange}
            disabled={disabled}
        />
    );
};

const OFFLINE_REGISTRATION_EVENTS = [
    "Aim The Target",
    "Buzz Wire",
    // Add other offline-only events here
];

export function EventTabs({
    technical,
    nontechnical,
    cultural,
    mega,
    technicalCheckedItems,
    nontechnicalCheckedItems,
    culturalCheckedItems,
    megaCheckedItems,
    handleCheckboxChange,
}: {
    technical: Event[];
    nontechnical: Event[];
    cultural: Event[];
    mega: Event[];
    technicalCheckedItems: CheckedItem[];
    nontechnicalCheckedItems: CheckedItem[];
    culturalCheckedItems: CheckedItem[];
    megaCheckedItems: CheckedItem[];
    handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>, category: string) => void;
}) {
    const [registrationCounts, setRegistrationCounts] = useState<Record<string, RegistrationCount>>({});

    useEffect(() => {
        const fetchRegistrationCount = async () => {
            try {
                const response = await fetch("/api/events/registration-count?eventName=SPIN THE DISC");
                if (response.ok) {
                    const data = await response.json();
                    setRegistrationCounts((prev) => ({
                        ...prev,
                        "SPIN THE DISC": data,
                    }));
                }
            } catch (error) {
                console.error("Error fetching registration count:", error);
            }
        };

        fetchRegistrationCount();
    }, []);

    const isEventDisabled = (eventName: string) => {
        if (eventName === "SPIN THE DISC") {
            const count = registrationCounts[eventName];
            return count?.isLimitReached || false;
        }
        return false;
    };

    const renderEventItem = (event: Event, category: string, checkedItems: CheckedItem[]) => {
        const isDisabled = isEventDisabled(event.name);

        return (
            <div key={event.key} className="flex flex-col gap-2">
                <div className="flex justify-between items-center p-4">
                    <Label className="mr-2 text-sm sm:text-base">{event.name}</Label>
                    {!isDisabled && (
                        <Checkbox
                            className="w-5 h-5 sm:w-6 sm:h-6 mr-2"
                            value={event.key}
                            checked={checkedItems.some((item) => item.key === event.key)}
                            onChange={(e) => handleCheckboxChange(e, category)}
                        />
                    )}
                </div>
                {event.name === "SPIN THE DISC" && registrationCounts[event.name] && isDisabled && (
                    <Alert variant="default" className="mx-4">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>Registration closed. Maximum limit reached.</AlertDescription>
                    </Alert>
                )}
            </div>
        );
    };

    return (
        <Tabs defaultValue="technical" className="border-hidden p-2 overflow">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 gap-2 h-auto overflow-x-auto">
                <TabsTrigger value="technical" className="text-xs sm:text-sm md:text-base">
                    <span className="whitespace-nowrap">Technical</span>
                </TabsTrigger>
                <TabsTrigger value="nontechnical" className="text-xs sm:text-sm md:text-base">
                    <span className="whitespace-nowrap">Non Technical</span>
                </TabsTrigger>
                <TabsTrigger value="cultural" className="text-xs sm:text-sm md:text-base">
                    <span className="whitespace-nowrap">Cultural</span>
                </TabsTrigger>
                <TabsTrigger value="mega" className="text-xs sm:text-sm md:text-base">
                    <span className="whitespace-nowrap">Mega</span>
                </TabsTrigger>
            </TabsList>
            <div
                className="h-[400px] sm:h-[500px] md:h-[600px] lg:h-[650px] overflow-y-auto border-hidden"
                ref={(el) => {
                    if (el) {
                        el.addEventListener(
                            "wheel",
                            (e) => {
                                if (
                                    (e.deltaY < 0 && el.scrollTop === 0) ||
                                    (e.deltaY > 0 && el.scrollHeight - el.clientHeight - el.scrollTop <= 1)
                                ) {
                                    // At the top or bottom of scroll area
                                    // Don't prevent default in these cases to allow parent scrolling
                                } else {
                                    // In the middle of scrolling content
                                    e.stopPropagation();
                                }
                            },
                            { passive: false }
                        );
                    }
                }}
            >
                <TabsContent value="technical">
                    <Card>
                        <CardHeader className="p-3 sm:p-4">
                            <CardTitle className="text-base sm:text-lg">Technical Events</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 border-hidden p-2 sm:p-4">
                            {technical.map((event) =>
                                renderEventItem(event, "technical", technicalCheckedItems)
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="nontechnical">
                    <Card>
                        <CardHeader className="p-3 sm:p-4">
                            <CardTitle className="text-base sm:text-lg">Non Technical Events</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 p-2 sm:p-4">
                            {nontechnical.map((event) =>
                                renderEventItem(event, "nontechnical", nontechnicalCheckedItems)
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="cultural">
                    <Card>
                        <CardHeader className="p-3 sm:p-4">
                            <CardTitle className="text-base sm:text-lg">Cultural Events</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 p-2 sm:p-4">
                            {cultural.map((event) =>
                                renderEventItem(event, "cultural", culturalCheckedItems)
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="mega">
                    <Card>
                        <CardHeader className="p-3 sm:p-4">
                            <CardTitle className="text-base sm:text-lg">Mega Events</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 p-2 sm:p-4">
                            {mega.map((event) => renderEventItem(event, "mega", megaCheckedItems))}
                        </CardContent>
                    </Card>
                </TabsContent>
            </div>
        </Tabs>
    );
}
