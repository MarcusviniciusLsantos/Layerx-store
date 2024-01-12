import { useState } from "react";
import styles from "./product-page.module.css";
import { useRouter } from "next/router";
import { useCartContext } from "@/contexts/use-cart-context";
import { beproPrice } from "@/constants/bepro-price";
import BigNumber from "bignumber.js";

type ProductPageProps = {
  data: {
    sync_product: {
      name: string;
      thumbnail_url: string;
      currency: string;
      description: string;
    };
    sync_variants: {
      availability_status: string;
      size: string;
      retail_price: string;
      image: string;
      product: { image: string };
    }[];
  };
};

export default function ProductPage({ data }: ProductPageProps) {
  const [sizeIndex, setSizeIndex] = useState<number>(
    data?.sync_variants?.length
  );
  const { back } = useRouter();
  const context = useCartContext();
  console.log("sizeIndex", data);

  function isOpacity(key: number) {
    return key + 1 !== sizeIndex;
  }

  return (
    <>
      <div className={styles.back} onClick={back}>
        {"<"} Back to Store
      </div>
      <div className={styles.product}>
        <div className={styles.productImage}>
          <img
            src={data?.sync_product?.thumbnail_url}
            alt={data?.sync_product?.name}
            width={619.9}
            height={619.9}
          />
        </div>
        <div className={styles.productDescription}>
          <div>
            <h1>{data?.sync_product?.name}</h1>
          </div>
          <div className={styles.money}>
            <span>
              {sizeIndex > 0 &&
                BigNumber(data.sync_variants[sizeIndex - 1].retail_price)
                  .dividedBy(BigNumber(beproPrice))
                  .toFixed(2)
                  ?.toString()}{" "}
              BEPRO
            </span>
          </div>

          <div
            style={{
              display: "flex",
              padding: "1.5rem 1rem 1.5rem 0",
              flexWrap: "wrap",
            }}
          >
            {data?.sync_variants?.map((item: any, key: number) => (
              <button
                key={key}
                disabled={item.availability_status !== "active"}
                onClick={() => setSizeIndex(key + 1)}
                className={`${styles.cardSize} ${
                  !isOpacity(key) ? styles.activeSize : ""
                }`}
              >
                <h2>{item.size}</h2>
              </button>
            ))}
          </div>
          <div
            style={{
              margin: "0 0 2rem 0",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <button
              className={styles.button}
              disabled={
                data.sync_variants[sizeIndex - 1]?.availability_status !==
                "active"
              }
              onClick={() => {
                context?.setCarts([...context?.carts, { ...data, sizeIndex }]);
              }}
            >
              Add to Cart
            </button>
          </div>
          <div className={styles.description}>
            <h3>Description</h3>
            <span>{data?.sync_product?.description}</span>
          </div>
        </div>
      </div>
    </>
  );
}
