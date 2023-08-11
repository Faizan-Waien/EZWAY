import { Outlet, Route, Routes } from 'react-router-dom'
import Products from './Products'
import SignUp from './SignUp'
import Home from './Home'
import ProductPage from './ProductPage'
import goCart from './goCart'
import CatSection from './CatSection'
import AboutUs from './AboutUs'
import Header from './Header'
import Footer from './Footer'

const PageLinks = () => {

  return (
    <div>

      <Routes>

        <Route element={
          <div>
            <Header />
            <Outlet />
            <Footer />
          </div>
        }>

          <Route exact path='/home' Component={() => <Home />} />

          <Route exact path='/products' Component={Products} />

          <Route exact path='/about' Component={AboutUs} />

          <Route exact path='/cart' Component={goCart} />

          <Route exact path='/product/:itemID' Component={ProductPage} />

          <Route exact path='/category/:catID' Component={CatSection} />

        </Route>

        <Route exact path='/' Component={SignUp} />

      </Routes>
    </div>
  )
}
export default PageLinks