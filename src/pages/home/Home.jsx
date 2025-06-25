import React from "react";
import { useNavigate } from "react-router-dom";
import { useProduct } from "@/api/hooks/useProduct";
import Products from "@/components/products/Products";
import dinnerImg from "@/assets/dinner-room.png";
import bedroomImg from "@/assets/bedroom.png";
import livingImg from "@/assets/living-room.png";
import homeBg from "@/assets/home-bg.png";

const Home = () => {
  const navigate = useNavigate();
  const { getProduct } = useProduct();
  const { data, isLoading } = getProduct({ limit: 8, skip: 0 });

  return (
    <>
      <section
        className="relative h-[600px] bg-cover bg-center flex items-center"
        style={{ backgroundImage: `url(${homeBg})` }}
      > 
        <div className="container mx-auto px-6">
          <div className="bg-white p-10 max-w-[600px] ml-auto shadow-lg">
            <p className="text-1xl">New Arrival</p>
            <h1 className="text-4xl font-semibold max-w-[300px] text-[#B88E2F] mb-2">
              Discover Our New Collection
            </h1>
            <p className="text-gray-700 mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
              tellus, luctus nec ullamcorper mattis.
            </p>
            <button
              onClick={() => navigate("/shop")}
              className="px-6 py-3 bg-[#B88E2F] text-white cursor-pointer"
            >
              BUY NOW
            </button>
          </div>
        </div>
      </section>

      <section className="text-center my-16">
        <h2 className="text-3xl font-bold mb-2">Browse The Range</h2>
        <p className="text-gray-600 mb-10">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>

        <div className="flex flex-wrap justify-center gap-6 px-4">
          <div className="w-[380px]">
            <img
              src={dinnerImg}
              alt="Range 1"
              className="w-full h-[480px] object-cover mb-4"
            />
            <h3 className="text-lg font-medium">Dining</h3>
          </div>
          <div className="w-[380px]">
            <img
              src={livingImg}
              alt="Range 2"
              className="w-full h-[480px] object-cover mb-4"
            />
            <h3 className="text-lg font-medium">Living</h3>
          </div>
          <div className="w-[380px]">
            <img
              src={bedroomImg}
              alt="Range 3"
              className="w-full h-[480px] object-cover mb-4"
            />
            <h3 className="text-lg font-medium">Bedroom</h3>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 mb-16">
        <h2 className="text-3xl font-bold text-center mb-10">Our Products</h2>

        <Products
          data={data?.products || []}
          loading={isLoading}
          count={8}
        />

        <div className="flex justify-center mt-10">
          <button
            onClick={() => navigate("/shop")}
            className="px-12 py-2 border border-[#B88E2F] text-[#B88E2F] hover:bg-black hover:text-white transition cursor-pointer"
          >
            Show More
          </button>
        </div>
      </section>
    </>
  );
};

export default React.memo(Home);
