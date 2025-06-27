import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/redux/features/cart";
import { toggleWishlist } from "@/redux/features/wishlist";
import { HeartFilled, ShoppingCartOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const Wishlist = () => {
  const wishlist = useSelector((state) => state.wishlist.value);
  const cart = useSelector((state) => state.cart.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!wishlist.length) {
    return (
      <div className="text-center py-20 text-gray-500 text-xl">
        No items in wishlist
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-8">Your Wishlist</h2>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {wishlist.map((product) => {
          const isInCart = cart.some((item) => item.id === product.id);

          return (
            <div
              key={product.id}
              className="product-card"
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                className="product-image"
              />

              <div className="product-overlay">
                <button
                  disabled={isInCart}
                  className={`add-to-cart ${
                    isInCart ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!isInCart) dispatch(addToCart(product));
                  }}
                >
                  {isInCart ? "In Cart" : "Add to cart"}
                </button>

                <div className="product-actions">
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(toggleWishlist(product));
                    }}
                    className="text-xl"
                  >
                    <HeartFilled className="text-white" />
                  </span>

                  <span
                    onClick={(e) => e.stopPropagation()}
                    className="text-xl text-white"
                  >
                    <ShoppingCartOutlined />
                  </span>
                </div>
              </div>

              <div className="product-info">
                <h3>{product.title}</h3>
                <p>{product.description}</p>
                <span className="price">
                  Rp {product.price.toLocaleString("id-ID")}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default React.memo(Wishlist);