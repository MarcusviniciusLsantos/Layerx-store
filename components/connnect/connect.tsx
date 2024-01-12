import React, { useEffect, useState } from "react";

import Offcanvas from "react-bootstrap/Offcanvas";

import style from "./overlay.module.css";
import { useCartContext } from "@/contexts/use-cart-context";
import { WalletSelector, useDappkit, } from "dappkit-react";
import { Form } from "react-bootstrap";

export default function Connect({ ...props }) {
  const [isOpen, setIsOpen] = useState(false);
  const { address, disconnect } = useDappkit();
  const context = useCartContext();

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>

      {address ? (
      <div className="d-flex flex-column">
      <span className="mb-1">Wallet</span>
      <div className="d-flex gap-2">
        
      <Form.Control
        size="lg"
        type="text"
        placeholder="Email"
        value={address ? address : ''}
      />
      <div style={{
          border: '1px solid',
          color: 'red',
          borderRadius: '8px',
          cursor: 'pointer'
      }}
      className="d-flex justify-content-center align-items-center p-2"
      onClick={disconnect}
      >
          Disconnect
      </div>
      </div>

    </div>
      ) : (
        <div
        style={{
          cursor: "pointer",
          marginRight: "1rem",
        }}
        className={style.button}
        onClick={handleOpen}
      >
       {address ? address : 'Connect Wallet'} 
      </div>
      )}

      <Offcanvas show={isOpen} onHide={handleClose} {...props}>
        <Offcanvas.Header className={style.title} closeButton>
          <Offcanvas.Title>Connect</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <WalletSelector
            availableWallets={["Metamask", "Coinbase"]}
            showAddress={false}
            onConnectorDisconnect={() => setIsOpen(false)}
            onConnectorConnect={() => setIsOpen(false)}
          />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
