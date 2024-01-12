import {NextApiRequest, NextApiResponse} from "next";
import {fetchPrintful} from "@/server/utils/fetch-printful";

export default async function GetProduct(req: NextApiRequest, res: NextApiResponse) {
  const id = req.query?.id;
  switch (req.method) {
    case "GET":
      res.status(200).json(await fetchPrintful(`/products/${id}`, {method: "get"}))
      break;
    default:
      res.status(405).json({message: "error"});
  }

  res.end();
}