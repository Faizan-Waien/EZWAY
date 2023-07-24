import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const STATUS = Object.freeze({
    IDLE: 'idle',
    ERROR: 'error',
    LOADING: 'loading',
})

const productSlice = createSlice({

    name: 'product',
    initialState: {
        products: [],
        productsStatus: STATUS.IDLE,
    },
    reducers: {},

    extraReducers: (builder) => {

        builder

            .addCase(fetchProducts.pending, (state, action) => {
                state.productsStatus = STATUS.LOADING
            })

            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.products = action.payload
                state.productsStatus = STATUS.IDLE
            })

            .addCase(fetchProducts.rejected, (state, action) => {
                state.productsStatus = STATUS.ERROR
            })
    }
})

export default productSlice.reducer

export const fetchProducts = createAsyncThunk('fetchProducts', async ({page, limit}) => {
    const res = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${page}`)
    const data = await res.json()
    return data.products
})