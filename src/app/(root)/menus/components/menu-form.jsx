"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { createMenuItemFunc, updateMenuItemFunc } from "@/redux/menuSlice";

const defaultValues = {
    menuID: "",
    depth: 1,
    parentData: "",
    name: "",
    parentId: "",
};

export const MenuForm = ({ formData, setMenuFormData, editMode }) => {
    const dispatch = useDispatch();

    const menuSchema = z.object({
        menuID: z.string().nonempty("MenuID is required"),
        depth: z.preprocess(
            (val) => (editMode ? 1 : Number(val)),
            editMode ? z.number().optional() : z.number().min(1, "Depth must be at least 1")
        ),
        parentData: editMode
            ? z.string().optional()
            : z.string().nonempty("Parent Data is required"),
        name: z.string().nonempty("Name is required"),
    });

    const form = useForm({
        resolver: zodResolver(menuSchema),
        defaultValues,
    });

    useEffect(() => {
        if (formData) {
            form.reset(formData);
        }
    }, [formData, form]);

    const resetForm = () => {
        const currentMenuID = form.getValues('menuID');
        const lastName = form.getValues('parentData');
        form.reset({ ...defaultValues, menuID: currentMenuID, parentData: lastName });
        setMenuFormData({ ...defaultValues, menuID: currentMenuID, parentData: lastName });
    };

    const onSubmit = async (data) => {
        const menuItemData = {
            menuId: data.menuID,
            label: data.name,
            depth: data.depth,
            parentId: formData.parentId,
            parentData: data.parentData,
            ...(editMode && { id: formData.id }),
        };

        try {
            if (editMode) {
                const response = await dispatch(updateMenuItemFunc({ id: formData.id, menuItemData, menuId: data.menuID }));
                if (response?.error) {
                    console.error("Error updating menu item:", response.error);
                } else {
                    console.log("Menu item updated:", response.payload);
                }
            } else {
                const response = await dispatch(createMenuItemFunc(menuItemData));
                if (response?.error) {
                    console.error("Error creating menu item:", response.error);
                } else {
                    console.log("Menu item created:", response.payload);
                }
            }
        } catch (error) {
            console.error("Unexpected error:", error);
        }

        resetForm();
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    name="menuID"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>MenuID</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Menu ID"
                                    {...field}
                                    readOnly
                                    className="bg-gray-100 cursor-not-allowed"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    name="depth"
                    control={form.control}
                    render={({ field: { onChange, ...field } }) => (
                        <FormItem>
                            <FormLabel>Depth</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="Depth"
                                    onChange={(e) => onChange(Number(e.target.value))}
                                    {...field}
                                    readOnly
                                    className={"bg-gray-100 cursor-not-allowed"}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    name="parentData"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Parent Data</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Parent Data"
                                    {...field}
                                    readOnly
                                    className={"bg-gray-100 cursor-not-allowed"}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    name="name"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter Name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button
                    variant="save"
                    type="submit"
                    className="w-[50%] lg:w-[260px] h-[52px]"
                >
                    {editMode ? "Edit" : "Save"}
                </Button>
            </form>
        </Form>
    );
};