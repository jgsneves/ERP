import { NextApiRequest, NextApiResponse } from "next";
import prisma from "services/Prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "PATCH":
      try {
        const result = await prisma.empregadosPagamentos.update({
          data: req.body,
          where: {
            Id: req.query.id as string,
          },
        });
        res.json(result);
      } catch (error) {
        console.log({ error });
        res.status(500).send({ error });
      }
      break;

    default:
      res.status(400).send({
        method: req.method,
        message: "Método não implementado para esta entidade!",
      });
      break;
  }
}
