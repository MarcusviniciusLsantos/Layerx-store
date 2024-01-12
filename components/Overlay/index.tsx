import React, { useEffect, useState } from "react";

import Offcanvas from "react-bootstrap/Offcanvas";

import style from "./Overlay.module.css";
import { useCartContext } from "../../pages/_app";
import BigNumber from "bignumber.js";

export default function OffCanvas({ ...props }) {
  const [isOpen, setIsOpen] = useState(false);
  const context = useCartContext();

  const total = context?.carts?.map((e: any) => e.price) || [0];

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  function count() {
    return context?.carts?.length ? `: ${context?.carts?.length}` : "";
  }

  useEffect(() => {
    if (context?.carts?.length || 0 > 0) setIsOpen(true);
    if (context?.carts?.length === 0) setIsOpen(false);
  }, [context?.carts]);

  return (
    <>
      <div
        style={{
          cursor: "pointer",
          marginRight: "1rem",
        }}
        onClick={handleOpen}
      >
        Cart{count()}
      </div>
      <Offcanvas show={isOpen} onHide={handleClose} {...props}>
        <Offcanvas.Header className={style.title} closeButton>
          <Offcanvas.Title>Cart{count()}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {context?.carts &&
              context?.carts?.map((item: any, key: number) => (
                <div className={style.product} key={key}>
                  <div className="d-flex">
                    <div>
                      <img src={item.image} width={92.06} height={92.06} />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <span>{item.name}</span>
                      <span
                        style={{ opacity: "60%", padding: "0.5rem 0 0.5rem 0" }}
                      >
                        size: {item.size}
                      </span>
                      <span>{item.price}</span>
                    </div>
                  </div>
                  <div
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={() => {
                        context?.setCarts(context?.carts?.filter((e: any) => e?.id !== item.id))
                    }}
                  >
                    X
                  </div>
                </div>
              ))}

            <div className="d-flex justify-content-between pb-3">
              <span>SubTotal</span>
              <span>
                {total?.reduce((accumulator, currentValue) => {
                  const currentValueAsBigNumber = new BigNumber(currentValue);
                  return BigNumber(accumulator).plus(currentValueAsBigNumber);
                }, new BigNumber(0))?.toString()}
              </span>
            </div>
            <button className={style.button}>Check out</button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
