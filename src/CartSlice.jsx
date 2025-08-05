import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: []
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action) => {
            const item = action.payload;
            const existing = state.items.find(i => i.name === item.name);
            if (existing) {
                existing.quantity += 1;
            } else {
                state.items.push({ ...item, quantity: 1 });
            }
        },
        updateQuantity: (state, action) => {
            // If decrement flag is present, decrease quantity
            const item = action.payload;
            const existing = state.items.find(i => i.name === item.name);
            if (item.decrement && existing && existing.quantity > 1) {
                existing.quantity -= 1;
            } else {
                state.items = state.items.filter(i => i.name !== item.name);
            }
        },
        removeItem: (state) => {
            state.items = [];
        }
    }
});

export const { addItem, removeItem, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;