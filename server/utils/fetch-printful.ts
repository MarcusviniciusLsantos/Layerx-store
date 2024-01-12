import {PrintfulHeader} from "@/server/utils/printful-header";

export async function fetchPrintful(path: string, init: RequestInit) {
  return fetch(`https://api.printful.com/${path}`, {headers: PrintfulHeader,... init})
    .then((response) => response.json())
    .then((data) => {
      console.debug("List of products:", JSON.stringify(data, null, 2));
      return data.result;
    })
    .catch((error) => {
      console.error("Error getting products:", error);
      return [];
    })
}