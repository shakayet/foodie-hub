import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../Context/CartProvider';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { cartItems, addToCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [bottomOffset, setBottomOffset] = useState(24);
  const [allItems, setAllItems] = useState([]);
  const [displayedItems, setDisplayedItems] = useState([]);
  const [itemsToShow, setItemsToShow] = useState(20);

  useEffect(() => {
    const fetchAllItems = async () => {
      try {
        const endpoints = ['drinks', 'rice', 'groceries', 'cookies', 'fastfood'];
        const responses = await Promise.all(
          endpoints.map(endpoint =>
            fetch(`http://localhost:5000/api/${endpoint}`).then(res => res.json())
          )
        );
        const combinedItems = responses.flat();
        // Shuffle randomly
        const shuffled = combinedItems.sort(() => Math.random() - 0.5);
        setAllItems(shuffled);
        setDisplayedItems(shuffled.slice(0, itemsToShow));
      } catch (err) {
        console.error('Failed to fetch items:', err);
      }
    };

    fetchAllItems();
  }, []);

  useEffect(() => {
    setDisplayedItems(allItems.slice(0, itemsToShow));
  }, [itemsToShow, allItems]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 130) {
        setBottomOffset(100);
      } else {
        setBottomOffset(24);
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div
        className="hero h-[80vh] bg-cover bg-center text-white flex flex-col justify-center items-center"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/687824/pexels-photo-687824.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)'
        }}
      >
        <h1 className="text-5xl font-extrabold drop-shadow mb-4 text-center">Bet! You can't eat less</h1>
        <button
          onClick={() => document.getElementById('favorites').scrollIntoView({ behavior: 'smooth' })}
          className="mt-4 px-6 py-3 rounded-lg bg-orange-600 text-white hover:bg-orange-700 shadow-lg"
        >
          Order Now
        </button>
      </div>

      {/* Popular Items */}
      <div id="favorites" className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-orange-600 mb-8 text-center">Popular Dishes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayedItems.map(item => (
            <div key={item._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300">
              <img src={item.image} alt={item.name} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-orange-600 font-bold mt-1">${item.price}</p>
                <button
                  onClick={() => addToCart(item)}
                  className="mt-3 w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg transition"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {displayedItems.length < allItems.length && (
          <div className="text-center mt-10">
            <button
              onClick={() => setItemsToShow(prev => prev + 20)}
              className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition"
            >
              Load More Items
            </button>
          </div>
        )}
      </div>

      {/* Floating Buttons */}
      <div
        className="fixed right-6 flex flex-col gap-4 items-end z-50 transition-all duration-300"
        style={{ bottom: `${bottomOffset}px` }}
      >
        {cartItems.length > 0 && (
          <button
            className="relative bg-orange-600 text-white px-5 py-3 rounded-full shadow-lg hover:bg-orange-700"
            onClick={() => navigate('/cart')}
          >
            🛒 Cart
            <span className="absolute -top-2 -right-2 bg-white text-orange-600 font-bold rounded-full px-2 text-sm shadow">
              {cartItems.length}
            </span>
          </button>
        )}
        <a href="https://wa.me/96892820183" target="_blank" rel="noopener noreferrer">
          <img
            src="https://img.icons8.com/color/48/000000/whatsapp--v1.png"
            alt="WhatsApp"
            className="w-14 h-14 drop-shadow-lg hover:scale-105 transition"
          />
        </a>
      </div>
    </div>
  );
};

export default Home;
