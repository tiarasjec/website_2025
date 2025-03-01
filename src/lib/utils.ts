import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import crypto from "crypto";
import { FilterFn, SortingFn, sortingFns } from "@tanstack/table-core";
import { compareItems, rankItem } from "@tanstack/match-sorter-utils";
import { Teams } from "@/lib/interfaces";
import { toast } from "sonner";
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
    // Rank the item
    const itemRank = rankItem(row.getValue(columnId), value);

    // Store the itemRank info
    addMeta({
        itemRank,
    });

    // Return if the item should be filtered in/out
    return itemRank.passed;
};

export const fuzzySort: SortingFn<any> = (rowA, rowB, columnId) => {
    let dir = 0;

    if (rowA.columnFiltersMeta[columnId]) {
        dir = compareItems(
            rowA.columnFiltersMeta[columnId]?.itemRank!,
            rowB.columnFiltersMeta[columnId]?.itemRank!
        );
    }

    return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir;
};

export const generatedSignature = (razorpayOrderId: string, razorpayPaymentId: string) => {
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keySecret) {
        throw new Error("RAZORPAY_SECRET is not set");
    }

    const sig = crypto
        .createHmac("sha256", keySecret)
        .update(razorpayOrderId + "|" + razorpayPaymentId)
        .digest("hex");
    return sig;
};

declare global {
    interface Window {
        Razorpay: any;
    }
}

export interface makePaymentProps {
    productId: string | null;
    productName: string;
    description: string;
    amount: number;
    prefilledData: {
        name: string;
        email: string;
        college: string;
        contact: string;
        events: string[];
        teams: Teams[];
    };
}

interface RazorpaySuccesshandlerArgs {
    razorpay_signature: string;
    razorpay_order_id: string;
    razorpay_payment_id: string;
}

export interface RazorpayOptions {
    key: string;
    amount: number;
    currency: string;
    name: string;
    description?: string;
    image?: string;
    order_id: string;
    handler?: (args: RazorpaySuccesshandlerArgs) => void;
    prefill?: {
        name?: string;
        email?: string;
        contact?: string;
        method?: "card" | "upi" | "netbanking" | "wallet" | "emi";
    };
    notes?: {};
    theme?: {
        hide_topbar?: boolean;
        color?: string;
        backdrop_color?: string;
    };
    modal?: {
        backdropclose?: boolean;
        escape?: boolean;
        handleback?: boolean;
        confirm_close?: boolean;
        ondismiss?: () => void;
        animation?: boolean;
    };
    subscription_id?: string;
    subscription_card_change?: boolean;
    recurring?: boolean;
    callback_url?: string;
    redirect?: boolean;
    customer_id?: string;
    timeout?: number;
    remember_customer?: boolean;
    readonly?: {
        contact?: boolean;
        email?: boolean;
        name?: boolean;
    };
    hidden?: {
        contact?: boolean;
        email?: boolean;
    };
    send_sms_hash?: boolean;
    allow_rotation?: boolean;
    retry?: {
        enabled?: boolean;
        max_count?: boolean;
    };
    config?: {
        display: {
            language: "en" | "ben" | "hi" | "mar" | "guj" | "tam" | "tel";
        };
    };
}

export const makePayment = async ({
    productId = null,
    productName,
    description,
    amount,
    prefilledData,
}: makePaymentProps) => {
    const key = process.env.RAZORPAY_API_KEY;
    const response = await fetch("/api/razorpay", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            amount,
            prefilledData,
        }),
    });
    const { orderId } = await response.json();
    const options: RazorpayOptions = {
        key: key!,
        name: productName,
        image: "https://www.tiara.app/logo.png",
        currency: "INR",
        amount: amount,
        order_id: orderId,
        description: description,
        prefill: {
            name: prefilledData.name,
            email: prefilledData.email,
            contact: prefilledData.contact,
        },
        notes: {
            customerName: prefilledData.name,
            customerEmail: prefilledData.email,
            customerContact: prefilledData.contact,
            college: prefilledData.college,
            events: prefilledData.events.join(", "),
        },

        handler: async function (response) {
            const data = {
                amount: amount,
                orderCreationId: orderId,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature,
                college: prefilledData.college,
                events: prefilledData.events,
                teams: prefilledData.teams,
                phone: prefilledData.contact,
            };

            const result = await fetch("/api/razorpay/verify", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const res = await result.json();
            if (res.isOk) {
                toast.success("Payment Successful");
                window.location.href = "/";
            } else {
                toast.error("Payment Failed , Contact support for help. " + res.error);
            }
        },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.on("payment.failed", function (response: any) {
        toast.error("Payment Failed , Contact support for help. " + response.error.description);
    });
    paymentObject.open();
};
