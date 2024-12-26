import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstance";

export const createMenuFunc = createAsyncThunk(
  "menu/createMenu",
  async (menuData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/menu", menuData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createMenuItemFunc = createAsyncThunk(
  "menu/createMenuItem",
  async (itemData, { rejectWithValue, dispatch }) => {
    try {
      const response = await axiosInstance.post("/menu/item", itemData);
      
      dispatch(getMenuByIdFunc(itemData.menuId));
      
      if (itemData.parentId) {
        dispatch(updateMenuTree({ parentId: itemData.parentId, newItem: response.data }));
      }
      
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getAllMenusFunc = createAsyncThunk(
  "menu/getAllMenus",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/menu");
      return response.data.map((menu) => ({
        id: menu.id,
        name: menu.name,
      }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateMenuItemFunc = createAsyncThunk(
  "menu/updateMenuItem",
  async ({ id, menuItemData, menuId }, { rejectWithValue, dispatch }) => {    
    try {
      const response = await axiosInstance.put(`/menu/item/${id}`, menuItemData);
      dispatch(getMenuByIdFunc(menuId));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteMenuItemFunc = createAsyncThunk(
  "menu/deleteMenuItem",
  async ({ id, menuId }, { rejectWithValue, dispatch }) => {
    try {
      await axiosInstance.delete(`/menu/item/${id}`);
      dispatch(getMenuByIdFunc(menuId));
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getMenuByIdFunc = createAsyncThunk(
  "menu/getMenuById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/menu/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const menuSlice = createSlice({
  name: "menu",
  initialState: {
    menus: [],
    menuItems: [],
    menu: null,
    loading: false,
    error: null,
  },
  reducers: {
    setLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    setMenus: (state, action) => {
      state.menus = action.payload;
      state.loading = false;
    },
    setMenuItems: (state, action) => {
      state.menuItems = action.payload;
      state.loading = false;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    addMenu: (state, action) => {
      state.menus.push(action.payload);
    },
    addMenuItem: (state, action) => {
      state.menuItems.push(action.payload);
    },
    updateMenuItem: (state, action) => {
      const index = state.menuItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.menuItems[index] = action.payload;
      }
    },
    deleteMenuItem: (state, action) => {
      state.menuItems = state.menuItems.filter(
        (item) => item.id !== action.payload
      );
    },
    setSingleMenu: (state, action) => {
      state.menu = action.payload;
    },
    updateMenuTree: (state, action) => {
      const { parentId, newItem } = action.payload;
      const updateTree = (items) => {
        return items.map((item) => {
          if (item.id === parentId) {
            if (!item.children) {
              item.children = [];
            }
            item.children.push(newItem);
          } else if (item.children) {
            item.children = updateTree(item.children);
          }
          return item;
        });
      };

      state.menus = updateTree(state.menus);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createMenuFunc.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createMenuFunc.fulfilled, (state, action) => {
        state.menus.push(action.payload);
        state.loading = false;
      })
      .addCase(createMenuFunc.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getMenuByIdFunc.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMenuByIdFunc.fulfilled, (state, action) => {
        state.menu = action.payload;
        state.loading = false;
      })
      .addCase(getMenuByIdFunc.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createMenuItemFunc.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createMenuItemFunc.fulfilled, (state, action) => {
        state.menuItems.push(action.payload);
        state.loading = false;
      })
      .addCase(createMenuItemFunc.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAllMenusFunc.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllMenusFunc.fulfilled, (state, action) => {
        state.menus = action.payload;
        state.loading = false;
      })
      .addCase(getAllMenusFunc.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateMenuItemFunc.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateMenuItemFunc.fulfilled, (state, action) => {
        const index = state.menuItems.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) {
          state.menuItems[index] = action.payload;
        }
        state.loading = false;
      })
      .addCase(updateMenuItemFunc.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteMenuItemFunc.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMenuItemFunc.fulfilled, (state, action) => {
        state.menuItems = state.menuItems.filter(
          (item) => item.id !== action.payload
        );
        state.loading = false;
      })
      .addCase(deleteMenuItemFunc.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setLoading,
  setMenus,
  setMenuItems,
  setError,
  addMenu,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
  setSingleMenu,
  updateMenuTree,
} = menuSlice.actions;

export default menuSlice.reducer;