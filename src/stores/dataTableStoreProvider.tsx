"use client";

import { PropsWithChildren, useRef } from "react";
import { createDataTableStore, DataTableContext, IDataTableStore } from "./dataTableStore";

export const DataTableStoreProvider = ({
    children,
    ...props
}: PropsWithChildren<Partial<IDataTableStore>>) => {
    const storeRef = useRef(createDataTableStore(props));

    return <DataTableContext.Provider value={storeRef.current}>{children}</DataTableContext.Provider>;
};
