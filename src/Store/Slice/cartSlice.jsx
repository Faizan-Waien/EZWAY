import { createSlice } from '@reduxjs/toolkit'


const cartSlice = createSlice({

    name: 'cart',
    initialState: {
        cart: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
    },
    reducers: {

        addProduct: (state, action) => {
            // state.push(action.payload)
            const productExist = state.cart.find((item) => item.id === action.payload.id);
            if (productExist) {
                productExist.quantity++;
            } else {
                state.cart.push({ ...action.payload, quantity: 1 });
            }
            localStorage.setItem('cartItems', JSON.stringify(state.cart))
        },

        removeProduct(state, action) {
            const removeItem = state.cart.filter((item) => item.id !== action.payload)
            state.cart = removeItem
            localStorage.setItem('cartItems', JSON.stringify(state.cart))
        },

        clearAll(state, action) {
            state.cart = []
            localStorage.setItem('cartItems', JSON.stringify(state.cart))
        },

        increment: (state, action) => {
            const item = state.cart.find((item) => item.id === action.payload);
            item.quantity++;
            localStorage.setItem('cartItems', JSON.stringify(state.cart))
        },

        decrement: (state, action) => {
            const item = state.cart.find((item) => item.id === action.payload);
            // if (item.quantity === 1) {
            //     item.quantity = 1
            if (item.quantity === 1) {
                const removeItem = state.cart.filter((item) => item.id !== action.payload)
                state.cart = removeItem
            } else {
                item.quantity--;
            }
            localStorage.setItem('cartItems', JSON.stringify(state.cart))
        },
    }
})

export const { addProduct, removeProduct, clearAll, increment, decrement } = cartSlice.actions
export default cartSlice.reducer