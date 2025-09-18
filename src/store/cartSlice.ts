import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CartItem = {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
};

export type CartState = {
  items: Record<number, CartItem>;
};

const initialState: CartState = {
  items: {},
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Omit<CartItem, "quantity"> & { quantity?: number }>) => {
      const { id, title, price, image } = action.payload;
      const qty = action.payload.quantity ?? 1;
      const existing = state.items[id];
      if (existing) {
        existing.quantity += qty;
      } else {
        state.items[id] = { id, title, price, image, quantity: qty };
      }
    },
    removeFromCart: (state, action: PayloadAction<{ id: number }>) => {
      delete state.items[action.payload.id];
    },
    setQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const item = state.items[action.payload.id];
      if (item) {
        item.quantity = Math.max(1, action.payload.quantity);
      }
    },
    clearCart: (state) => {
      state.items = {};
    },
  },
});

// persistence helpers
export function serializeCart(items: Record<number, CartItem>): string {
  return JSON.stringify(items);
}


export const { addToCart, removeFromCart, setQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

