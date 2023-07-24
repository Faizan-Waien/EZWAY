import { useNavigate } from "react-router-dom"

const row = ({ List, title }) => {

    const navigate = useNavigate()

    return (
        <div className="side">

            <h1 className="t2">{title}</h1>

            <div className="sidesub">

                {List.slice(0, 3).map((item, ind) => {

                    return (

                        <div key={ind} style={{ display:'flex',flexDirection:"column",background: 'white', cursor: "pointer", margin: 5, width: '150px',height: '200px', position: "relative" }}>

                            <span className="off" style={{ fontSize: 'small', backgroundColor: 'red' }}>-{Math.round(item?.discountPercentage)}%</span>

                            <img style={{ width: '100%', height: '70%',objectFit:'contain' }} src={item?.thumbnail} onClick={() => navigate(`/product/${item.id}`)} />

                            <div style={{ display: 'flex',flexDirection:"column", padding:'0px 5px' }}>

                                <span style={{ fontWeight: 500, fontSize: 'small',width:'100%',borderBottom:'1px solid grey'}}>{item?.title}</span>
                                <div className="offer">
                                    <span style={{ color: "green" }}>${Math.round(item?.price - (item?.price * item?.discountPercentage / 100))}</span>
                                    <span style={{ textDecorationLine: "line-through", color: "grey" }}>${item?.price}</span>
                                </div>

                            </div>
                        </div>
                    )
                })}
            </div>


        </div>
    )
}

export default row