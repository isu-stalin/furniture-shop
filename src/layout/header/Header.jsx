import React, { useState, useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import {
  ShoppingCartOutlined,
  HeartOutlined,
  SearchOutlined,
  UserOutlined
} from "@ant-design/icons"
import logo from "@/assets/logo.svg"

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    if (isOpen) {
      window.addEventListener("click", handleClickOutside)
    }
    return () => {
      window.removeEventListener("click", handleClickOutside)
    }
  }, [isOpen])

  return (
    <header className="flex justify-between items-center px-6 py-4 gap-4 relative">
      <NavLink to="/" className="text-2xl font-bold shrink-0">
        <img src={logo} alt="logo" className="w-28" />
      </NavLink>

      <nav className="hidden sm:flex gap-6 text-gray-700 font-medium">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/shop">Shop</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </nav>

      <div className="flex items-center">
        <div className="hidden sm:flex gap-5 text-gray-600 text-xl">
          <UserOutlined />
          <SearchOutlined />
          <HeartOutlined />
          <ShoppingCartOutlined />
        </div>

        <div className="sm:hidden relative" ref={menuRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-2xl text-gray-700 px-2"
          >
            ☰
          </button>

          {isOpen && (
            <div className="absolute right-2 top-full mt-2 bg-white shadow-lg rounded p-3 flex flex-col gap-3 min-w-[180px] z-50">
              <button className="flex items-center gap-2 text-gray-700 text-base">
                <UserOutlined /> Account
              </button>
              <button className="flex items-center gap-2 text-gray-700 text-base">
                <SearchOutlined /> Search
              </button>
              <button className="flex items-center gap-2 text-gray-700 text-base">
                <HeartOutlined /> Wishlist
              </button>
              <button className="flex items-center gap-2 text-gray-700 text-base">
                <ShoppingCartOutlined /> Cart
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default React.memo(Header)
