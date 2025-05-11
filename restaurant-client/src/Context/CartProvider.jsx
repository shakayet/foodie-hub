import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const addToCart = (item) => {
    const existing = cartItems.find(i => i.id === item.id);
    if (existing) {
      setCartItems(cartItems.map(i =>
        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
      ));
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter(i => i.id !== id));
  };

  const increaseQuantity = (id) => {
    setCartItems(cartItems.map(i =>
      i.id === id ? { ...i, quantity: i.quantity + 1 } : i
    ));
  };

  const decreaseQuantity = (id) => {
    setCartItems(cartItems.map(i => {
      if (i.id === id) {
        if (i.quantity > 1) {
          return { ...i, quantity: i.quantity - 1 };
        } else {
          return null; // Mark for removal
        }
      }
      return i;
    }).filter(Boolean)); // Remove nulls
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
