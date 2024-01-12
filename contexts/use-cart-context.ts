import {createContext, useContext} from "react";

export const CartContext = createContext<{carts: {}[]; setCarts: (e: any) => void} | undefined>(undefined);

export const useCartContext = () => {
  const context = useContext(CartContext);

  return context;
}