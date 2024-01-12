import ProductPage from "../../components/Product-page";
import { GetServerSideProps } from "next";

export default ProductPage

export const getServerSideProps: GetServerSideProps = async ({
    req,
    query,
    locale,
  }) => {
    console.log('query', query)
    const { id } = query;
    const apiKey = "YOUR_API_KEY";
    const apiUrl = "https://api.printful.com";
  
    const headers = {
      "Content-Type": "application/json",
      //'Authorization': `Bearer ${apiKey}`,
    };
  
    // Make a GET request to retrieve a list of products
    const data = await fetch(`${apiUrl}/products/${id}`, {
      method: "GET",
      headers: headers,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("product:", data.result);
        return data.result;
      })
      .catch((error) => {
        console.error("Error getting products:", error);
      });
  
    return {
      props: { data },
    };
  };
  