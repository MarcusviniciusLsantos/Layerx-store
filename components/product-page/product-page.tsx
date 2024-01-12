import { useState } from "react";
import styles from "./product-page.module.css";
import { useRouter } from "next/router";
import { useCartContext } from "@/contexts/use-cart-context";

type ProductPageProps = {
  data: {
    product: { title: string, image: string, currency: string, description: string },
    variants: { size: string; price: string, image: string }[]
  }
};

export default function ProductPage({ data }: ProductPageProps) {
  const [sizeIndex, setSizeIndex] = useState<number>(data?.variants?.length);
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
          {sizeIndex > 0 && (
            <img src={data?.variants[sizeIndex - 1]?.image}
                 alt={data?.product.title}
                 width={619.9}
                 height={619.9}/>
          )}
          <img src={data?.product?.image}
               alt={data?.product?.title}
               width={619.9}
               height={619.9}/>
        </div>
        <div className={styles.productDescription}>
          <div>
            <h1>{data?.product?.title}</h1>
          </div>
          <div className={styles.money}>
            <span>
              {sizeIndex > 0 && data?.variants[sizeIndex - 1]?.price}{" "}
              {data?.product?.currency}
            </span>
          </div>

          <div style={{
            display: "flex",
            padding: "1.5rem 1rem 1.5rem 0",
            flexWrap: "wrap",
          }}>
            {data?.variants?.map((item: any, key: number) => (
              <div key={key}
                   onClick={() => setSizeIndex(key + 1)}
                   className={`${styles.cardSize} ${!isOpacity(key) ? styles.activeSize : ""}`}>
                <h2>{item.size}</h2>
              </div>
            ))}
          </div>
          <div
            style={{
              margin: "0 0 2rem 0",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <button className={styles.button}
                    onClick={() => {context?.setCarts([...context?.carts, data?.variants[sizeIndex - 1]])}}>
              Add to Cart
            </button>
          </div>
          <div className={styles.description}>
            <h3>Description</h3>
            <span>{data?.product?.description}</span>
          </div>
        </div>
      </div>
    </>
  );
}
