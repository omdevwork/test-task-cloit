"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { createMenuFunc, getAllMenusFunc } from "@/redux/menuSlice";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const CreateMenuModal = ({ isOpen, closeModal }) => {
    const [menuName, setMenuName] = useState("");
    const dispatch = useDispatch();

    const handleSubmit = async () => {
        if (menuName) {
            // Dispatch createMenuFunc to create the new menu
            await dispatch(createMenuFunc({ name: menuName }));

            // Dispatch getAllMenusFunc to fetch the updated list of menus
            dispatch(getAllMenusFunc());

            // Close the modal
            closeModal();
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={closeModal}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create New Menu</DialogTitle>
                    <DialogDescription>
                        Enter the name for the new menu.
                    </DialogDescription>
                </DialogHeader>

                <Input
                    type="text"
                    placeholder="Menu Name"
                    value={menuName}
                    onChange={(e) => setMenuName(e.target.value)}
                />

                <DialogFooter>
                    <Button onClick={handleSubmit} variant="save">
                        Create
                    </Button>
                    <DialogClose asChild>
                        <Button onClick={closeModal} variant="outline">
                            Cancel
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default CreateMenuModal;