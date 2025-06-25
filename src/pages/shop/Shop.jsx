import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useProduct } from "@/api/hooks/useProduct";
import Products from "@/components/products/Products";
import { Pagination } from "antd";

import shopBg from "@/assets/shop-bg.png";
import compareIcon from "@/assets/compare-btn.svg";
import customerSupport from "@/assets/customer-support.svg";
import gridBigRound from "@/assets/grid-big-round.svg";
import guaranteeSvg from "@/assets/guarantee.svg";
import likeBtn from "@/assets/like-btn.svg";
import shareBtn from "@/assets/share-btn.svg";
import shippingSvg from "@/assets/shipping.svg";
import systemFiltering from "@/assets/system-filtering.svg";
import trophyIcon from "@/assets/trophy-icon.svg";
import viewList from "@/assets/view-list.svg";

const Shop = () => {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const page = parseInt(params.get("page")) || 1;
  const pageSize = parseInt(params.get("pageSize")) || 16;

  const { getProduct } = useProduct();
  const { data, isLoading } = getProduct({
    limit: pageSize,
    skip: pageSize * (page - 1),
  });

  const handleChangePage = (page, size) => {
    params.set("page", page.toString());
    params.set("pageSize", size.toString());
    setParams(params);
  };

  return (
    <div className="min-h-screen bg-white">
      <section
        className="text-center text-white py-26 bg-cover bg-center"
        style={{ backgroundImage: `url(${shopBg})` }}
      >
        <h2 className="text-4xl text-black font-bold">Shop</h2>
        <p className="mt-2 text-sm text-black">
          Home &gt; <span className="text-gray-700">Shop</span>
        </p>
      </section>

      <div className="container mx-auto flex flex-col justify-center w-full">
        <div className="flex flex-wrap justify-between gap-6 items-center py-6 px-4 text-gray-700 bg-[#F9F1E7]">
          <div className="flex items-center gap-4">
            <img src={systemFiltering} alt="filter-icon" />
            <span className="font-medium mr-4">Filter</span>
            <img src={gridBigRound} alt="grid" />
            <img src={viewList} alt="view list" className="mr-8" />
            <span className="border-l-2 border-gray-400 px-8">
              Showing 1–{pageSize} of {data?.data?.total || 0} results
            </span>
          </div>
          <div className="flex gap-4 items-center">
            <label className="flex items-center gap-2">
              Show:
              <input
                type="number"
                className="w-16 px-2 py-2 text-sm bg-white"
                value={pageSize}
                onChange={(e) =>
                  handleChangePage(1, parseInt(e.target.value) || 16)
                }
              />
            </label>
            <label className="flex items-center gap-2">
              Sort by:
              <select className="bg-white px-2 py-2 text-sm">
                <option>Default</option>
                <option>Price low to high</option>
                <option>Price high to low</option>
              </select>
            </label>
          </div>
        </div>

        <Products
          data={data?.products || []}
          loading={isLoading}
          count={16}
        />

        <div className="flex justify-center my-8">
          <Pagination
            current={page}
            pageSize={pageSize}
            onChange={handleChangePage}
            total={data?.data?.total}
            showSizeChanger
          />
        </div>
      </div>

      <div className="bg-[#FAF3EA] container mx-auto py-14">
        <div className="container mx-auto px-4 flex flex-wrap justify-center gap-10">
          <div className="flex flex-col items-center text-center gap-3 w-full sm:w-[220px]">
            <img
              src={trophyIcon}
              alt="trophy-icon"
              className="w-12 h-12 object-contain"
            />
            <strong className="text-lg">High Quality</strong>
            <p className="text-gray-600 text-sm">crafted from top materials</p>
          </div>
          <div className="flex flex-col items-center text-center gap-3 w-full sm:w-[220px]">
            <img
              src={guaranteeSvg}
              alt="guarantee"
              className="w-12 h-12 object-contain"
            />
            <strong className="text-lg">Warranty Protection</strong>
            <p className="text-gray-600 text-sm">Over 2 years</p>
          </div>
          <div className="flex flex-col items-center text-center gap-3 w-full sm:w-[220px]">
            <img
              src={shippingSvg}
              alt="shipping"
              className="w-12 h-12 object-contain"
            />
            <strong className="text-lg">Free Shipping</strong>
            <p className="text-gray-600 text-sm">Order over 150 $</p>
          </div>
          <div className="flex flex-col items-center text-center gap-3 w-full sm:w-[220px]">
            <img
              src={customerSupport}
              alt="support"
              className="w-12 h-12 object-contain"
            />
            <strong className="text-lg">24 / 7 Support</strong>
            <p className="text-gray-600 text-sm">Dedicated support</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
