import React, { createContext, useState } from 'react';
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (item) => {
        setCartItems([...cartItems, { ...item, quantity: 1 }]);
    };

    const removeFromCart = (index) => {
        setCartItems((prevItems) => prevItems.filter((_, i) => i !== index));
    };

    const updateCartItem = (index, newQuantity) => {
        if (newQuantity <= 0) {
            removeFromCart(index);
        } else {
            setCartItems((prevItems) => {
                const updatedItems = [...prevItems];
                updatedItems[index].quantity = newQuantity;
                return updatedItems;
            });
        }
    };

    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                updateCartItem, 
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
