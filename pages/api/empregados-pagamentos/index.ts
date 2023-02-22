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
        const pagamento = await prisma.empregadosPagamentos.create({
          data: req.body,
        });
        res.json(pagamento);
      } catch (error) {
        ErrorHandler.logPrismaError(error);
        res.status(500).send({ error });
      }
      break;

    case "GET":
      try {
        const empregadoId = req.query.empregadoId;

        const pagamentos = await prisma.empregadosPagamentos.findMany({
          where: {
            EmpregadoId:
              typeof empregadoId === "string" ? empregadoId : undefined,
          },
          include: {
            Comprovante: true,
            Recibo: true,
          },
          orderBy: {
            CriadoEm: "desc",
          },
        });
        res.json(pagamentos);
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
