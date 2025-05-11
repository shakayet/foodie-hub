import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const Grocery = () => {
    const [groceries, setGroceries] = useState([]);

    useEffect(() => {
        // Replace with your actual API endpoint
        fetch("")
            .then(res => res.json())
            .then(data => setGroceries(data))
            .catch(err => console.error("Failed to load groceries:", err));
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
                {/* Slide 1 */}
                <SwiperSlide>
                    <div
                        className="h-full w-full bg-cover bg-center flex items-center justify-center text-white text-center"
                        style={{
                            backgroundImage:
                                "url(https://images.pexels.com/photos/3962285/pexels-photo-3962285.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)",
                        }}
                    >
                        <div className="bg-black bg-opacity-60 p-6 rounded-lg">
                            <h2 className="text-4xl font-bold mb-2">Fresh Vegetables Daily</h2>
                            <p className="text-lg">Straight from the farm to your kitchen</p>
                        </div>
                    </div>
                </SwiperSlide>

                {/* Slide 2 */}
                <SwiperSlide>
                    <div
                        className="h-full w-full bg-cover bg-center flex items-center justify-center text-white text-center"
                        style={{
                            backgroundImage:
                                "url(https://images.pexels.com/photos/64613/pexels-photo-64613.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)",
                        }}
                    >
                        <div className="bg-black bg-opacity-60 p-6 rounded-lg">
                            <h2 className="text-4xl font-bold mb-2">All Your Pantry Needs</h2>
                            <p className="text-lg">Stock up on essentials with ease</p>
                        </div>
                    </div>
                </SwiperSlide>

                {/* Slide 3 */}
                <SwiperSlide>
                    <div
                        className="h-full w-full bg-cover bg-center flex items-center justify-center text-white text-center"
                        style={{
                            backgroundImage:
                                "url(https://images.pexels.com/photos/5910700/pexels-photo-5910700.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)",
                        }}
                    >
                        <div className="bg-black bg-opacity-60 p-6 rounded-lg">
                            <h2 className="text-4xl font-bold mb-2">Daily Groceries Delivered</h2>
                            <p className="text-lg">Fast, fresh, and affordable</p>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>

            {/* Grocery Grid */}
            <div className="max-w-6xl mx-auto px-4 py-12">
                <h2 className="text-3xl font-bold text-orange-600 mb-8 text-center">Grocery Essentials</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {groceries.map(grocery => (
                        <div key={grocery._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300">
                            <img src={grocery.image} alt={grocery.name} className="w-full h-40 object-cover" />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold">{grocery.name}</h3>
                                <p className="text-orange-600 font-bold mt-1">${grocery.price}</p>
                                <button className="mt-3 w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg transition">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Grocery;
