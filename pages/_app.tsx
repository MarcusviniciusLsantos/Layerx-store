import { AppProps } from "next/app";

import "../styles/globals.css";
import { createContext, useContext, useState } from "react";
import Header from "../components/Header";
import 'bootstrap/dist/css/bootstrap.min.css';

const CartContext = createContext<{carts: {}[]; setCarts: (e: any) => void} | undefined>(undefined);

export const useCartContext = () => {
  const context = useContext(CartContext);

  return context;
}

function MyApp({ Component, pageProps }: AppProps) {
  const [mode, setMode] = useState("light");
  const [carts, setCarts] = useState([]);

  return (
    <CartContext.Provider value={{
      carts,
      setCarts
    }}>
    <div className={`body primary-color ${mode}`}>
      <Header
        onSwitchChange={(e) => setMode(e ? "dark" : "light")}
        isSwitchChecked={mode === "dark"}
      />
      <Component {...pageProps} />
    </div>
    </CartContext.Provider>
  );
}

export default MyApp;
