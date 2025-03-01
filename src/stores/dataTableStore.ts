import { createContext, useContext } from "react";
import { create } from "zustand";

export type TDataTableExportProps = {
    exportFileName: string;
    excludeColumns?: string[];
    onUserExport?: (data: any[]) => void;
};

export type TDataTableContextMenuProps = {
    enableEdit: boolean;
    enableDelete: boolean;
    extra?: { [menuName: string]: (prop: any) => void };
};

export interface IDataTableStore {
    isSelecting: boolean;
    exportProps?: TDataTableExportProps;
    contextMenuProps?: TDataTableContextMenuProps;
    toggleSelection: () => void;
    setExtraProps: (
        exportProps?: TDataTableExportProps,
        contextMenuProps?: TDataTableContextMenuProps
    ) => void;
}

const createStore = (initProps?: Partial<IDataTableStore>) =>
    create<IDataTableStore>((set) => ({
        isSelecting: initProps?.isSelecting ?? false,
        exportProps: initProps?.exportProps,
        contextMenuProps: initProps?.contextMenuProps,
        toggleSelection: () => set((state) => ({ isSelecting: !state.isSelecting })),
        setExtraProps: (exportProps, contextMenuProps) => set({ exportProps, contextMenuProps }),
    }));

const StoreContext = createContext<ReturnType<typeof createStore> | null>(null);

export const useDataTableStore = () => {
    const store = useContext(StoreContext);
    if (!store) throw new Error("Missing DataTableContext.Provider");
    return store;
};

export { StoreContext as DataTableContext, createStore as createDataTableStore };
