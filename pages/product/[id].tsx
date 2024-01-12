import ProductPage from "../../components/product-page/product-page";
import { GetServerSideProps } from "next";
import {fetchPrintful} from "@/server/utils/fetch-printful";

export default ProductPage

export const getServerSideProps: GetServerSideProps = async ({query}) => {
    console.log('query', query)

    return {
      props: {
        data: await fetchPrintful(`/products/${query?.id}`, {method: "get"})
      },
    };
  };
  