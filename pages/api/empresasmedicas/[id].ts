import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../services/Prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      try {
        const result = await prisma.empresasMedicas.findUnique({
          where: {
            Id: req.query.id as string,
          },
        });

        if (result) return res.json(result);

        res.status(404).send({ message: "Empresa médica não encontrada! " });
      } catch (error) {
        res.status(500).send({ error });
      }
      break;

    default:
      res.status(400).send({
        metodo: req.method,
        message: "Método não implementado para esta entidade!",
      });
      break;
  }
}
