import './ProductPage.css'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from 'react-router-dom'
import { fetchSingleProduct } from "./Store/Slice/singleProductSlice"
import { addProduct, decrement, increment } from './Store/Slice/cartSlice'
import { STATUS } from './Store/Slice/productSlice'
import { fetchProducts } from "./Store/Slice/productSlice"
import SideBar from './SideBar'

const ProductPage = () => {

    const { itemID } = useParams()

    const { cart } = useSelector((state) => state.cart)

    const { products } = useSelector((state) => state.product)

    const { singleProduct, singleProductStatus } = useSelector((state) => state.singleProduct)

    let side = products.filter(item => item.category === singleProduct.category)

    let page = 0
    let limit = 0

    const navigate = useNavigate()

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchProducts({ page, limit }))
    }, [])

    useEffect(() => {
        dispatch(fetchSingleProduct(itemID))
    }, [itemID])

    const [pic, setPic] = useState('')

    if (singleProductStatus === STATUS.LOADING) {
        return <div className="loader"></div>
    }

    if (singleProductStatus === STATUS.ERROR) {
        return <h1>Something Went Wrong</h1>
    }

    return (
        <div className='padding'>

            {/* <h2 className='ti'><span>{singleProduct.title}</span></h2> */}

            <div className='mmm'>

                <div className='smain'>

                    <div className='maiin'>

                        <div className='ff'>
                            <img src={pic ? pic : singleProduct.thumbnail} />
                        </div>

                        <div className='suub'>
                            {singleProduct?.images?.slice(0, 5).map((i, ind) => {
                                return (
                                    <div className='ind' key={ind}>
                                        <img src={i} onClick={() => setPic(i)} />
                                    </div>
                                )
                            })
                            }
                        </div>

                    </div>

                    <div className='innf'>

                        <h1>{singleProduct.title}</h1>
                        <p>{singleProduct.description}</p>

                        <div className='dis'>
                            <span style={{ border: 'none', paddingLeft: 0 }}><b>Rating: </b> {singleProduct.rating}</span>
                            <span><b>Brand: </b> {singleProduct.brand}</span>
                            <span style={{ textTransform: 'capitalize' }}><b>Category: </b> {singleProduct.category}</span>
                        </div>

                        <div style={{ color: "green", fontSize: '30px', marginTop: '10px' }}>
                            <span>${Math.round(singleProduct?.price - (singleProduct?.price * singleProduct?.discountPercentage / 100))}</span>
                        </div>

                        <div style={{ display: 'flex', gap: 10 }}>
                            <span style={{ textDecorationLine: "line-through", color: "grey" }}>${singleProduct?.price}</span>
                            <span >-{Math.round(singleProduct?.discountPercentage)}%</span>
                        </div><br />
                        {/* ------------------------- */}

                        {cart.find((ite) => ite.id === singleProduct.id) ? cart.map((ite, ind) => ite.id === singleProduct.id ?

                            <div key={ind} style={{ display: 'flex', flexDirection: 'column', width: 'fit-content' }}>

                                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid black', width: 'fit-content' }}>
                                    <button className='adc' onClick={() => dispatch(decrement(ite.id))} >-</button>
                                    <span style={{ width: 50, textAlign: 'center', fontWeight: 700 }}>{ite.quantity}</span>
                                    <button className='adc' onClick={(ite.quantity >= ite.stock) ? null : () => dispatch(increment(ite.id))}>+</button>
                                </div>

                                {(ite.stock - ite.quantity < 1) ? <p>Out of Stock</p> : <p>Only {(ite.stock - ite.quantity)} Items Left</p>}

                                <button className='bbt' onClick={() => dispatch(navigate('/Cart'))}><span>PROCEED TO CART</span></button>
                            </div>

                            : null

                        ) :
                            <div style={{ display: 'flex', flexDirection: 'column', width: 'fit-content' }}>
                                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid black', width: 'fit-content' }}>
                                    <button className='adc'>-</button>
                                    <span style={{ width: 50, textAlign: 'center', fontWeight: 700 }}>0</span>
                                    <button className='adc' onClick={() => dispatch(addProduct(singleProduct))}>+</button>
                                </div>
                                <div><p>Only {singleProduct.stock} Items Left</p></div>
                            </div>

                        }

                        {/* -------------------------- */}

                        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                            {/* <button className='bbt' onClick={() => { dispatch(addProduct(singleProduct)); navigate('/Cart') }}><span>ADD TO CART</span></button> */}
                        </div>
                    </div>
                </div>
                <div className='sidebr'>
                    <SideBar List={side} title={'You May like'} />
                </div>
            </div>
        </div>
    )
}

export default ProductPage