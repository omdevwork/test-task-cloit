"use client";

import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getAllMenusFunc } from "@/redux/menuSlice";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CreateMenuModal from "./create-menu-modal";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export const MenuSelect = ({ onMenuSelect, menus, loading, error, selectedMenuId }) => {

    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        dispatch(getAllMenusFunc());
    }, [dispatch]);

    const handleChange = (value) => {
        onMenuSelect(value);
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="lg:pt-8 flex flex-col gap-[8px]">
            <label htmlFor="menu-select" className="text-[#475467]">
                Menu
            </label>

            <Select value={selectedMenuId} onValueChange={handleChange}>
                <div className="flex gap-x-3">
                    <SelectTrigger id="menu-select" className="lg:w-[350px]">
                        <SelectValue placeholder={menus.length > 0 && "Select a menu"} />
                    </SelectTrigger>
                    <Button
                        variant="save"
                        onClick={openModal}
                        className="p-0 h-10 w-10"
                    >
                        <Plus size={30} />
                    </Button>
                </div>

                <SelectContent>
                    {loading ? (
                        <SelectItem disabled>Loading...</SelectItem>
                    ) : menus.length === 0 ? (
                        <SelectItem disabled>No menu available</SelectItem>
                    ) : (
                        menus.map((menu) => (
                            <SelectItem key={menu.id} value={menu.id}>
                                {menu.name}
                            </SelectItem>
                        ))
                    )}
                </SelectContent>
            </Select>

            <CreateMenuModal isOpen={isModalOpen} closeModal={closeModal} />
        </div>
    );
};