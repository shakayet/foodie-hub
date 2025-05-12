import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { useContext } from "react";
import { CartContext } from "../Context/CartProvider";


const NavBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [allItems, setAllItems] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchAllItems = async () => {
      try {
        const endpoints = ['drinks', 'rice', 'groceries', 'cookies', 'fastfood'];
        const responses = await Promise.all(
          endpoints.map(endpoint =>
            fetch(`http://localhost:5000/api/${endpoint}`).then(res => res.json())
          )
        );

        const allFetchedItems = responses.flat(); // Merge all category arrays into one
        setAllItems(allFetchedItems);
      } catch (err) {
        console.error('Failed to fetch items:', err);
      }
    };

    fetchAllItems();
  }, []);


  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term.length > 0) {
      const filtered = allItems.filter((item) =>
        item.name.toLowerCase().includes(term.toLowerCase())
      );
      setSearchResults(filtered);
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  };

  const handleAddToCart = (item) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = [...existingCart, item];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    alert(`${item.name} added to cart!`);
  };


  const navOptions = (
    <>
      <li><Link to="/drinks">Drinks</Link></li>
      <li><Link to="/cookies">Cookies</Link></li>
      <li><Link to="/grocery">Grocery</Link></li>
      <li><Link to="/rice">Rice Items</Link></li>
      <li><Link to="/fast-food">Fast Food</Link></li>
    </>
  );

  return (
    <div className="navbar fixed top-0 left-0 right-0 z-10 bg-orange-600 text-white shadow-md px-4">
      {/* Navbar Start */}
      <div className="navbar-start">
        {/* Mobile Dropdown */}
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </label>
          <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-white text-black rounded-box w-52">
            <li>
              <Link to="/" className="flex items-center gap-2">
                <FaHome /> Home
              </Link>
            </li>
            {navOptions}
          </ul>
        </div>

        {/* Home Icon + Brand */}
        <Link to="/" className="btn btn-ghost normal-case text-xl flex items-center gap-2">
          <FaHome className="text-xl" />
          Foodie Hub
        </Link>
      </div>

      {/* Navbar Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-2">
          {navOptions}
        </ul>
      </div>

      {/* Navbar End (Search Bar + Admin Link) */}
      <div className="navbar-end flex items-center gap-4">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setSearchTerm("");
              setShowModal(false); // Optional: close modal after Enter
            }
          }}
          placeholder="Search..."
          className="input input-bordered rounded-full px-4 text-black w-32 md:w-64"
        />

        <Link
          to="/admin-login"
          className="btn btn-outline btn-sm border-white text-white hover:bg-white hover:text-orange-600"
        >
          Admin
        </Link>
      </div>

      {/* Search Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-start pt-24 z-50">
          <div className="bg-white text-black p-6 rounded-xl w-11/12 max-w-2xl max-h-[80vh] overflow-y-auto shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Search Results</h3>
            {searchResults.length === 0 ? (
              <p>No items found.</p>
            ) : (
              <ul className="space-y-3">
                {searchResults.map((item) => (
                  <li key={item._id} className="border-b pb-2">
                    <div className="flex items-center gap-4">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                      <div className="flex-1">
                        <p className="font-bold">{item.name}</p>
                        <p className="text-orange-600 font-semibold">${item.price}</p>
                      </div>
                      <button
                        onClick={() => {
                          addToCart(item);
                          alert(`${item.name} added to cart!`);
                        }}
                        className="px-3 py-1 bg-orange-500 text-white rounded hover:bg-orange-600"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            <button
              onClick={() => setShowModal(false)}
              className="mt-6 px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
