import './home.css'
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchProducts } from "./Store/Slice/productSlice"
import { useNavigate } from "react-router-dom"
import ImgSlider from "./imgSlider"
import { STATUS } from "./Store/Slice/productSlice"
import Row from "./Row"

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
              <img src='/src/assets/perfume.jpg' onClick={() => navigate(`/category/fragrances`)} style={{ width: '22vw', height: '27vw' }} />
              <span>FRAGRANCES</span>
            </div>

            <div className='gr'>
              <img src='/src/assets/bags.jpg' onClick={() => navigate(`/category/womens-bags`)} style={{ width: '22vw', height: '27vw' }} />
              <span>BAGS</span>
            </div>

            <div className='gr'>
              <img src='/src/assets/skincare.jpg' onClick={() => navigate(`/category/skincare`)} style={{ width: '22vw', height: '27vw' }} />
              <span>SKIN CARE</span>
            </div>

          </div>

          <div style={{ display: 'flex' }}>

            <div className='gr'>
              <img src='/src/assets/dress.jpg' onClick={() => navigate(`/category/womens-dresses`)} style={{ width: '20vw', height: '24vw' }} />
              <span>DRESSES</span>
            </div>

            <div className='gr'>
              <img src='/src/assets/shoes.jpg' onClick={() => navigate(`/category/womens-shoes`)} style={{ width: '20vw', height: '24vw' }} />
              <span>SHOES</span>
            </div>

            <div className='gr'>
              <img src='/src/assets/glasses.jpg' onClick={() => navigate(`/category/womens-dresses`)} style={{ width: '20vw', height: '24vw' }} />
              <span>GLASSES</span>
            </div>

            <div className='gr'>
              <img src='/src/assets/jewelry.jpg' onClick={() => navigate(`/category/womens-jewellery`)} style={{ width: '20vw', height: '24vw' }} />
              <span>JEWELLERY</span>
            </div>

          </div>
        </div>

        <div>
          <Row List={Row1} title={'BUY UNDER $15'} /><br />
          <Row List={Row2} title={'MEGA DISCOUNT DEALS'} />

          <div style={{ display: 'flex' }}>

            <div className='gr'>
              <img src='/src/assets/laptop.jpg' onClick={() => navigate(`/category/laptops`)} style={{ width: '30vw' }} />
              <span>LAPTOPS</span>
            </div>

            <div className='gr'>
              <img src='/src/assets/phones.jpg' onClick={() => navigate(`/category/smartphones`)} style={{ width: '30vw' }} />
              <span>SMART PHONES</span>
            </div>

            <div className='gr'>
              <img src='/src/assets/bike.jpg' onClick={() => navigate(`/category/motorcycle`)} style={{ width: '30vw' }} />
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