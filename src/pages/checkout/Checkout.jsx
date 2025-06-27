import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import axios from "axios";
import { clearCart } from "@/redux/features/cart";
import shopBg from "@/assets/shop-bg.png";


const BOT_TOKEN = "7921598688:AAF3c43MqbVbUvDUaF-Y6fjrzrL0GZ0uu-A";
const CHAT_ID = "7548754195";

const Checkout = () => {
  const cart = useSelector((state) => state.cart.value);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  if (!cart.length) {
    return <Navigate replace to="/cart" />;
  }

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const onFinish = (values) => {
    let text = ""
    text += `Name: ${values.fullName} %0A`
    text += `Email: ${values.email} %0A`
    text += `Phone: ${values.phone} %0A`
    text += `Addres: ${values.addres} %0A`
    text += `City: ${values.city} %0A`
    text += `Comment: ${values.notes} %0A %0A`

    cart.forEach((product)=> {
      text += `Nomi: ${product.title} %0A`
      text += `Miqdori: ${product.quantity} %0A`
      text += `Narxi: $${product.price} %0A %0A`
    })
    text += `Jami: $${cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)}`

    console.log("Order Data:", values);
    message.success("Order placed successfully!");
    axios
      .get(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${text}`)
      .then(res => {
        dispatch(clearCart())
      })
      .catch(() => {
        message.error("Something went wrong. Try again.");
      });
  };

  return (
    <div className="bg-white min-h-screen py-10">
      <section
        className="text-center text-white py-26 bg-cover bg-center mb-8"
        style={{ backgroundImage: `url(${shopBg})` }}
      >
        <h2 className="text-4xl text-black font-bold">Checkout</h2>
        <p className="mt-2 text-sm text-black">
          <NavLink to={'/'}>Home</NavLink> &gt; <span className="text-gray-700"><NavLink to={'/checkout'}>Checkout</NavLink></span>
        </p>
      </section>
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 px-4">
        <div>
          <h2 className="text-2xl font-bold mb-4">Billing Details</h2>
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Full Name"
              name="fullName"
              rules={[{ required: true, message: "Please enter your name" }]}
            >
              <Input placeholder="John Doe" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please enter your email" },
                { type: "email", message: "Enter a valid email" },
              ]}
            >
              <Input placeholder="email@example.com" />
            </Form.Item>

            <Form.Item
              label="Phone Number"
              name="phone"
              rules={[{ required: true, message: "Please enter your phone" }]}
            >
              <Input placeholder="+998 90 123 45 67" />
            </Form.Item>

            <Form.Item
              label="Address"
              name="address"
              rules={[{ required: true, message: "Please enter your address" }]}
            >
              <Input placeholder="123 Street Name" />
            </Form.Item>

            <Form.Item
              label="City"
              name="city"
              rules={[{ required: true, message: "Please enter your city" }]}
            >
              <Input placeholder="Tashkent" />
            </Form.Item>

            <Form.Item label="Order Notes" name="notes">
              <Input.TextArea placeholder="Optional notes about delivery..." rows={4} />
            </Form.Item>

            <Button type="primary" htmlType="submit" className="bg-[#B88E2F] hover:bg-black mt-4">
              Place Order
            </Button>
          </Form>
        </div>

        <div className="bg-[#F9F1E7] p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">Your Order</h2>
          <div className="space-y-4 mb-6">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-800">
                    {item.title} × {item.quantity}
                  </p>
                </div>
                <p className="text-gray-600">
                  Rs. {(item.price * item.quantity).toLocaleString("en-IN")}
                </p>
              </div>
            ))}
          </div>
          <div className="flex justify-between border-t border-gray-300 pt-4 mb-2 text-gray-700">
            <span>Subtotal</span>
            <span>Rs. {subtotal.toLocaleString("en-IN")}</span>
          </div>
          <div className="flex justify-between font-semibold text-lg text-[#B88E2F]">
            <span>Total</span>
            <span>Rs. {subtotal.toLocaleString("en-IN")}</span>
          </div>
          <div className="text-center mt-12 max-w-[720px] text-[18px] font-normal">Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our <span className="font-semibold">privacy policy.</span></div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;