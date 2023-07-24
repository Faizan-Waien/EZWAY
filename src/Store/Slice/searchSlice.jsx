import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { STATUS } from './productSlice'

const searchSlice = createSlice({

    name: 'search',
    initialState: {
        search: [],
        searchStatus: STATUS.IDLE,
    },
    reducers: {},

    extraReducers: (builder) => {

        builder

            .addCase(fetchSearch.pending, (state, action) => {
                state.searchStatus = STATUS.LOADING
            })

            .addCase(fetchSearch.fulfilled, (state, action) => {
                state.search = action.payload
                state.searchStatus = STATUS.IDLE
            })

            .addCase(fetchSearch.rejected, (state, action) => {
                state.searchStatus = STATUS.ERROR
            })
    }
})

export default searchSlice.reducer

export const fetchSearch = createAsyncThunk('fetchSearch', async (query) => {
    const res = await fetch(`https://dummyjson.com/products/search?q=${query}`)
    const data = await res.json()
    return data.products
})