import { Suspense } from '@/utils'
import React, { lazy } from 'react'
import { useRoutes } from 'react-router-dom'
import ScrollToTop from './productDetails/scrollToTop/ScrollToTop'

const Layout = lazy(() => import("./layout/Layout"))
const Home = lazy(() => import("./home/Home"))
const Shop = lazy(() => import("./shop/Shop"))
const Wishlist = lazy(() => import("./wishlist/Wishlist"))
const Cart = lazy(() => import("./cart/Cart"))
const ProductDetails = lazy(() => import("./productDetails/ProductDetails"))
const Checkout = lazy(() => import("./checkout/Checkout"))
const About = lazy(() => import("./about/About"))
const Contact = lazy(() => import("./contact/Contact"))

const MainRouters = () => {
  const routes = useRoutes([
    {
      path: "/", element: <Suspense><Layout /></Suspense>, children: [
        { path: "/", element: <Suspense><Home /></Suspense> },
        { path: "/shop", element: <Suspense><Shop /></Suspense> },
        { path: "/wishlist", element: <Suspense><Wishlist /></Suspense> },
        { path: "/cart", element: <Suspense><Cart /></Suspense> },
        { path: "/about", element: <Suspense><About /></Suspense> },
        { path: "/contact", element: <Suspense><Contact /></Suspense> },
        { path: "/checkout", element: <Suspense><Checkout/></Suspense> },
        { path: "/product/:id", element: <Suspense><ProductDetails /></Suspense> },
      ]
    },
  ])

  return (
    <>
      <ScrollToTop />
      {routes}
    </>
  )
}

export default MainRouters