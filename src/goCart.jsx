import { useSelector } from "react-redux"
import { removeProduct, increment, decrement, clearAll } from "./Store/Slice/cartSlice"
import { useDispatch } from "react-redux"
import './App.css'
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

const goCart = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { cart } = useSelector((state) => state.cart)

  // useEffect(()=>{
  //   localStorage.setItem('cartItems', JSON.stringify(cart))
  // },[cart])

  const getTotal = () => {
    let totalQuantity = 0
    let totalPrice = 0
    let totaloldPrice = 0

    cart.forEach(item => {
      totalQuantity += item?.quantity
      totaloldPrice += item?.price * item.quantity
      totalPrice += Math.round(item?.price - (item?.price * item?.discountPercentage / 100)) * item.quantity
    })
    return { totalPrice, totalQuantity, totaloldPrice }
  }

  return (
    <div className='padding'>
      <h3 className="ti">Cart</h3>
      {cart.length === 0 &&

        <div style={{ marginLeft: 40 }}>
          <h2 style={{ fontWeight: 400 }}>Cart is Empty</h2>
          <span style={{ textDecorationLine: 'underline', cursor: "pointer" }} onClick={() => navigate('/Products')}>Click here</span> <span>to browse Products</span>
        </div>
      }

      {cart.length !== 0 &&

        <div className='banner'>

          <h2 style={{ fontWeight: 400 }}>You have {getTotal().totalQuantity} items in your cart</h2>

          {cart.map((curElem, ind) => {
            return (

              <div key={ind} className="CartCont">

                <div style={{ width: '200px', height: '150px', flex: '10%' }}>
                  <img src={curElem.thumbnail} alt={curElem.title} style={{ width: '100%', height: '100%',objectFit: 'contain',cursor:"pointer" }} onClick={()=>navigate(`/product/${curElem.id}`)} />
                </div>

                <div style={{ flex: '65%', margin: 10, display: "flex", flexDirection: "column", flexWrap: "wrap" }}>
                  <h3 style={{ margin: 0 }}>{curElem.brand}</h3>
                  <h2 style={{ margin: 0 }}>{curElem.title}</h2>
                  <div className="dis">
                    <p>{curElem.description}</p>
                  </div>
                </div>

                <div style={{display:'flex', flexDirection:"column", alignItems:"center",flex: '15%'}}>
                
                <div style={{display:'flex',alignItems:'center',border:'1px solid black', width:'fit-content'}}>
                  <button className="adc" onClick={() => dispatch(decrement(curElem.id))}>-</button>
                  <span style={{ width:50, textAlign:'center' ,fontWeight: 700 }}>{curElem.quantity || 0}</span>
                  <button className="adc" onClick={(curElem.quantity >= curElem.stock) ? null : () => dispatch(increment(curElem.id))}>+</button>
                 </div> 
                  
                  {(curElem.stock - curElem.quantity < 1) ? <span>Out of Stock</span> : <span>Only {(curElem.stock - curElem.quantity)} Items Left</span>}
               
                </div>

                <div style={{ display:"flex",flexDirection:"column",flex: '10%',alignItems:"center",width:'fit-content' }}>
                  <h3 style={{margin:0, textDecorationLine: "line-through", color: "red" }} >${curElem.quantity * curElem.price}</h3>
                  <h3 style={{margin:0, color: 'green' }}>${curElem.quantity * Math.round(curElem?.price - (curElem?.price * curElem?.discountPercentage / 100))}</h3>
                </div>

                <div style={{ position: 'absolute', right: 0, top: 0}}>
                  <button style={{ width: 20, height: 20, background: "maroon" }} onClick={() => dispatch(removeProduct(curElem.id))}>x</button>
                </div>

              </div>
            )
          })
          }
          <div style={{ textAlign: 'right', margin: 15 }}>
            <h2 style={{ margin: 0 }}>Rs {getTotal().totalPrice}</h2>
            <span>You have saved ${getTotal().totaloldPrice - getTotal().totalPrice}</span>
          </div>

          <div style={{ textAlign: 'right', margin: 15 }}>
            <button className='cardbutton' style={{ width: '100px' }} onClick={() => dispatch(clearAll())}>Clear Cart</button>
            {" "}
            <button className='cardbutton' style={{ width: '100px' }} >Check Out</button>
          </div>

        </div>
      }
    </div>
  )
}

export default goCart

