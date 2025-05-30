"use client";

import { Cell, flexRender } from "@tanstack/react-table";
import { useSortable } from "@dnd-kit/sortable";
import * as React from "react";
import { CSSProperties } from "react";
import { CSS } from "@dnd-kit/utilities";
import { TableCell } from "@/components/ui/table";
import { getCommonPinningStyles } from "@/lib/columns";
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuSeparator,
    ContextMenuShortcut,
    ContextMenuSub,
    ContextMenuSubContent,
    ContextMenuSubTrigger,
    ContextMenuTrigger,
} from "@/components/ui/context-menu";
import _ from "lodash/isEmpty";
import { useDataTableStore } from "@/stores/dataTableStore";
import ReactHotkeys from "react-hot-keys";

interface IDataTableCellEdit<T> {
    cell: Cell<T, unknown>;
    onEdit?: () => void;
    onDelete?: () => void;
}

export function DataTableCell<T>({ cell, onEdit, onDelete }: IDataTableCellEdit<T>) {
    const { isDragging, setNodeRef, transform } = useSortable({
        id: cell.column.id,
    });
    const store = useDataTableStore();
    const { contextMenuProps, isSelecting } = store();
    const pinStyle = getCommonPinningStyles(cell.column);
    const combinedStyle: CSSProperties = {
        opacity: isDragging ? 0.8 : 1,
        position: "relative",
        transform: CSS.Translate.toString(transform), // translate instead of transform to avoid squishing
        transition: "width transform 0.2s ease-in-out",
        width: cell.column.getSize(),
        zIndex: isDragging ? 1 : 0,
        ...(pinStyle || {}),
    };
    const onContextMenuItemClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        handler?: (probably: T | undefined) => void,
        withData = false
    ) => {
        event.stopPropagation();
        handler && handler(withData ? cell.row.original : undefined);
    };
    const showContextMenu = isSelecting !== true && contextMenuProps !== undefined;

    if (showContextMenu) {
        return (
            <TableCell style={combinedStyle} ref={setNodeRef}>
                <ContextMenu>
                    <ContextMenuTrigger className={"block"}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </ContextMenuTrigger>
                    <ContextMenuContent className="w-36">
                        {contextMenuProps.enableEdit && (
                            <ContextMenuItem onClick={(event) => onContextMenuItemClick(event, onEdit)}>
                                Edit
                                <ReactHotkeys
                                    keyName={"command+e,control+e"}
                                    onKeyDown={() => onEdit && onEdit()}
                                >
                                    <ContextMenuShortcut>⌘ E</ContextMenuShortcut>
                                </ReactHotkeys>
                            </ContextMenuItem>
                        )}
                        {!_(contextMenuProps?.extra) && <ContextMenuSeparator />}
                        {!_(contextMenuProps?.extra) && (
                            <ContextMenuSub>
                                <ContextMenuSubTrigger>More Tools</ContextMenuSubTrigger>
                                <ContextMenuSubContent className="w-48">
                                    {Object.keys(contextMenuProps?.extra).map((name, index) => (
                                        <ContextMenuItem
                                            // @ts-ignore
                                            onClick={(event) =>
                                                onContextMenuItemClick(
                                                    event,
                                                    contextMenuProps.extra?.[name],
                                                    true
                                                )
                                            }
                                            key={"Sub-data-table-context-menu-item-".concat(index.toString())}
                                        >
                                            {name}
                                        </ContextMenuItem>
                                    ))}
                                </ContextMenuSubContent>
                            </ContextMenuSub>
                        )}
                        {contextMenuProps.enableDelete && <ContextMenuSeparator />}
                        {contextMenuProps.enableDelete && (
                            <ContextMenuItem onClick={(event) => onContextMenuItemClick(event, onDelete)}>
                                <span className={"text-red-500"}>Delete</span>
                                <ReactHotkeys
                                    keyName={"command+d,control+d"}
                                    onKeyDown={() => onDelete && onDelete()}
                                >
                                    <ContextMenuShortcut>
                                        <span className={"text-red-500"}>⌘ D</span>
                                    </ContextMenuShortcut>
                                </ReactHotkeys>
                            </ContextMenuItem>
                        )}
                    </ContextMenuContent>
                </ContextMenu>
            </TableCell>
        );
    }
    return (
        <TableCell style={combinedStyle} ref={setNodeRef}>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
    );
}
