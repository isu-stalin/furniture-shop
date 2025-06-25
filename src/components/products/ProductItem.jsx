import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/redux/features/cart";
import { toggleWishlist } from "@/redux/features/wishlist";
import { HeartOutlined, HeartFilled, ShareAltOutlined } from "@ant-design/icons";

const ProductItem = (product) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const wishlist = useSelector((state) => state.wishlist.value);
  const isLiked = wishlist.some((item) => item.id === product.id);

  return (
    <div
      className="product-card"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <img src={product.thumbnail} alt={product.title} className="product-image" />

      <div className="product-overlay">
        <button
          className="add-to-cart"
          onClick={(e) => {
            e.stopPropagation();
            dispatch(addToCart(product));
          }}
        >
          Add to cart
        </button>

        <div className="product-actions">
          <span
            onClick={(e) => {
              e.stopPropagation();
              dispatch(toggleWishlist(product));
            }}
            className="icon text-xl"
          >
            {isLiked ? <HeartFilled style={{ color: "red" }} /> : <HeartOutlined />}
          </span>

          <span
            onClick={(e) => {
              e.stopPropagation();
              alert(`Поделиться: ${product.title}`);
            }}
            className="icon text-xl"
          >
            <ShareAltOutlined />
          </span>
        </div>
      </div>

      <div className="product-info">
        <h3>{product.title}</h3>
        <p>{product.description}</p>
        <span className="price">Rp {product.price.toLocaleString("id-ID")}</span>
      </div>
    </div>
  );
};

export default React.memo(ProductItem);
