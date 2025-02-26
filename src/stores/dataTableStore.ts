import { create } from "zustand";
import { createContext, useContext } from "react";
import { TDataTableContextMenuProps, TDataTableExportProps } from "@/components/datatable";

export interface IDataTableStore {
    isSelecting: boolean;
    exportProps?: TDataTableExportProps;
    contextMenuProps?: TDataTableContextMenuProps;
}

export interface DataTableStoreActions {
    toggleSelection: () => void;
    setExtraProps: (
        exportProps?: TDataTableExportProps,
        contextMenuProps?: TDataTableContextMenuProps
    ) => void;
}

export type DataTableStoreType = IDataTableStore & DataTableStoreActions;

export const createDataTableStore = (initProps?: Partial<IDataTableStore>) =>
    create<DataTableStoreType>((set) => ({
        isSelecting: false,
        exportProps: initProps?.exportProps,
        contextMenuProps: initProps?.contextMenuProps,
        toggleSelection: () => set((state) => ({ isSelecting: !state.isSelecting })),
        setExtraProps: (exportProps, contextMenuProps) => set({ exportProps, contextMenuProps }),
    }));

export const DataTableContext = createContext<ReturnType<typeof createDataTableStore> | null>(null);

export const useDataTableStore = () => {
    const store = useContext(DataTableContext);
    if (!store) throw new Error("Missing DataTableContext.Provider in the tree");
    return store;
};
