"use client";

import { useEffect, useState } from "react";
import { BreadCrumb } from "@/components/bread-crumb";
import { MenuSelect } from "./components/menu-select";
import { MenuTree } from "./components/menu-tree";
import { MenuForm } from "./components/menu-form";
import { useSelector } from "react-redux";

const InitFormData = {
  menuID: "",
  depth: 1,
  parentData: "",
  name: "",
  parentId: "",
}

const Menus = () => {

  const { menus, loading, error } = useSelector((state) => state.menu);

  const [selectedMenuId, setSelectedMenuId] = useState(null);
  const [menuFormData, setMenuFormData] = useState(InitFormData);
  const [editMode, setEditMode] = useState(false);

  const handleMenuSelect = (id) => {
    setSelectedMenuId(id);
    setMenuFormData(InitFormData);
  };

  const handlePlusClick = (data) => {
    setEditMode(false);
    setMenuFormData({
      menuID: data.menuId,
      depth: data.depth,
      parentData: data.parentData,
      parentId: data.parentId,
      name: "",
    });
  };

  const handleEditClick = (data) => {
    setEditMode(true);
    setMenuFormData({
      menuID: data.menuId,
      depth: data.depth,
      parentData: data.parentData,
      parentId: data.parentId,
      name: data.label,
      id: data.id,
    });
  };

  useEffect(() => {
    if (menus.length > 0) {
      if (!selectedMenuId) {
        setSelectedMenuId(menus[0].id);
      }
    }
    if (selectedMenuId) {
      const selectedMenu = menus.find(menu => menu.id === selectedMenuId);
      if (selectedMenu) {
        setMenuFormData({
          menuID: selectedMenu.id,
          depth: selectedMenu.depth,
          parentData: selectedMenu.parentData,
          parentId: selectedMenu.parentId,
        });
      }
    }
  }, [selectedMenuId, menus]);

  return (
    <>
      <BreadCrumb name={"Menus"} />
      <MenuSelect menus={menus} loading={loading} error={error} selectedMenuId={selectedMenuId} onMenuSelect={handleMenuSelect} />
      <div className="grid lg:grid-cols-2 pt-8 gap-y-8 lg:gap-y-0">
        <MenuTree
          selectedMenuId={selectedMenuId}
          onPlusClick={handlePlusClick}
          onEditClick={handleEditClick}
        />
        <MenuForm
          formData={menuFormData}
          setMenuFormData={setMenuFormData}
          editMode={editMode}
        />
      </div>
    </>
  );
};

export default Menus;