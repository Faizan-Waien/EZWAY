import { useDispatch } from "react-redux"
import { addProduct } from "./Store/Slice/cartSlice"
import { useNavigate } from "react-router-dom"

const row = ({ List, title }) => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  return (
    <div style={{ display: "flex", flexDirection: "column", background: 'whitesmoke' }}>

      <h2 className="tii"><span>{title}</span></h2>

      {/* <div className="ct"> */}

      <div className="map">
        {List.map((item, ind) => {

          return (

            <div key={ind} className="ProCont">
              <span className="off">{item?.brand}</span>

              <div className="imd">
                <img src={item?.thumbnail} onClick={() => navigate(`/product/${item.id}`)} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'row' }}>
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
      {/* </div> */}
    </div>
  )
}

export default row