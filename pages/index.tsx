import { GetServerSideProps } from "next";
import Store from "../components/Store";

export default Store;

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
  locale,
}) => {
  const apiKey = "YOUR_API_KEY";
  const apiUrl = "https://api.printful.com";

  const headers = {
    "Content-Type": "application/json",
    //'Authorization': `Bearer ${apiKey}`,
  };

  // Make a GET request to retrieve a list of products
  const data = await fetch(`${apiUrl}/products`, {
    method: "GET",
    headers: headers,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("List of products:", data.result);
      return data.result;
    })
    .catch((error) => {
      console.error("Error getting products:", error);
    });

  return {
    props: { data },
  };
};
