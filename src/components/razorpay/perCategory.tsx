import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import Info from "../ui/hover/info";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import React, { useEffect, useState } from "react";

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
                    <Label className="mr-2">{event.name}</Label>
                    {!isDisabled && (
                        <Checkbox
                            className="w-6 h-6 mr-2"
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
        <Tabs defaultValue="technical" className="border-hidden w-full pl-2">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 gap-2 h-auto border-hidden">
                <TabsTrigger value="technical">
                    <span className="flex flex-wrap border">Technical</span>
                </TabsTrigger>
                <TabsTrigger value="nontechnical">
                    <span className="flex flex-wrap">Non Technical</span>
                </TabsTrigger>
                <TabsTrigger value="cultural">
                    <span className="flex flex-wrap">Cultural</span>
                </TabsTrigger>
                <TabsTrigger value="mega">
                    <span className="flex flex-wrap">Mega</span>
                </TabsTrigger>
            </TabsList>
            <div className="h-[400px] overflow-y-auto">
                <TabsContent value="technical">
                    <Card>
                        <CardHeader>
                            <CardTitle>Choose a Technical Events</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 border-hidden">
                            {technical.map((event) =>
                                renderEventItem(event, "technical", technicalCheckedItems)
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="nontechnical">
                    <Card>
                        <CardHeader>
                            <CardTitle>Choose a Non Technical Events</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {nontechnical.map((event) =>
                                renderEventItem(event, "nontechnical", nontechnicalCheckedItems)
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="cultural">
                    <Card>
                        <CardHeader>
                            <CardTitle>Choose a Cultural Events</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {cultural.map((event) =>
                                renderEventItem(event, "cultural", culturalCheckedItems)
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="mega">
                    <Card>
                        <CardHeader>
                            <CardTitle>Choose a Mega Events</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {mega.map((event) => renderEventItem(event, "mega", megaCheckedItems))}
                        </CardContent>
                    </Card>
                </TabsContent>
            </div>
        </Tabs>
    );
}
