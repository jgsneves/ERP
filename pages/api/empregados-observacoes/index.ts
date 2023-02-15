import { NextApiRequest, NextApiResponse } from "next";
import prisma from "services/Prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      try {
        const empregadoId = req.query.empregadoId;

        const observacoes = await prisma.empregadosObservacoes.findMany({
          where: {
            EmpregadoId:
              typeof empregadoId === "string" ? empregadoId : undefined,
          },
        });

        res.json(observacoes);
      } catch (error) {
        res.status(500).send({ error });
      }
      break;

    case "POST":
      try {
        const result = await prisma.empregadosObservacoes.create({
          data: req.body,
        });
        res.json(result);
      } catch (error) {
        res.status(500).send({ error });
      }
      break;

    default:
      res.status(400).send({
        method: req.method,
        message: "Método não implementado para esta entidade.",
      });
      break;
  }
}
