import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useProduct } from "@/api/hooks/useProduct";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/redux/features/cart";
import { toggleWishlist } from "@/redux/features/wishlist";
import { HeartOutlined, HeartFilled, StarFilled } from "@ant-design/icons";
import ProductItem from "@/components/products/ProductItem";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.value);
  const cart = useSelector((state) => state.cart.value);

  const { getProductById, getProduct } = useProduct();
  const { data: product, isLoading, error } = getProductById(id);
  const { data: relatedData, isLoading: relatedLoading } = getProduct({ limit: 4 });

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("desc");
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    setSelectedImage(null);
  }, [id]);

  if (isLoading) return <div className="text-center py-10">Loading...</div>;
  if (error || !product) return <div className="text-center py-10">Product not found</div>;

  const isInWishlist = wishlist.some((item) => item.id === product.id);
  const isInCart = cart.some((item) => item.id === product.id);
  const mainImage = selectedImage || product.thumbnail;

  return (
    <div className="container mx-auto px-10 py-10">
      <p className="text-gray-500 mb-6">
        <Link to="/" className="hover:underline">Home</Link> &gt;{" "}
        <Link to="/shop" className="hover:underline">Shop</Link> &gt;{" "}
        <span className="text-black">{product.title}</span>
      </p>

      <div className="rounded-lg flex px-6 py-4 gap-8 justify-evenly">
        <div className="flex flex-col gap-4 ">
          {product.images?.slice(0, 4).map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`thumb-${idx}`}
              onClick={() => setSelectedImage(img)}
              className="w-20 h-20 object-cover border cursor-pointer bg-[#F9F1E7]"
            />
          ))}
        </div>

        <div className="flex items-center justify-center bg-white p-4">
          <img
            src={mainImage}
            alt={product.title}
            className="max-h-[500px] max-w-[300px] object-contain bg-[#F9F1E7]"
          />
        </div>

        <div className="space-y-4 max-w-xl">
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <div className="flex items-center gap-2">
            <span className="text-xl font-semibold text-[#B88E2F]">
              Rp {product.price.toLocaleString("id-ID")}
            </span>
            <span className="flex items-center text-yellow-400 ml-4">
              <StarFilled /> <span className="ml-1">{product.rating}</span>
            </span>
          </div>
          <p className="text-gray-600">{product.description}</p>

          <div className="flex flex-col gap-4 mt-6">
            <div className="flex gap-4">
              <span className="font-semibold">Color:</span>
              <button className="w-6 h-6 bg-black rounded-full border cursor-pointer"></button>
              <button className="w-6 h-6 bg-gray-500 rounded-full border cursor-pointer"></button>
              <button className="w-6 h-6 bg-orange-300 rounded-full border cursor-pointer"></button>
            </div>
            <div className="flex gap-4">
              <span className="font-semibold">Size:</span>
              {["S", "M", "L", "XL"].map((size) => (
                <button key={size} className="border px-3 py-1 cursor-pointer">{size}</button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 mt-6">
            <div className="flex border w-fit">
              <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="px-3 py-1 cursor-pointer">–</button>
              <div className="px-4 py-1">{quantity}</div>
              <button onClick={() => setQuantity((q) => q + 1)} className="px-3 py-1 cursor-pointer">+</button>
            </div>

            <button
              disabled={isInCart}
              onClick={() => dispatch(addToCart({ ...product, quantity }))}
              className={`px-6 py-2 ${isInCart ? "bg-gray-400 cursor-not-allowed" : "bg-black hover:bg-[#222]"} text-white cursor-pointer`}
            >
              {isInCart ? "Already in Cart" : "Add to Cart"}
            </button>

            <button
              onClick={() => dispatch(toggleWishlist(product))}
              className="text-2xl cursor-pointer"
            >
              {isInWishlist ? (
                <HeartFilled className="text-black" />
              ) : (
                <HeartOutlined className="text-white"/>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="mt-16 border-b text-center">
        {["desc", "info", "rev"].map((key) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`px-6 py-3 font-medium ${activeTab === key ? "border-b-2 border-black" : "text-gray-400"}`}
          >
            {key === "desc" && "Description"}
            {key === "info" && "Additional Information"}
            {key === "rev" && "Reviews [5]"}
          </button>
        ))}
      </div>

      <div className="py-8 text-center text-gray-700">
        {activeTab === "desc" && <p>{product.description}</p>}
        {activeTab === "info" && <p>Material: Cotton, Dimensions: 100x200cm, Weight: 2.3kg</p>}
        {activeTab === "rev" && <p>No reviews yet. Be the first to review this product.</p>}
      </div>

      <div className="pt-12">
        <h3 className="text-2xl font-semibold mb-6">You may also like</h3>
        {relatedLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {relatedData?.products?.map((item) => (
              <ProductItem key={item.id} {...item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(ProductDetails);