import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { STATUS } from './productSlice'

const categoriesSlice = createSlice({

    name: 'categories',
    initialState: {
        categories: [],
        categoriesStatus: STATUS.IDLE,
    },
    reducers: {},

    extraReducers: (builder) => {

        builder

            .addCase(fetchCategories.pending, (state, action) => {
                state.categoriesStatus = STATUS.LOADING
            })

            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.categories = action.payload
                state.categoriesStatus = STATUS.IDLE
            })

            .addCase(fetchCategories.rejected, (state, action) => {
                state.categoriesStatus = STATUS.ERROR
            })
    }
})

export default categoriesSlice.reducer

export const fetchCategories = createAsyncThunk('fetchCategories', async () => {
    const res = await fetch('https://dummyjson.com/products/categories')
    const data = await res.json()
    return data
})