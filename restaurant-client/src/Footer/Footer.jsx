const Footer = () => {
    return (
      <footer className="bg-orange-600 text-white px-4 py-10 mt-10">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand & Contact */}
          <div>
            <h2 className="text-2xl font-semibold mb-2">Foodie Hub</h2>
            <p className="mb-2">Delicious food at your fingertips.</p>
            <p>Seller: Shahadat Hossain (Salman)</p>
            <p>WhatsApp: <a href="https://wa.me/+96892820183" className="underline">+96892820183</a></p>
          </div>
  
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-2">Quick Links</h3>
            <ul className="space-y-1">
              <li><a href="/drinks" className="hover:underline">Drinks</a></li>
              <li><a href="/cookies" className="hover:underline">Cookies</a></li>
              <li><a href="/grocery" className="hover:underline">Grocery</a></li>
              <li><a href="/rice" className="hover:underline">Rice Items</a></li>
              <li><a href="/fast-food" className="hover:underline">Fast Food</a></li>
            </ul>
          </div>
  
          {/* Contact & Social */}
          <div>
            <h3 className="text-xl font-semibold mb-2">Contact Info</h3>
            <p>Email: <a href="mailto:srabon@example.com" className="underline">srabon@example.com</a></p>
            <p>Phone: +96892820183</p>
            <p className="mt-2">Location: Mejhuna, Oman</p>
          </div>
        </div>
  
        {/* Footer Bottom */}
        <div className="text-center mt-8 border-t border-white/30 pt-4 text-sm">
          &copy; {new Date().getFullYear()} Foodie Hub. All rights reserved.
        </div>
      </footer>
    );
  };
  
  export default Footer;
  