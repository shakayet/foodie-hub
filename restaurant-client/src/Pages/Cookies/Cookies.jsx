import { useEffect, useState, useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { CartContext } from "../../context/CartProvider";
import { useNavigate } from "react-router-dom";

const Cookies = () => {
  const [cookies, setCookies] = useState([]);
  const { addToCart, cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/cookies")
      .then((res) => res.json())
      .then((data) => setCookies(data))
      .catch((err) => console.error("Failed to load cookies:", err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Carousel */}
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 3000 }}
        pagination={{ clickable: true }}
        className="h-[70vh] w-full"
      >
        <SwiperSlide>
          <div
            className="h-full w-full bg-cover bg-center flex items-center justify-center text-white text-center"
            style={{
              backgroundImage:
                "url(https://images.pexels.com/photos/433120/pexels-photo-433120.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)",
            }}
          >
            <div className="bg-black bg-opacity-60 p-6 rounded-lg">
              <h2 className="text-4xl font-bold mb-2">Chocolate Chip Bliss</h2>
              <p className="text-lg">
                Classic cookies loaded with chocolatey goodness
              </p>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div
            className="h-full w-full bg-cover bg-center flex items-center justify-center text-white text-center"
            style={{
              backgroundImage:
                "url(https://images.pexels.com/photos/2377472/pexels-photo-2377472.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)",
            }}
          >
            <div className="bg-black bg-opacity-60 p-6 rounded-lg">
              <h2 className="text-4xl font-bold mb-2">Freshly Baked Goodness</h2>
              <p className="text-lg">
                Oven-fresh cookies for every sweet craving
              </p>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div
            className="h-full w-full bg-cover bg-center flex items-center justify-center text-white text-center"
            style={{
              backgroundImage:
                "url(https://images.pexels.com/photos/3169549/pexels-photo-3169549.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)",
            }}
          >
            <div className="bg-black bg-opacity-60 p-6 rounded-lg">
              <h2 className="text-4xl font-bold mb-2">
                Crispy on the Outside, Soft Inside
              </h2>
              <p className="text-lg">Handmade cookies to warm your heart</p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>

      {/* Cookies Grid */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-orange-600 mb-8 text-center">
          Delicious Cookies Menu
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {cookies.map((cookie) => (
            <div
              key={cookie._id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300"
            >
              <img
                src={cookie.image}
                alt={cookie.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{cookie.name}</h3>
                <p className="text-orange-600 font-bold mt-1">
                  ${cookie.price}
                </p>
                <button
                  onClick={() => addToCart(cookie)}
                  className="mt-3 w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg transition"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Cart Button */}
      {cartItems.length > 0 && (
        <div className="fixed bottom-6 right-6 z-50">
          <button
            className="relative bg-orange-600 text-white px-5 py-3 rounded-full shadow-lg hover:bg-orange-700"
            onClick={() => navigate("/cart")}
          >
            🛒 Cart
            <span className="absolute -top-2 -right-2 bg-white text-orange-600 font-bold rounded-full px-2 text-sm shadow">
              {cartItems.length}
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Cookies;
