import { AppProps } from "next/app";

import "@/styles/globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "@/components/header/header";
import { useState } from "react";
import {CartContext} from "@/contexts/use-cart-context";


function MyApp({ Component, pageProps }: AppProps) {
  const [mode, setMode] = useState("light");
  const [carts, setCarts] = useState([]);

  return (
    <CartContext.Provider value={{carts, setCarts}}>
    <div className={`body primary-color ${mode}`}>
      <Header onSwitchChange={(e) => setMode(e ? "dark" : "light")}
              isSwitchChecked={mode === "dark"} />
      <Component {...pageProps} />
    </div>
    </CartContext.Provider>
  );
}

export default MyApp;
