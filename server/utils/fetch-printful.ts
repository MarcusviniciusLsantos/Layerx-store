import {PrintfulHeader} from "@/server/utils/printful-header";

export function fetchPrintful(path: string, init: RequestInit) {
  return fetch(`https://api.printful.com/${path}`, {headers: PrintfulHeader, ... init})
    .then((response) => response.json())
    .then((data) => {
      console.log("List of products:", data.result);
      return data.result;
    })
    .catch((error) => {
      console.error("Error getting products:", error);
      return [];
    })
}