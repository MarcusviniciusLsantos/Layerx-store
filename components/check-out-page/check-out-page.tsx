import { Form } from "react-bootstrap";
import styles from "./check-out-page.module.css";
import { useCartContext } from "@/contexts/use-cart-context";
import BigNumber from "bignumber.js";
import Connect from "../connnect/connect";
import { beproPrice } from "@/constants/bepro-price";

export default function CheckOutPage() {
  const context = useCartContext();

  const total = context?.carts?.map(
    (e: any) => e.sync_variants[e.sync_product.variants - 1].retail_price
  ) || [0];

  const totalValue = total?.reduce((accumulator, currentValue) => {
    const currentValueAsBigNumber = new BigNumber(currentValue);
    return BigNumber(accumulator).plus(currentValueAsBigNumber);
  }, new BigNumber(0));

  return (
    <div className="d-flex" style={{ height: "92.1vh" }}>
      <div className="d-flex flex-column col-6 p-4">
        <h4>Contact</h4>

        <Form.Control
          size="lg"
          type="text"
          placeholder="Email"
          className="my-2"
        />
        <Form.Control
          size="lg"
          type="text"
          placeholder="Country/Region"
          className="my-2"
        />
        <div className="d-flex gap-3">
          <Form.Control size="lg" type="text" placeholder="First name" />
          <Form.Control size="lg" type="text" placeholder="Last name" />
        </div>
        <Form.Control
          size="lg"
          type="text"
          placeholder="Address"
          className="my-2"
        />
        <Form.Control
          size="lg"
          type="text"
          placeholder="Apartment, suite, etc. (optional)"
          className="my-2"
        />
        <div className="d-flex gap-3">
          <Form.Control size="lg" type="text" placeholder="Postal code" />
          <Form.Control size="lg" type="text" placeholder="City" />
          <Form.Control size="lg" type="text" placeholder="Region" />
        </div>
        <Form.Control
          size="lg"
          type="text"
          placeholder="Phone"
          className="mt-2 mb-5"
        />

        <h4>Payment</h4>
        <Connect />

        <button className={styles.button}>Check out</button>
      </div>
      <div className={`d-flex flex-column col-6 p-4 ${styles.cart}`}>
        {context?.carts &&
          context?.carts?.map((item: any, key: number) => (
            <div
              className="d-flex justify-content-between align-items-center"
              key={key}
            >
              <div className="my-4">
                <img
                  src={item.sync_product.thumbnail_url}
                  width={92.06}
                  height={92.06}
                />
              </div>
              <div className="d-flex flex-column">
                <span className="my-1">
                  {item.sync_variants[item.sizeIndex - 1].name}{" "}
                </span>
                <span style={{ opacity: "60%" }}>
                  Size:{item.sync_variants[item.sizeIndex - 1].size}
                </span>
              </div>
              <div>
                x
                {
                  item.sync_variants.filter(
                    (e: any) =>
                      e.id === item.sync_variants[item.sizeIndex - 1].id
                  ).length
                }
              </div>
              <div>
                {BigNumber(item.sync_variants[item.sizeIndex - 1].retail_price)
                  .dividedBy(BigNumber(beproPrice))
                  .toFixed(2)
                  ?.toString()}{" "}
                BEPRO
              </div>
            </div>
          ))}

        <div className="d-flex justify-content-between my-2">
          <span style={{ opacity: "60%" }}>Subtotal</span>
          <span>
            {console.log(
              "totalValue?.dividedBy(BigNumber(beproPrice))",
              totalValue,
              BigNumber(beproPrice)
            )}
            {totalValue
              ?.dividedBy(BigNumber(beproPrice))
              ?.toFixed(2)
              ?.toString()}{" "}
            BEPRO
          </span>
        </div>
        <div className="d-flex justify-content-between my-2">
          <span style={{ opacity: "60%" }}>Shipping</span>
          <span>
            {totalValue
              ?.dividedBy(BigNumber(beproPrice))
              ?.multipliedBy(0.1)
              ?.toFixed(2)
              ?.toString()}{" "}
            BEPRO
          </span>
        </div>
        <div className="d-flex justify-content-between my-2">
          <span>Total</span>
          <span>
            {totalValue
              ?.dividedBy(BigNumber(beproPrice))
              ?.multipliedBy(1.1)
              ?.toFixed(2)
              ?.toString()}{" "}
            BEPRO
          </span>
        </div>
      </div>
    </div>
  );
}
