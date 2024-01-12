import { useRouter } from "next/router";
import Card from "./Card";
import styles from "./Store.module.css";

export interface StorePageProps {
  data: any;
}

export default function Store({ data }: StorePageProps) {
  const { push } = useRouter();
  console.log("data", data);
  return (
    <div className={styles.store}>
      {data?.map((item: any) => (
        <Card
          key={item.id}
          id={item.id}
          value={item.currency}
          title={item.title}
          image={item.image}
          onClick={() =>
            push({
              pathname: `product/[id]`,
              query: {
                id: item.id,
              },
            })
          }
        />
      ))}
    </div>
  );
}
