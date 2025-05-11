import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const FastFood = () => {
    const [foods, setFoods] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/fastfood") 
            .then(res => res.json())
            .then(data => setFoods(data))
            .catch(err => console.error("Failed to load fast food items:", err));
    }, []);

    return (
        <div className="min-h-screen bg-yellow-50">
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
                {/* Burger Slide */}
                <SwiperSlide>
                    <div
                        className="h-full w-full bg-cover bg-center flex items-center justify-center text-white text-center"
                        style={{
                            backgroundImage:
                                "url(https://images.pexels.com/photos/2983098/pexels-photo-2983098.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)",
                        }}
                    >
                        <div className="bg-black bg-opacity-60 p-6 rounded-lg">
                            <h2 className="text-4xl font-bold mb-2">Juicy Burgers</h2>
                            <p className="text-lg">Taste the grill, feel the thrill</p>
                        </div>
                    </div>
                </SwiperSlide>

                {/* Pizza Slide */}
                <SwiperSlide>
                    <div
                        className="h-full w-full bg-cover bg-center flex items-center justify-center text-white text-center"
                        style={{
                            backgroundImage:
                                "url(https://cdn.pixabay.com/photo/2017/12/09/08/18/pizza-3007395_1280.jpg)",
                        }}
                    >
                        <div className="bg-black bg-opacity-60 p-6 rounded-lg">
                            <h2 className="text-4xl font-bold mb-2">Hot & Cheesy Pizza</h2>
                            <p className="text-lg">Slice into flavor paradise</p>
                        </div>
                    </div>
                </SwiperSlide>

                {/* Fries Slide */}
                <SwiperSlide>
                    <div
                        className="h-full w-full bg-cover bg-center flex items-center justify-center text-white text-center"
                        style={{
                            backgroundImage:
                                "url(https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)",
                        }}
                    >
                        <div className="bg-black bg-opacity-60 p-6 rounded-lg">
                            <h2 className="text-4xl font-bold mb-2">Crispy Fries & Burger</h2>
                            <p className="text-lg">Golden bites of happiness</p>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>

            {/* Fast Food Grid */}
            <div className="max-w-6xl mx-auto px-4 py-12">
                <h2 className="text-3xl font-bold text-orange-600 mb-8 text-center">Fast Food Favorites</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {foods.map(food => (
                        <div key={food._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300">
                            <img src={food.image} alt={food.name} className="w-full h-40 object-cover" />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold">{food.name}</h3>
                                <p className="text-orange-600 font-bold mt-1">${food.price}</p>
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

export default FastFood;
