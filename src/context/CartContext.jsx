import { createContext, useContext, useState } from "react";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem("carrito");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const persist = (items) => {
    setCartItems(items);
    localStorage.setItem("carrito", JSON.stringify(items));
  };

  const addToCart = (producto) => {
    const exists = cartItems.find(item => item._id === producto._id);
    let updatedCart;

    if (exists) {
      updatedCart = cartItems.map(item =>
        item._id === producto._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [...cartItems, { ...producto, quantity: 1 }];
    }

    persist(updatedCart);
  };

  const removeFromCart = (id) => {
    persist(cartItems.filter(item => item._id !== id));
  };

  // ➕ sumar
  const incrementQty = (id) => {
    persist(
      cartItems.map(i =>
        i._id === id ? { ...i, quantity: i.quantity + 1 } : i
      )
    );
  };

  // ➖ restar (mínimo 1)
  const decrementQty = (id) => {
    persist(
      cartItems.map(i =>
        i._id === id ? { ...i, quantity: Math.max(1, i.quantity - 1) } : i
      )
    );
  };

  // (opcional) vaciar todo
  const clearCart = () => persist([]);

  // (opcional) total €
  const cartTotal = cartItems.reduce(
    (acc, i) => acc + (Number(i.precio) || 0) * i.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        incrementQty,
        decrementQty,
        clearCart,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
