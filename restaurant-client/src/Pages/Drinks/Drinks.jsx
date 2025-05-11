import { useContext, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { CartContext } from "../../context/CartProvider"; // ✅ Import CartContext
import { useNavigate } from "react-router-dom";

const Drinks = () => {
    const [drinks, setDrinks] = useState([]);
    const { addToCart, cartItems } = useContext(CartContext); // ✅ Use CartContext
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:5000/api/drinks")
            .then(res => res.json())
            .then(data => setDrinks(data))
            .catch(err => console.error("Failed to load drinks:", err));
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
                {/* Coffee Slide */}
                <SwiperSlide>
                    <div
                        className="h-full w-full bg-cover bg-center flex items-center justify-center text-white text-center"
                        style={{ backgroundImage: "url(https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)" }}
                    >
                        <div className="bg-black bg-opacity-60 p-6 rounded-lg">
                            <h2 className="text-4xl font-bold mb-2">Freshly Brewed Coffee</h2>
                            <p className="text-lg">Wake up with rich aroma & taste</p>
                        </div>
                    </div>
                </SwiperSlide>

                {/* Juice Slide */}
                <SwiperSlide>
                    <div
                        className="h-full w-full bg-cover bg-center flex items-center justify-center text-white text-center"
                        style={{ backgroundImage: "url(https://images.pexels.com/photos/158053/fresh-orange-juice-squeezed-refreshing-citrus-158053.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)" }}
                    >
                        <div className="bg-black bg-opacity-60 p-6 rounded-lg">
                            <h2 className="text-4xl font-bold mb-2">Fresh Fruit Juices</h2>
                            <p className="text-lg">Boost your day with natural energy</p>
                        </div>
                    </div>
                </SwiperSlide>

                {/* Soft Drink Slide */}
                <SwiperSlide>
                    <div
                        className="h-full w-full bg-cover bg-center flex items-center justify-center text-white text-center"
                        style={{ backgroundImage: "url(https://images.pexels.com/photos/4109238/pexels-photo-4109238.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)" }}
                    >
                        <div className="bg-black bg-opacity-60 p-6 rounded-lg">
                            <h2 className="text-4xl font-bold mb-2">Chilled Soft Drinks</h2>
                            <p className="text-lg">Stay cool and refreshed</p>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>

            {/* Drinks Grid */}
            <div className="max-w-6xl mx-auto px-4 py-12">
                <h2 className="text-3xl font-bold text-orange-600 mb-8 text-center">Refreshing Drinks Menu</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {drinks.map(drink => (
                        <div key={drink._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300">
                            <img src={drink.image} alt={drink.name} className="w-full h-40 object-cover" />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold">{drink.name}</h3>
                                <p className="text-orange-600 font-bold mt-1">${drink.price}</p>
                                <button
                                    className="mt-3 w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg transition"
                                    onClick={() => addToCart(drink)} // ✅ Add to cart on click
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Floating Cart Button (optional if you want consistency with Home) */}
            {cartItems.length > 0 && (
                <div className="fixed bottom-6 right-6 z-50">
                    <button
                        className="relative bg-orange-600 text-white px-5 py-3 rounded-full shadow-lg hover:bg-orange-700"
                        onClick={() => navigate('/cart')}
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

export default Drinks;
