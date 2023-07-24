import './home.css'
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchProducts } from "./Store/Slice/productSlice"
import { useNavigate } from "react-router-dom"
import ImgSlider from "./imgSlider"
import { STATUS } from "./Store/Slice/productSlice"
import Row from "./Row"
import fragrance from '/src/assets/perfume.jpg'
import bags from '/src/assets/bags.jpg'
import skincare from '/src/assets/skincare.jpg'
import dress from'/src/assets/dress.jpg'
import shoes from'/src/assets/shoes.jpg'
import glasses from'/src/assets/glasses.jpg'
import jewellery from'/src/assets/jewellery.jpg'
import laptop from '/src/assets/laptop.jpg'
import phone from'/src/assets/phones.jpg'
import bike from '/src/assets/bike.jpg'

const Home = () => {

  const [currentIndex, setCurrentIndex] = useState(0);

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const { products, productsStatus } = useSelector((state) => state.product)

  let page = 0
  let limit = 0

  useEffect(() => {
    dispatch(fetchProducts({page, limit}))
  }, [])

  let Row1 = products.filter(item => item.price <= '15')
  let Row2 = products.filter(item => item.discountPercentage >= '17')
  let Row3 = products.filter(item => item.category === 'home-decoration')
  let Row4 = products.filter(item => item.category === 'groceries')
  // let Row5 = products.filter(item => item.brand === products[1].brand)


  if (productsStatus === STATUS.LOADING) {
    return <div className="loader"></div>
  }

  if (productsStatus === STATUS.ERROR) {
    return <h1>Something Went Wrong</h1>
  }

  return (
    <div>

      <ImgSlider currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} />

      <div>

        <div className='grace'>

          <h2 className='tii'><span>WOMEN SECTION SALE IS LIVE NOW</span></h2>

          <div style={{ display: 'flex' }}>

            <div className='gr'>
              <img src={fragrance} onClick={() => navigate(`/category/fragrances`)} style={{ width: '22vw', height: '27vw' }} />
              <span>FRAGRANCES</span>
            </div>

            <div className='gr'>
              <img src={bags} onClick={() => navigate(`/category/womens-bags`)} style={{ width: '22vw', height: '27vw' }} />
              <span>BAGS</span>
            </div>

            <div className='gr'>
              <img src={skincare} onClick={() => navigate(`/category/skincare`)} style={{ width: '22vw', height: '27vw' }} />
              <span>SKIN CARE</span>
            </div>

          </div>

          <div style={{ display: 'flex' }}>

            <div className='gr'>
              <img src={dress} onClick={() => navigate(`/category/womens-dresses`)} style={{ width: '20vw', height: '24vw' }} />
              <span>DRESSES</span>
            </div>

            <div className='gr'>
              <img src={shoes} onClick={() => navigate(`/category/womens-shoes`)} style={{ width: '20vw', height: '24vw' }} />
              <span>SHOES</span>
            </div>

            <div className='gr'>
              <img src={glasses} onClick={() => navigate(`/category/sunglasses`)} style={{ width: '20vw', height: '24vw' }} />
              <span>GLASSES</span>
            </div>

            <div className='gr'>
              <img src={jewellery} onClick={() => navigate(`/category/womens-jewellery`)} style={{ width: '20vw', height: '24vw' }} />
              <span>JEWELLERY</span>
            </div>

          </div>
        </div>

        <div>
          <Row List={Row1} title={'BUY UNDER $15'} /><br />
          <Row List={Row2} title={'MEGA DISCOUNT DEALS'} />

          <div style={{ display: 'flex' }}>

            <div className='gr'>
              <img src={laptop} onClick={() => navigate(`/category/laptops`)} style={{ width: '30vw' }} />
              <span>LAPTOPS</span>
            </div>

            <div className='gr'>
              <img src={phone} onClick={() => navigate(`/category/smartphones`)} style={{ width: '30vw' }} />
              <span>SMART PHONES</span>
            </div>

            <div className='gr'>
              <img src={bike} onClick={() => navigate(`/category/motorcycle`)} style={{ width: '30vw' }} />
              <span>MOTOR BIKES</span>
            </div>

          </div>

          <Row List={Row3} title={'Home Decoration'} />

          <Row List={Row4} title={'Groceries'} />
        </div>

      </div>
    </div>
  )
}


export default Home