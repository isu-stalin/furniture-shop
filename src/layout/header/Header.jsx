import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  ShoppingCartOutlined,
  HeartOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import logo from "@/assets/logo.svg";
import { useProduct } from "@/api/hooks/useProduct";
import useDebounce from "@/hooks/useDebounce";

const Header = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const searchRef = useRef(null);
  const textFromDebounce = useDebounce(searchTerm);
  const { getSearchProduct } = useProduct();
  const { data, isLoading } = getSearchProduct({ q: textFromDebounce.trim() });

  const wishlist = useSelector((state) => state.wishlist.value);
  const cart = useSelector((state) => state.cart.value);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-stone-100 py-4 fixed top-0 left-0 w-full z-50 shadow-sm">
      <div className="container mx-auto flex justify-between items-center px-6 gap-4">
        <NavLink to="/" className="text-2xl font-bold shrink-0">
          <img src={logo} alt="logo" className="w-28" />
        </NavLink>

        <nav className="hidden sm:flex gap-6 text-gray-700 font-medium">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/shop">Shop</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </nav>

        <div className="flex items-center relative" ref={searchRef}>
          <div className="hidden sm:flex gap-5 text-gray-600 text-xl relative">
            <UserOutlined />

            <SearchOutlined
              className="cursor-pointer"
              onClick={() => setSearchOpen((prev) => !prev)}
            />

            <div className="relative">
              <NavLink to="/wishlist" className="hover:text-black">
                <HeartOutlined />
                {wishlist.length > 0 && (
                  <span className="absolute -top-2 -right-3 bg-white text-black text-[10px] font-semibold w-5 h-5 flex items-center justify-center rounded-full shadow">
                    {wishlist.length}
                  </span>
                )}
              </NavLink>
            </div>

            <div className="relative">
              <NavLink to="/cart" className="hover:text-black">
                <ShoppingCartOutlined />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-3 bg-white text-black text-[10px] font-semibold w-5 h-5 flex items-center justify-center rounded-full shadow">
                    {cart.length}
                  </span>
                )}
              </NavLink>
            </div>
          </div>

          {searchOpen && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-white border rounded shadow-lg p-4 z-50">
              <input
                autoFocus
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products..."
                className="w-full px-3 py-2 border border-gray-300 rounded outline-none focus:border-black"
              />

              <div className="mt-3 max-h-60 overflow-y-auto">
                {searchTerm ? (
                  isLoading ? (
                    <p className="text-sm text-gray-500">Loading...</p>
                  ) : data?.products?.length ? (
                    data.products.map((item) => (
                      <NavLink
                        key={item.id}
                        to={`/product/${item.id}`}
                        onClick={() => setSearchOpen(false)}
                        className="flex items-center gap-3 py-2 px-2 hover:bg-gray-100 rounded transition border-b"
                      >
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div className="flex flex-col text-sm text-gray-700">
                          <span className="font-medium">{item.title}</span>
                          <span className="text-gray-500 text-xs">Rs. {item.price}</span>
                        </div>
                      </NavLink>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">No results found.</p>
                  )
                ) : (
                  <p className="text-sm text-gray-400">Start typing to search...</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default React.memo(Header);