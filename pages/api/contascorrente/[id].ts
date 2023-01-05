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

        const result = await prisma.contasCorrente.findUnique({
          where: {
            Id: id as string,
          },
        });

        if (result) {
          res.json(result);
          return;
        }

        res.status(404).send({ message: "Conta corrente não encontrada." });
      } catch (error) {
        res.status(500).send({ error });
      }
      break;

    case "DELETE":
      try {
        const { id } = req.query;

        const result = await prisma.contasCorrente.delete({
          where: {
            Id: id as string,
          },
        });

        res.json(result);
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
