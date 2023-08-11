import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import './header.css'
import PersonIcon from '@mui/icons-material/Person'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search'
import { Badge } from '@mui/material'
import { useState, useEffect } from 'react';
import { fetchSearch } from './Store/Slice/searchSlice';
import { STATUS } from "./Store/Slice/productSlice"
import DehazeIcon from '@mui/icons-material/Dehaze'
import logo from '/src/assets/logo.png'
import InfoIcon from '@mui/icons-material/Info';
import CategoryIcon from '@mui/icons-material/Category';

const Header = () => {

    const [query, setQuery] = useState("")
    const [focus, setFocus] = useState(false)

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const { cart } = useSelector((state) => state.cart)

    const { search, searchStatus } = useSelector((state) => state.search)

    useEffect(() => {
        let timer = setTimeout(() => {
            dispatch(fetchSearch(query))
        }, 800);
        return () => clearTimeout(timer)
    }, [query])

    const getTotalQuantity = () => {
        let total = 0
        cart.forEach(item => {
            total += item.quantity
        })
        return total
    }

    const [isScrolled, setIsScrolled] = useState(false)

    window.onscroll = () => {
        setIsScrolled(window.pageYOffset === 0 ? false : true)
        return () => (window.scroll = null)
    }

    return (
        <div className={isScrolled ? 'nav' : 'nag'}>

            <div className='headerul'>

                <div className='left'>
                    <div className='limg'><Link to='/home'><img src={logo}></img></Link></div>
                </div>

                <div className='right'>

                    <div className='inp'>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <div className='cin'><input placeholder='Search' type='text' value={query} onChange={(e) => setQuery(e.target.value)} onFocus={() => setFocus(true)} onBlur={() => setTimeout(() => setFocus(false), 300)} /></div>
                                <div className='bin'><button type='submit' className='Sicon' style={{ color: isScrolled ? 'white' : '#213146' }}><SearchIcon style={{ width: '25px', height: '25px' }} /></button></div>
                            </div>
                        </form>

                        {focus && query && <div className='sear'>
                            {search.slice(0, 5).map((item, ind) => {
                                return (
                                    <div className='ss' key={ind} onClick={() => navigate(`/product/${item.id}`)}>
                                        <span>{item.title}</span>
                                    </div>
                                )
                            })}
                        </div>}

                    </div>

                    <div className='rsh'>
                        <Link to='./Cart' className={isScrolled ? 'aR2' : 'aR'}><Badge color='primary' overlap="circular" badgeContent={getTotalQuantity() || 0}><ShoppingCartIcon /></Badge></Link>
                        <Link to='/' className={isScrolled ? 'aR2' : 'aR'}><PersonIcon /></Link>
                    </div>


                    <div className='rite'>
                        <div>
                            <DehazeIcon style={{ width: 30, height: 30, transition: '0.5s', color: isScrolled ? 'white' : '#213146' }} />
                        </div>

                        <div className='op'>
                            <Link to='./Cart'><Badge color='primary' overlap="circular" badgeContent={getTotalQuantity() || 0}><ShoppingCartIcon /></Badge>Cart</Link>
                            <Link to='/'><PersonIcon />SignIn</Link>
                            <Link to="/About Us"><InfoIcon />AboutUS</Link>
                            <Link to='/Products'><CategoryIcon />All Products</Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className='center'>

                <div className='csu'>

                    <div className="drop">

                        <span className='aL'><a>Categories</a></span>

                        <div className="cat">

                            <div className='drop1'>
                                <span>Electronics &gt;</span>
                                <div className='cat1' style={{ left: '100%', top: 0 }}>
                                    <span onClick={() => navigate(`/category/smartphones`)}>SmartPhones</span>
                                    <span onClick={() => navigate(`/category/laptops`)}>Laptops</span>
                                    <span onClick={() => navigate(`/category/lighting`)}>Lighting</span>
                                </div>
                            </div>

                            <div className='drop1'>
                                <span>Women Section &gt;</span>
                                <div className='cat1' style={{ left: '100%', top: 0 }}>
                                    <span onClick={() => navigate(`/category/womens-watches`)}>Watches</span>
                                    <span onClick={() => navigate(`/category/womens-bags`)}>Bags</span>
                                    <span onClick={() => navigate(`/category/womens-jewellery`)}>Jewellery</span>
                                    <span onClick={() => navigate(`/category/sunglasses`)}>Sun Glasses</span>
                                    <span onClick={() => navigate(`/category/fragrances`)}>Fragrances</span>
                                    <span onClick={() => navigate(`/category/skincare`)}>SkinCare</span>
                                    <span onClick={() => navigate(`/category/womens-dresses`)}>Dresses</span>
                                    <span onClick={() => navigate(`/category/womens-shoes`)}>Shoes</span>
                                </div>
                            </div>

                            <div className='drop1'>
                                <span>Men section &gt;</span>
                                <div className='cat1' style={{ left: '100%', top: 0 }}>
                                    <span onClick={() => navigate(`/category/mens-shirts`)}>Shirts</span>
                                    <span onClick={() => navigate(`/category/mens-shoes`)}>Shoes</span>
                                    <span onClick={() => navigate(`/category/mens-watches`)}>Watches</span>
                                    <span onClick={() => navigate(`/category/tops`)}>Tops</span>
                                </div>
                            </div>


                            <span onClick={() => navigate(`/category/groceries`)}>Groceries</span>

                            <span onClick={() => navigate(`/category/home-decoration`)}>Home Decoration</span>

                            <span onClick={() => navigate(`/category/furniture`)}>Furniture</span>

                            <span onClick={() => navigate(`/category/automotive`)}>Automotive</span>

                            <span onClick={() => navigate(`/category/motorcycle`)}>Motorcycle</span>

                        </div>
                    </div>


                    <div className='rem'>
                        <div className="drop1">
                            <span className='aL'><a>For Men</a></span>
                            <div className="cat1">
                                <span onClick={() => navigate(`/category/mens-shirts`)}>Shirts</span>
                                <span onClick={() => navigate(`/category/mens-shoes`)}>Shoes</span>
                                <span onClick={() => navigate(`/category/mens-watches`)}>Watches</span>
                                <span onClick={() => navigate(`/category/tops`)}>Tops</span>
                            </div>
                        </div>
                    </div>

                    <div className='rem'>
                        <div className="drop1">
                            <span className='aL'><a>For Women</a></span>
                            <div className="cat1">
                                <span onClick={() => navigate(`/category/womens-watches`)}>Watches</span>
                                <span onClick={() => navigate(`/category/womens-bags`)}>Bags</span>
                                <span onClick={() => navigate(`/category/womens-jewellery`)}>Jewellery</span>
                                <span onClick={() => navigate(`/category/sunglasses`)}>Sun Glasses</span>
                                <span onClick={() => navigate(`/category/fragrances`)}>Fragrances</span>
                                <span onClick={() => navigate(`/category/skincare`)}>SkinCare</span>
                                <span onClick={() => navigate(`/category/womens-dresses`)}>Dresses</span>
                                <span onClick={() => navigate(`/category/womens-shoes`)}>Shoes</span>
                            </div>
                        </div>
                    </div>

                    <div className="rem">
                        <span className='aL'><Link to='/Products'>All Products</Link></span>
                    </div>

                    <div className="rem">
                        <span className='aL'><Link to="/AboutUs">AboutUS</Link></span>
                    </div>
                </div>

            </div>

        </div>
    )
}
export default Header