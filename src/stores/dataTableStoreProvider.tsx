"use client";

import { PropsWithChildren } from "react";
import { createDataTableStore, DataTableContext, IDataTableStore } from "@/stores/dataTableStore";
import { useRef } from "react";

export const DataTableStoreProvider = ({ children }: PropsWithChildren) => {
    const storeRef = useRef(createDataTableStore());
    if (!storeRef.current) {
        storeRef.current = createDataTableStore();
    }
    return <DataTableContext.Provider value={storeRef.current}>{children}</DataTableContext.Provider>;
};
