import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { STATUS } from './productSlice'

const singleProductSlice = createSlice({

    name: 'singleProduct',
    initialState: {
        singleProduct: [],
        singleProductStatus: STATUS.IDLE,
    },
    reducers: {},

    extraReducers: (builder) => {
       
        builder

            .addCase(fetchSingleProduct.pending, (state, action) => {
                state.singleProductStatus = STATUS.LOADING
            })

            .addCase(fetchSingleProduct.fulfilled, (state, action) => {
                state.singleProduct = action.payload
                state.singleProductStatus = STATUS.IDLE
            })

            .addCase(fetchSingleProduct.rejected, (state, action) => {
                state.singleProductStatus = STATUS.ERROR
            })
    }
})

export default singleProductSlice.reducer

export const fetchSingleProduct = createAsyncThunk('fetchSingleProduct', async (itemID) => {
    const res = await fetch(`https://dummyjson.com/products/${itemID}`)
    const data = await res.json()
    return data
})

