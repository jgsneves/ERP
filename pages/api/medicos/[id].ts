import { NextApiRequest, NextApiResponse } from "next";
import prisma from "services/Prisma";
import { ErrorHandler } from "utils/ErrorHandler";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      try {
        const result = await prisma.pessoas.findUnique({
          where: {
            Id: req.query.id as string,
          },
        });

        if (result) {
          return res.json(result);
        }

        res.status(404).send({ message: "Médico não encontrado." });
      } catch (error) {
        ErrorHandler.logPrismaError(error);
        res.status(500).send({ error });
      }
      break;

    case "PATCH":
      try {
        const requestBody = req.body;

        await prisma.pessoas.update({
          where: {
            Id: req.query.id as string,
          },
          data: requestBody,
        });

        res.status(200).send({ message: "Médico atualizado com sucesso!" });
      } catch (error) {
        ErrorHandler.logPrismaError(error);
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
