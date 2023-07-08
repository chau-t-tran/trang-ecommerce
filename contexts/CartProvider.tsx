import { createContext, useReducer, ReactNode } from 'react';

export enum CartActionType {
  AddItem,
  RemoveItem,
  SetQuantity,
  RemoveMultipleIds
}

interface CartAction {
  type: CartActionType;
  id?: string;
  ids?: string[];
  quantity?: number;
}

export interface CartState {
  cartMap: Map<string, number>;
}

// Define the initial state
const initialState: CartState = {
  cartMap: new Map<string, number>(),
};

// Create the app context
export const CartContext = createContext<{ state: CartState; dispatch: React.Dispatch<CartAction> }>({
  state: initialState,
  dispatch: () => null,
});

// Create the app provider component
export function CartProvider({ children }: { children: ReactNode }) {
  function cartReducer(state: CartState, action: CartAction): CartState {
    switch (action.type) {
      case CartActionType.AddItem:
        if (state.cartMap.has(action.id!))
        {
          const count: number = state.cartMap.get(action.id!)!;
          return {cartMap: state.cartMap.set(action.id!, count + 1)};
        }
        return {cartMap: state.cartMap.set(action.id!, 1)};

      case CartActionType.RemoveItem:
        const count = state.cartMap.get(action.id!)!;
        if (count == undefined || count <= 1)
        {
          state.cartMap.delete(action.id!);
          return {cartMap: state.cartMap};
        }
        return {cartMap: state.cartMap.set(action.id!, count - 1)};

      case CartActionType.SetQuantity:
        if (state.cartMap.has(action.id!))
        {
          return {cartMap: state.cartMap.set(action.id!, action.quantity ?? 1)};
        }

      case CartActionType.RemoveMultipleIds:
        action.ids!.forEach(id => state.cartMap.delete(id));
        return {cartMap: state.cartMap};

      default:
        return {...state};
    }
  }

  const [state, dispatch] = useReducer(cartReducer, initialState);
  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};
