import Loading from "@/app/loading";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CheckedItem, Teams } from "@/lib/interfaces";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { Suspense, useEffect, useState } from "react";
import { Text } from "../shared/text";
import Info from "@/components/ui/hover/info";
import { Input } from "./input";
import { Label } from "./label";
import RenderCheckedItemsList from "./renderCheckedItemList";

const Buy = React.lazy(() => import("@/components/razorpay/Buy"));

export default function Checkout({
    technicalCheckedItems,
    nontechnicalCheckedItems,
    culturalCheckedItems,
    megaCheckedItems,
    sumOfCheckedItemsAmount,
    itemsWith300,
    selectedEvents,
}: {
    technicalCheckedItems: CheckedItem[];
    nontechnicalCheckedItems: CheckedItem[];
    culturalCheckedItems: CheckedItem[];
    megaCheckedItems: CheckedItem[];
    itemsWith300: CheckedItem[];
    selectedEvents: string[];
    sumOfCheckedItemsAmount: () => number;
}) {
    const session = useSession({
        required: true,
    });
    const [total, setTotal] = useState(0);
    const [phoneNumber, setPhoneNumber] = React.useState("+91");
    useEffect(() => {
        const total = sumOfCheckedItemsAmount();
        setTotal(total);
    }, [sumOfCheckedItemsAmount]);

    let countOf300 =
        technicalCheckedItems.filter((item) => item.amount === 300).length +
        nontechnicalCheckedItems.filter((item) => item.amount === 300).length +
        culturalCheckedItems.filter((item) => item.amount === 300).length +
        megaCheckedItems.filter((item) => item.amount === 300).length;
    const [teamCount, setTeamCount] = useState<Teams[]>([]);
    const [teamNames, setTeamNames] = useState<string[]>([]);
    const [college, setCollege] = React.useState<string>("");

    // Add effect to update team count when events change
    useEffect(() => {
        const allItems = [
            ...technicalCheckedItems,
            ...nontechnicalCheckedItems,
            ...culturalCheckedItems,
            ...megaCheckedItems,
        ];
        const teamEvents = allItems.filter((item) => item.team);

        // Update teamCount with new team events
        setTeamCount(
            teamEvents.map((event) => ({
                event: event.name,
                name: "",
            }))
        );
    }, [technicalCheckedItems, nontechnicalCheckedItems, culturalCheckedItems, megaCheckedItems]);

    const handleTeamNameChange = (id: number, newName: string, event: string) => {
        setTeamCount((teamCount) =>
            teamCount.map((teams) => {
                if (teams.event === event) {
                    teams.name = newName;
                }
                return teams;
            })
        );
    };

    return (
        <Card className="overflow-hidden w-full border-hidden">
            <CardContent className="p-6 text-sm">
                <div className="grid gap-3">
                    <h1 className="text-lg font-semibold">Events summary</h1>

                    {/* Individual Events Section */}
                    {(() => {
                        const allItems = [
                            ...technicalCheckedItems,
                            ...nontechnicalCheckedItems,
                            ...culturalCheckedItems,
                            ...megaCheckedItems,
                        ];
                        const individualEvents = allItems.filter((item) => !item.team);
                        const hasMegaEvent = megaCheckedItems.some((item) => !item.team);

                        if (individualEvents.length > 0) {
                            return (
                                <Accordion type="single" collapsible className="w-full">
                                    <AccordionItem value="individual-events">
                                        <AccordionTrigger className="no-underline">
                                            Individual Events
                                            {hasMegaEvent ? (
                                                <span className="ml-2">
                                                    <Info info="Each mega event (₹450) includes 3 free regular events. Additional regular events are charged in sets of 4 at ₹300 per set." />
                                                </span>
                                            ) : itemsWith300.length > 0 ? (
                                                <span className="ml-2">
                                                    <Info info="Regular events (₹300) are grouped in sets of 4. Each set costs ₹300." />
                                                </span>
                                            ) : null}
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <ul className="grid gap-3">
                                                {individualEvents.map((item) => (
                                                    <li
                                                        className="flex items-center justify-between"
                                                        key={item.key}
                                                    >
                                                        <span className="text-muted-foreground">
                                                            {item.name}
                                                            {item.amount === 450 && " (Mega)"}
                                                        </span>
                                                        <span className="text-muted-foreground">
                                                            ₹{item.amount}
                                                        </span>
                                                    </li>
                                                ))}
                                                {hasMegaEvent && (
                                                    <>
                                                        {individualEvents.filter(
                                                            (item) => item.amount === 450
                                                        ).length > 0 && (
                                                            <li className="text-sm text-muted-foreground italic">
                                                                Each mega event includes 3 free regular events
                                                            </li>
                                                        )}
                                                        {(() => {
                                                            const megaCount = individualEvents.filter(
                                                                (item) => item.amount === 450
                                                            ).length;
                                                            const regularCount = individualEvents.filter(
                                                                (item) => item.amount === 300
                                                            ).length;
                                                            const freeEventsAllowed = megaCount * 3;
                                                            if (regularCount <= freeEventsAllowed) {
                                                                return (
                                                                    <li className="text-sm text-muted-foreground italic">
                                                                        {regularCount} of {freeEventsAllowed}{" "}
                                                                        free regular events selected
                                                                    </li>
                                                                );
                                                            }
                                                            return (
                                                                <li className="text-sm text-muted-foreground italic">
                                                                    {freeEventsAllowed} free events included,{" "}
                                                                    {regularCount - freeEventsAllowed}{" "}
                                                                    additional regular events charged in sets
                                                                    of 4
                                                                </li>
                                                            );
                                                        })()}
                                                    </>
                                                )}
                                            </ul>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            );
                        }
                        return null;
                    })()}

                    {/* Team Events Section */}
                    {(() => {
                        const allItems = [
                            ...technicalCheckedItems,
                            ...nontechnicalCheckedItems,
                            ...culturalCheckedItems,
                            ...megaCheckedItems,
                        ];
                        const teamEvents = allItems.filter((item) => item.team);

                        if (teamEvents.length > 0) {
                            return (
                                <Accordion type="single" collapsible className="w-full">
                                    <AccordionItem value="team-events">
                                        <AccordionTrigger className="no-underline">
                                            Team Events
                                            <span className="ml-2">
                                                <Info info="Team events are charged separately per team" />
                                            </span>
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <ul className="grid gap-3">
                                                {teamEvents.map((item) => (
                                                    <li
                                                        className="flex items-center justify-between"
                                                        key={item.key}
                                                    >
                                                        <span className="text-muted-foreground">
                                                            {item.name}
                                                        </span>
                                                        <span className="text-muted-foreground">
                                                            ₹{item.amount}
                                                        </span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            );
                        }
                        return null;
                    })()}

                    <Separator className="my-2" />
                    <ul className="grid gap-3">
                        <Label htmlFor="text">College</Label>
                        <Input
                            type="text"
                            id="college"
                            aria-label="College"
                            placeholder="Enter your college name"
                            value={college}
                            required
                            onChange={(e) => setCollege(e.target.value)}
                        />
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                            type="tel"
                            id="phone"
                            aria-label="Phone number"
                            placeholder="Enter your phone number"
                            value={phoneNumber}
                            required
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                        {teamCount.length > 0 &&
                            teamCount.map((team, index) => (
                                <>
                                    <Label htmlFor={`team_name_${index}`}>Team Name for {team.event}</Label>
                                    <Input
                                        key={index}
                                        type="text"
                                        id={`team_name_${index}`}
                                        aria-label="Team Name"
                                        placeholder={`Team Name for ${team.event}`}
                                        value={team.name}
                                        required
                                        onChange={(e) =>
                                            handleTeamNameChange(index, e.target.value, team.event)
                                        }
                                    />
                                </>
                            ))}

                        <li className="flex items-center justify-between font-semibold">
                            <span className="text-muted-foreground">Total</span>
                            <span>
                                {"\u20B9"}
                                {total} /-
                            </span>
                        </li>
                    </ul>
                    <Text className="text-xs">
                        By registering for the events, you agree to our{" "}
                        <Link href="/tc">
                            <span className="underline">Terms & Conditions</span>
                        </Link>
                        ,{" "}
                        <Link href="/privacy">
                            <span className="underline">Privacy Policy</span>
                        </Link>{" "}
                        and{" "}
                        <Link href="/refund">
                            <span className="underline">Refund Policy</span>
                        </Link>
                        .
                    </Text>
                    <Suspense fallback={<Loading />}>
                        <Buy
                            teams={teamCount}
                            events={selectedEvents.filter((eventName) => {
                                const allItems = [
                                    ...technicalCheckedItems,
                                    ...nontechnicalCheckedItems,
                                    ...culturalCheckedItems,
                                    ...megaCheckedItems,
                                ];
                                const event = allItems.find((item) => item.name === eventName);
                                return !event?.team;
                            })}
                            name={session.data?.user?.name!}
                            email={session.data?.user?.email!}
                            contact={phoneNumber}
                            amount={total}
                            college={college}
                        />
                    </Suspense>
                </div>
            </CardContent>
        </Card>
    );
}
