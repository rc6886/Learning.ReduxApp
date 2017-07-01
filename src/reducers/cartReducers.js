'use strict';

export function cartReducers(state = {cart: []}, action) {
  switch (action.type) {
    case 'ADD_TO_CART':
      return {cart: [...state, ...action.payload]};
    case 'DELETE_CART_ITEM':
      return {cart: [...state, ...action.payload]};
    case 'UPDATE_CART':
      const currentCartToUpdate = [...state.cart];
      const indexToUpdate = currentCartToUpdate.findIndex(
        function (cart) {
          return cart._id === action._id;
        }
      );

      const newCartToUpdate = {
        ...currentCartToUpdate[indexToUpdate],
        quantity: currentCartToUpdate[indexToUpdate].quantity + action.unit
      };

      let cartUpdate = [...currentCartToUpdate.slice(0, indexToUpdate), newCartToUpdate, ...currentCartToUpdate.slice(indexToUpdate + 1)];
      return {...state, cart: cartUpdate};
    default:
      return state;
  }
}