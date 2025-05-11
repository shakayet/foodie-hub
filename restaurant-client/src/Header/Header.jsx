import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

const NavBar = () => {
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
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16" />
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
    </div>
  );
};

export default NavBar;
