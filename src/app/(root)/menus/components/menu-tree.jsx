import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getMenuByIdFunc } from "@/redux/menuSlice";
import { Tree } from "@/components/tree";
import { Loader2 } from "lucide-react";

export const MenuTree = ({ selectedMenuId, onPlusClick, onEditClick }) => {
    const dispatch = useDispatch();
    const { menu, loading, error } = useSelector((state) => state.menu);
    console.log("🚀 ~ MenuTree ~ menu:", menu)
    const [selectedMenu, setSelectedMenu] = useState(null);

    useEffect(() => {
        if (selectedMenuId) {
            dispatch(getMenuByIdFunc(selectedMenuId));
        }
    }, [dispatch, selectedMenuId]);

    useEffect(() => {
        if (menu) {
            setSelectedMenu(menu);
        }
    }, [menu]);

    if (loading) {
        return <div className="flex justify-center items-center w-full">
            <Loader2 size={20} className="animate-spin" />
        </div>
    }

    if (error) {
        return <div className="text-center">
            <Loader2 size={20} className="animate-spin" />
        </div>
    }

    return (
        <div>
            {selectedMenu ? (
                <Tree
                    items={selectedMenu.items}
                    menuId={selectedMenu.id}
                    onPlusClick={onPlusClick}
                    onEditClick={onEditClick}
                />
            ) : (
                <p>Select a menu to view its tree</p>
            )}
        </div>
    );
};