import { GetServerSideProps } from "next";
import StorePage from "@/components/store-page/store-page";
import {fetchPrintful} from "@/server/utils/fetch-printful";

export default StorePage;

export const getServerSideProps: GetServerSideProps = async () => {

  return {
    props: {
      data: await fetchPrintful(`/products`, {method: "get"})
    },
  };
};
