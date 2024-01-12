import React, { useEffect, useState } from "react";

import Offcanvas from "react-bootstrap/Offcanvas";

import style from "./overlay.module.css";
import { useCartContext } from "@/contexts/use-cart-context";
import BigNumber from "bignumber.js";
import { useRouter } from "next/router";

export default function OffCanvas({ ...props }) {
  const [isOpen, setIsOpen] = useState(false);
  const {push} = useRouter();
  const context = useCartContext();

  const total = context?.carts?.map((e: any) => e.sync_variants[e.sync_product.variants - 1].retail_price) || [0];

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
                      <img src={item.sync_product.thumbnail_url} width={92.06} height={92.06} />
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
                        size: {item.sync_variants[item.sizeIndex - 1].size}
                      </span>
                      <span>{item.sync_variants[item.sizeIndex - 1].retail_price}</span>
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
            <button className={style.button} onClick={() => {
              push('/checkout')
              setIsOpen(false)
            }}>Check out</button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
