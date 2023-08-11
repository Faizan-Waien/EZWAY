import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchSingleCategory } from './Store/Slice/singleCategorySlice'
import { addProduct } from './Store/Slice/cartSlice'
import { STATUS } from './Store/Slice/productSlice'
import { Pagination, Stack } from '@mui/material'

const CatSection = () => {

    const { catID } = useParams()

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const { singleCategory, singleCategoryStatus } = useSelector((state) => state.singleCategory)

    useEffect(() => {
        dispatch(fetchSingleCategory(catID))
    }, [catID])

    if (singleCategoryStatus === STATUS.LOADING) {
        return <div className="loader"></div>
    }

    if (singleCategoryStatus === STATUS.ERROR) {
        return <h1>Something Went Wrong</h1>
    }

    return (

        <div className='padding'>

            <h2 className='ti'><span>{catID.replace('-', ' ')}</span></h2>

            <div className="map">

                {singleCategory.map((item, ind) => {

                    return (

                        <div key={ind} className="ProCont">
                            <span className="off">{item?.brand}</span>

                            <div className="imd">
                                <img src={item?.thumbnail} onClick={() => navigate(`/product/${item.id}`)} />
                            </div>

                            <div style={{ display: 'flex' }}>
                                <button className="cardbutton" onClick={() => { dispatch(addProduct(item)); navigate('/Cart') }}>BUY NOW</button>
                            </div>

                            <div className="hv" onClick={() => navigate(`/product/${item.id}`)}>

                                <div>
                                    <span style={{ display: "flex", padding: '0px 10px', paddingTop: '5px', textTransform: 'capitalize' }}>{item?.title}</span>
                                    <hr />
                                </div>

                                <div style={{ display: 'flex', alignItems: "center", padding: '5px 10px', gap: 10 }}>
                                    <div><span>${Math.round(item?.price - (item?.price * item?.discountPercentage / 100))}</span></div>

                                    <div style={{ fontSize: 'small', gap: 5, display: "flex", border: '1px solid darkgrey', padding: '0px 5px' }}>
                                        <span style={{ textDecorationLine: "line-through", color: "darkgrey" }}>${item?.price}</span>
                                        <span>-{Math.round(item?.discountPercentage)}%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            <div style={{ margin: '50px auto' }}>
                <Stack spacing={2}>
                    <Pagination count={4} color="primary" showFirstButton showLastButton disabled />
                </Stack>
            </div>

        </div>
    )
}

export default CatSection