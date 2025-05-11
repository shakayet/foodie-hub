import { useContext, useState } from 'react';
import { CartContext } from '../../context/CartProvider';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = useContext(CartContext);
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const sendOrderToWhatsApp = () => {
    const managerPhoneNumber = '+96892820183'; 

    let message = `*New Order Received!*\n\n`;
    cartItems.forEach(item => {
        message += `🍽 ${item.name} x${item.quantity} = $${(item.price * item.quantity).toFixed(2)}\n`;
    });
    message += `\n*Total:* $${total.toFixed(2)}\n`;
    message += `📍 *Address:* ${address}\n📞 *Phone:* ${phone}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${managerPhoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleOrder = () => {
    if (!address || !phone) {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Please enter your address and phone number!',
      });
      return;
    }

    sendOrderToWhatsApp(); // Send message to restaurant

    Swal.fire({
      icon: 'success',
      title: 'Order Placed!',
      text: 'Your order has been successfully submitted.',
      timer: 2000,
      showConfirmButton: false,
    });

    clearCart();
    navigate('/');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-4 text-center text-orange-600">Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map(item => (
              <div key={item.id} className="flex items-center justify-between border p-4 rounded-lg shadow-sm">
                <div>
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <p className="text-sm text-gray-600">Price: ${item.price} × {item.quantity}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    className="bg-orange-500 text-white px-2 py-1 rounded hover:bg-orange-600"
                    onClick={() => decreaseQuantity(item.id)}
                    disabled={item.quantity <= 1}
                  >-</button>
                  <span className="font-medium">{item.quantity}</span>
                  <button
                    className="bg-orange-500 text-white px-2 py-1 rounded hover:bg-orange-600"
                    onClick={() => increaseQuantity(item.id)}
                  >+</button>
                  <button
                    className="ml-4 text-red-500 hover:underline"
                    onClick={() => removeFromCart(item.id)}
                  >Remove</button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-right font-bold text-lg text-orange-700">
            Total: ${total.toFixed(2)}
          </div>

          <div className="mt-6 grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Your Address"
              className="input input-bordered w-full border border-gray-300 rounded px-3 py-2"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <input
              type="tel"
              placeholder="Phone Number"
              className="input input-bordered w-full border border-gray-300 rounded px-3 py-2"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="mt-6 flex justify-between items-center">
            <button
              className="bg-red-500 text-white px-5 py-2 rounded hover:bg-red-600"
              onClick={clearCart}
            >
              Clear Cart
            </button>

            <button
              className="bg-green-500 text-white px-5 py-2 rounded hover:bg-green-600"
              onClick={handleOrder}
            >
              Order Now
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
