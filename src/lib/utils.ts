import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { FilterFn } from "@tanstack/table-core";
import { rankItem } from "@tanstack/match-sorter-utils";
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
