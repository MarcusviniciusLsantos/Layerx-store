import { useRouter } from "next/router";
import Card from "@/components/card/card";
import styles from "./store-page.module.css";

export interface StorePageProps {
  data: any;
}

export default function StorePage({ data }: StorePageProps) {
  const { push } = useRouter();
  console.log("data", data);
  return (
    <div className={styles.store}>
      {data?.map((item: any) => (
        <Card key={item.id}
              id={item.id}
              title={item.name}
              image={item.thumbnail_url}
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
