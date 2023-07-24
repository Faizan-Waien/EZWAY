import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { STATUS } from "./productSlice";

const singleCategorySlice = createSlice({

name: 'singleCategory',
initialState: {
    singleCategory: [],
    singleCategoryStatus: STATUS.IDLE,
},
reducers: {},

extraReducers: (builder) => {

    builder

    .addCase(fetchSingleCategory.pending, (state, action) => {
        state.singleCategoryStatus = STATUS.LOADING
    })

    .addCase(fetchSingleCategory.fulfilled, (state, action) => {
        state.singleCategory = action.payload
        state.singleCategoryStatus = STATUS.IDLE
    })

    .addCase(fetchSingleCategory.rejected, (state, action) => {
        state.singleCategoryStatus = STATUS.ERROR
    })
}
})

export default singleCategorySlice.reducer

export const fetchSingleCategory = createAsyncThunk('fetchSingleCategory', async (catID) => {
const res = await fetch(`https://dummyjson.com/products/category/${catID}`)
const data = await res.json()
return data.products

})

