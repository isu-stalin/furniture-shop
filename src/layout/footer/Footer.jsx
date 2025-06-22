import React from "react";
import logo from "@/assets/logo.svg"
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white px-8 sm:px-16 lg:px-24 pt-16 pb-6 text-sm text-[#9f9f9f]">
      <div className="flex flex-wrap justify-between gap-12 mb-12">
        <div className="min-w-[200px]">
          <NavLink to={"/"}><img className="mb-4 w-34" src={logo} alt="logo"/></NavLink>
          <p className="leading-relaxed w-60">
            400 University Drive Suite 200 Coral Gables, <br />
            FL 33134 USA
          </p>
        </div>

        <div>
          <h4 className="mb-8 font-medium">Links</h4>
          <ul className="space-y-8 flex flex-col text-black font-medium">
            <NavLink to={"/"}>Home</NavLink>
            <NavLink to={"/shop"}>Shop</NavLink>
            <NavLink to={"/about"}>About</NavLink>
            <NavLink to={"/contact"}>Contact</NavLink>
          </ul>
        </div>

        <div>
          <h4 className="mb-8 font-medium">Help</h4>
          <ul className="space-y-8 text-black font-medium">
            <li>Payment Options</li>
            <li>Returns</li>
            <li>Privacy Policies</li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-medium">Newsletter</h4>
          <div className="flex items-center gap-3 pb-1 max-w-[250px]">
            <input
              type="email"
              placeholder="Enter Your Email Address"
              className="flex-1 outline-none bg-transparent text-black placeholder-[#9f9f9f] border-b border-black"
            />
            <button className="text-black font-bold border-b border-black pb-0.5">
              SUBSCRIBE
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-[#e4e4e4] pt-6 text-black text-base ">
        <p>2023 furino. All rights reserved</p>
      </div>
    </footer>
  );
};

export default React.memo(Footer);