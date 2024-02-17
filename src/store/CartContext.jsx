import React, { createContext, useReducer } from "react";

// Create a context for managing the shopping cart state
const CartContext = createContext({
  items: [], // Initial state: empty array of items
  addItem: (item) => {}, // Placeholder function for adding items
  removeItem: (id) => {}, // Placeholder function for removing items
  clearCart: () => {}, // Placeholder function for clearing items in the cart
});

// Reducer function to handle state changes for the shopping cart
function cartReducer(state, action) {
  // Action type to add items to the cart
  if (action.type === "ADD_ITEMS") {
    // Find the index of the item if it already exists in the cart
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    // Create a copy of the current items array
    const updatedItems = [...state.items];

    // If the item already exists, update its quantity
    if (existingCartItemIndex > -1) {
      const existingItem = state.items[existingCartItemIndex];
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else { // Otherwise, add the item to the cart with quantity 1
      updatedItems.push({ ...action.item, quantity: 1 });
    }

    // Return the updated state with the modified items array
    return { ...state, items: updatedItems };
  }

  // Action type to remove items from the cart
  if (action.type === "REMOVE_ITEMS") {
    // Find the index of the item to be removed
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );

    // Get the item to be removed
    const existingCartItem = state.items[existingCartItemIndex];

    // Create a copy of the current items array
    const updatedItems = [...state.items];

    // If the item quantity is 1, remove it from the cart
    if (existingCartItem.quantity === 1) {
      updatedItems.splice(existingCartItemIndex, 1);
    } else { // Otherwise, decrease its quantity by 1
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    // Return the updated state with the modified items array
    return { ...state, items: updatedItems };
  }

  // Action type to clear the cart
  if (action.type === 'CLEAR_CART') {
    return { ...state, items: [] };
  }

  // Default case: return current state
  return state;
}

// Context provider component for managing the cart state
export const CartContextProvider = ({ children }) => {
  // Use reducer hook to manage cart state with cartReducer function
  const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });

  // Function to add an item to the cart
  function addItem(item) {
    dispatchCartAction({ type: "ADD_ITEMS", item });
  }
  // Function to remove an item from the cart
  function removeItem(id) {
    dispatchCartAction({ type: "REMOVE_ITEMS", id });
  }

  // Function to clear the cart
  function clearCart() {
    dispatchCartAction({ type: "CLEAR_CART" });
  }

  // Context value containing current items and functions to add/remove items
  const contextValue = {
    items: cart.items,
    addItem,
    removeItem,
    clearCart,
  };

  // Provide the context value to its children components
  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
};

// Export the CartContext for other components to consume
export default CartContext;
