import { useState, useEffect } from "react"
import { addProduct } from "./Store/Slice/cartSlice"
import { useDispatch, useSelector } from "react-redux"
import { fetchProducts } from "./Store/Slice/productSlice"
import { STATUS } from "./Store/Slice/productSlice"
import { useNavigate } from "react-router-dom"

const Products = () => {

  const [page, setPage] = useState(0)

  let limit = 25

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const { products, productsStatus } = useSelector((state) => state.product)

  useEffect(() => {
    dispatch(fetchProducts({ page, limit }))
  }, [page])


  if (productsStatus === STATUS.LOADING) {
    return <div className="loader"></div>
  }

  if (productsStatus === STATUS.ERROR) {
    return <h1>Something Went Wrong</h1>
  }

  return (
    <div className='padding'>

      <h2 className="ti"><span>All Products</span></h2>

      <div className="map">

        {products.map((item, ind) => {

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

      <div className="pagin">
        <button onClick={() => setPage(0)}>1</button>
        <button onClick={() => setPage(25)}>2</button>
        <button onClick={() => setPage(50)}>3</button>
        <button onClick={() => setPage(75)}>4</button>
      </div>

    </div>
  )
}

export default Products