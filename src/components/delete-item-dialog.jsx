import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

export const DeleteItemDialog = ({ isHovered, onDelete, id, name, menuId }) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <span
                    className={cn(
                        isHovered ? 'opacity-100' : 'opacity-0',
                        'ml-2 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-700 hover:cursor-pointer text-white'
                    )}
                >
                    <Trash2 size={16} />
                </span>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete {name} Menu</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button
                        variant="destructive"
                        onClick={() => onDelete(id, menuId)}
                    >
                        Delete
                    </Button>
                    <DialogClose asChild>
                        <Button variant="outline">
                            Cancel
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};