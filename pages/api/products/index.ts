import {NextApiRequest, NextApiResponse} from "next";
import {fetchPrintful} from "@/server/utils/fetch-printful";

export default async function ProductsHandler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "get":
      res.status(200).json(await fetchPrintful(`/products`, {method: "GET"}))
      break;
    default:
      res.status(405).json({message: "error"});
  }

  res.end();
}