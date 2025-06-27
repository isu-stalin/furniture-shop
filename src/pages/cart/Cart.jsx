import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  incrementCart,
  decrementCart,
  removeCart,
} from "@/redux/features/cart";
import { DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.value);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (!cartItems.length) {
    return (
      <div className="container mx-auto px-4 py-20 text-center text-gray-600">
        <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
        <p className="mb-6">Looks like you haven’t added anything to your cart yet.</p>
        <button
          onClick={() => navigate("/shop")}
          className="px-6 py-2 border border-black hover:bg-black hover:text-white transition"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 flex flex-col lg:flex-row gap-10">
      <div className="flex-1 overflow-auto">
        <div className="grid grid-cols-5 bg-[#F9F1E7] font-medium text-gray-700 py-4 px-4 rounded-t">
          <span className="col-span-2">Product</span>
          <span>Price</span>
          <span>Quantity</span>
          <span>Subtotal</span>
        </div>

        {cartItems.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-5 items-center gap-4 border-b px-4 py-6"
          >
            <div className="col-span-2 flex gap-4 items-center">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-20 h-20 object-cover rounded bg-[#F9F1E7]"
              />
              <div>
                <p className="font-medium text-gray-700">{item.title}</p>
              </div>
            </div>

            <p className="text-gray-500">
              Rs. {item.price.toLocaleString("en-IN")}
            </p>

            <div className="flex items-center border px-2 w-fit">
              <button
                onClick={() => dispatch(decrementCart(item))}
                className="px-2"
              >
                -
              </button>
              <span className="px-2">{item.quantity}</span>
              <button
                onClick={() => dispatch(incrementCart(item))}
                className="px-2"
              >
                +
              </button>
            </div>

            <div className="flex items-center justify-between">
              <span>
                Rs. {(item.price * item.quantity).toLocaleString("en-IN")}
              </span>
              <DeleteOutlined
                onClick={() => dispatch(removeCart(item))}
                className="ml-4 cursor-pointer text-gray-500 hover:text-red-500"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="w-full lg:w-[350px] bg-[#F9F1E7] p-8 h-fit rounded">
        <h3 className="text-xl font-bold mb-6 text-center">Cart Totals</h3>
        <div className="flex justify-between mb-2 text-gray-600">
          <span>Subtotal</span>
          <span>Rs. {subtotal.toLocaleString("en-IN")}</span>
        </div>
        <div className="flex justify-between mb-6 text-gray-900 font-semibold">
          <span>Total</span>
          <span className="text-[#B88E2F]">
            Rs. {subtotal.toLocaleString("en-IN")}
          </span>
        </div>
        <button
          className="w-full py-2 border border-black hover:bg-black hover:text-white transition cursor-pointer"
          onClick={() => navigate("/checkout")}
        >
          Check Out
        </button>
      </div>
    </div>
  );
};

export default Cart;
