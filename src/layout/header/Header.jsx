import React from 'react'
import { NavLink } from 'react-router-dom'
import { ShoppingCartOutlined, HeartOutlined, SearchOutlined, UserOutlined } from "@ant-design/icons";
import logo from "@/assets/logo.svg"

const Header = () => {
  return (
    <header className="flex justify-between items-center px-8 py-4">
      <NavLink to={"/"} className="text-2xl font-bold"><img src={logo} alt="logo" /></NavLink>
      <nav className="flex gap-10 text-gray-700 font-medium">
        <NavLink to={"/"}>Home</NavLink>
        <NavLink to={"/shop"}>Shop</NavLink>
        <NavLink to={"/about"}>About</NavLink>
        <NavLink to={"/contact"}>Contact</NavLink>
      </nav>
      <div className="flex gap-8 items-center text-gray-600 ">
        <UserOutlined />
        <SearchOutlined />
        <HeartOutlined />
        <ShoppingCartOutlined />
      </div>
    </header>
  )
}

export default React.memo(Header)