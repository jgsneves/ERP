import { NextApiRequest, NextApiResponse } from "next";
import prisma from "services/Prisma";
import { ErrorHandler } from "utils/ErrorHandler";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      try {
        const result = await prisma.pessoas.create({
          data: req.body,
        });

        res.json(result);
      } catch (error) {
        ErrorHandler.logPrismaError(error);
        res.status(500).send({ error });
      }
      break;

    case "GET":
      try {
        const result = await prisma.pessoas.findMany({
          where: {
            Tipo: "EMPREGADO",
          },
        });

        res.json(result);
      } catch (error) {
        ErrorHandler.logPrismaError(error);
        res.status(500).send({ error });
      }
      break;

    default:
      res.status(400).send({
        metodo: req.method,
        message: "Método não implementado para esta entidade.",
      });
  }
}
