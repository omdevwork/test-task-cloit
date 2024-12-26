'use client';

import React, { useEffect, useState } from 'react';
import { ChevronRight, FilePenLine, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { DeleteItemDialog } from './delete-item-dialog';
import { deleteMenuItemFunc } from '@/redux/menuSlice';
import { useDispatch } from 'react-redux';

export const Tree = ({ items, className, onPlusClick, onEditClick, menuId }) => {
    const [expandedItems, setExpandedItems] = useState(() => {
        const initialState = {};
        const setExpanded = (items) => {
            items.forEach((item) => {
                initialState[item.id] = true;
                if (item.children) {
                    setExpanded(item.children);
                }
            });
        };
        setExpanded(items);
        return initialState;
    });
    const dispatch = useDispatch();

    const toggleAll = (expand) => {
        const newExpandedState = {};
        const updateState = (items) => {
            items.forEach((item) => {
                newExpandedState[item.id] = expand;
                if (item.children) {
                    updateState(item.children);
                }
            });
        };
        updateState(items);
        setExpandedItems(newExpandedState);
    };

    const handleDelete = async (id, menuId) => {
        dispatch(deleteMenuItemFunc({ id, menuId }));
    };
    
    useEffect(() => {
        const initialState = {};
        const setExpanded = (items) => {
            items.forEach((item) => {
                initialState[item.id] = true;
                if (item.children) {
                    setExpanded(item.children);
                }
            });
        };
        setExpanded(items);
        setExpandedItems(initialState);
    }, [items]);

    return (
        <div className={cn('select-none w-full max-w-full overflow-x-auto', className)}>
            <div className="flex flex-wrap gap-4 pb-4 font-sans">
                <Button className="text-sm sm:text-base whitespace-nowrap" onClick={() => toggleAll(true)}>
                    Expand All
                </Button>
                <Button
                    className="text-sm sm:text-base whitespace-nowrap"
                    variant="outline"
                    onClick={() => toggleAll(false)}
                >
                    Collapse All
                </Button>
            </div>
            <div className="pl-3 sm:pl-5 min-w-[280px]">
                {items.map((item, index) => (
                    <TreeItem
                        key={item.id}
                        {...item}
                        expandedItems={expandedItems}
                        setExpandedItems={setExpandedItems}
                        isLast={index === items.length - 1}
                        level={0}
                        parentData={[]}
                        onPlusClick={onPlusClick}
                        onEditClick={onEditClick}
                        menuId={menuId}
                        onDelete={handleDelete}
                    />
                ))}
            </div>
        </div>
    );
};

const TreeItem = ({
    id,
    label,
    isPlus,
    children,
    expandedItems,
    setExpandedItems,
    isLast,
    level,
    parentData,
    onPlusClick,
    menuId,
    onDelete,
    onEditClick
}) => {
    const isExpanded = expandedItems[id];
    const hasChildren = children && children.length > 0;
    const [isHovered, setIsHovered] = useState(false);

    const toggleExpand = () => {
        setExpandedItems((prev) => ({ ...prev, [id]: !isExpanded }));
    };

    const handlePlusClick = () => {
        const data = {
            menuId: menuId,
            parentData: label,
            parentId: id,
            depth: level + 1,
        };
        onPlusClick(data);
    };

    const handleEditClick = () => {
        const immediateParent = parentData[parentData.length - 1];
        const data = {
            menuId: menuId,
            parentData: immediateParent?.label,
            parentId: immediateParent?.id,
            depth: level,
            label,
            id,
        };
        onEditClick(data);
    };

    return (
        <div className="relative">
            <div
                className="relative flex items-center group"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div
                    className="absolute w-3 sm:w-4 h-px bg-gray-300"
                    style={{ left: '-12px' }}
                />

                <div className="flex items-center py-2 min-w-0">
                    {hasChildren && (
                        <ChevronRight
                            className={cn(
                                "h-4 w-4 shrink-0 transition-transform cursor-pointer",
                                isExpanded && "rotate-90"
                            )}
                            onClick={toggleExpand}
                        />
                    )}
                    {!hasChildren && <div className="w-4 shrink-0" />}
                    <span
                        className="ml-1 cursor-pointer select-none truncate"
                        onClick={hasChildren ? toggleExpand : undefined}
                    >
                        {label}
                    </span>
                    <span
                        className={cn(
                            isHovered ? "opacity-100" : "opacity-0",
                            "ml-2 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[blue] hover:cursor-pointer text-white"
                        )}
                        onClick={handlePlusClick}
                    >
                        <Plus size={16} />
                    </span>
                    <span
                        className={cn(
                            isHovered ? 'opacity-100' : 'opacity-0',
                            'ml-2 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-black hover:cursor-pointer text-white'
                        )}
                        onClick={handleEditClick}
                    >
                        <FilePenLine size={16} />
                    </span>
                    <DeleteItemDialog
                        isHovered={isHovered}
                        onDelete={onDelete}
                        id={id}
                        name={label}
                        menuId={menuId}
                    />
                </div>
            </div>

            {hasChildren && isExpanded && (
                <div className="relative ml-3 sm:ml-4 pl-3 sm:pl-4 border-l border-gray-300 dark:border-gray-700">
                    {children.map((child, index) => (
                        <TreeItem
                            key={child.id}
                            {...child}
                            expandedItems={expandedItems}
                            setExpandedItems={setExpandedItems}
                            isLast={index === children.length - 1}
                            level={level + 1}
                            parentData={[...parentData, { id, label }]}
                            onPlusClick={onPlusClick}
                            onEditClick={onEditClick}
                            onDelete={onDelete}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};