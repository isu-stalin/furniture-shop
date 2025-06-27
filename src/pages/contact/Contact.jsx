import { useEffect } from "react";
import shopBg from "@/assets/shop-bg.png";
import customerSupport from "@/assets/customer-support.svg";
import guaranteeSvg from "@/assets/guarantee.svg";
import shippingSvg from "@/assets/shipping.svg";
import trophyIcon from "@/assets/trophy-icon.svg";
import { NavLink } from "react-router-dom";
const Contact = () => {
  return (
    <div className="min-h-screen bg-white">
      <section
        className="text-center text-white py-26 bg-cover bg-center"
        style={{ backgroundImage: `url(${shopBg})` }}
      >
        <h2 className="text-4xl text-black font-bold">Contact</h2>
        <p className="mt-2 text-sm text-black">
          <NavLink to={'/'}>Home</NavLink> &gt; <span className="text-gray-700"><NavLink to={'/contact'}>Contact</NavLink></span>
        </p>
      </section>
      <div className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-12">
        <div className="space-y-8">
            <h2 className="text-3xl font-bold">Get In Touch With Us</h2>
            <p className="text-gray-600">
            For more information about our product & services, please feel free to drop us an email. Our staff always be there to help you out. Do not hesitate!
            </p>

            <div className="flex items-start gap-4">
            <span className="text-2xl">📍</span>
            <div>
                <h4 className="font-semibold text-lg">Address</h4>
                <p className="text-gray-600">236 5th SE Avenue, New York NY10000, United States</p>
            </div>
            </div>

            <div className="flex items-start gap-4">
            <span className="text-2xl">📞</span>
            <div>
                <h4 className="font-semibold text-lg">Phone</h4>
                <p className="text-gray-600">Mobile: +(84) 546-6789</p>
                <p className="text-gray-600">Hotline: +(84) 456-6789</p>
            </div>
            </div>

            <div className="flex items-start gap-4">
            <span className="text-2xl">🕒</span>
              <div>
                <h4 className="font-semibold text-lg">Working Time</h4>
                <p className="text-gray-600">Monday–Friday: 9:00 - 22:00</p>
                <p className="text-gray-600">Saturday–Sunday: 9:00 - 21:00</p>
              </div>
            </div>
        </div>
        <form className="space-y-6 w-full">
          <div>
            <label className="block mb-1 font-medium">Your name</label>
            <input
                type="text"
                className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:border-black"
                placeholder="Abc"
            />
            </div>

            <div>
            <label className="block mb-1 font-medium">Email address</label>
            <input
                type="email"
                className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:border-black"
                placeholder="Abc@def.com"
            />
            </div>

            <div>
            <label className="block mb-1 font-medium">Subject</label>
            <input
                type="text"
                className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:border-black"
                placeholder="This is an optional"
            />
            </div>

            <div>
            <label className="block mb-1 font-medium">Message</label>
            <textarea
                rows={4}
                className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:border-black"
                placeholder="Hi! I'd like to ask about..."
            />
            </div>

            <button
            type="submit"
            className="bg-[#B88E2F] text-white px-6 py-3 rounded hover:bg-black transition"
            >
            Submit
            </button>
        </form>
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

export default Contact;
