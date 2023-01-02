import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../services/Prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      try {
        const { id } = req.query;
        const result = await prisma.pessoas.findUnique({
          where: {
            Id: id as string,
          },
        });

        if (result) {
          res.json(result);
          return;
        }

        res.status(404).send({ message: "Sócio não encontrado." });
      } catch (error) {
        res.status(500).send({ error });
      }
      break;

    case "PATCH":
      try {
        const { id } = req.query;
        const { body } = req;
        const result = await prisma.pessoas.update({
          where: {
            Id: id as string,
          },
          data: body,
        });
        res.json(result)
      } catch (error) {
        res.status(500).send({ error });
      }
      break;

    default:
      res.status(400).send({
        metodo: req.method,
        message: "Método não implementado para esta entidade",
      });
      break;
  }
}
