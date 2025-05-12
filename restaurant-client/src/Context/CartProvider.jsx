import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const addToCart = (item) => {
    const existing = cartItems.find(i => i._id === item._id);
    if (existing) {
      setCartItems(cartItems.map(i =>
        i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i
      ));
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (_id) => {
    setCartItems(cartItems.filter(i => i._id !== _id));
  };

  const increaseQuantity = (_id) => {
    setCartItems(cartItems.map(i =>
      i._id === _id ? { ...i, quantity: i.quantity + 1 } : i
    ));
  };

  const decreaseQuantity = (_id) => {
    setCartItems(cartItems.map(i => {
      if (i._id === _id) {
        if (i.quantity > 1) {
          return { ...i, quantity: i.quantity - 1 };
        } else {
          return null;
        }
      }
      return i;
    }).filter(Boolean));
  };

  const clearCart = () => setCartItems([]);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      increaseQuantity,
      decreaseQuantity,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
