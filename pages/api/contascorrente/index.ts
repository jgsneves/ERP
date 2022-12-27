import { ContasCorrente, Prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../services/Prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const requestBody = req.body;

      const contaCorrenteData: ContasCorrente = {
        Id: requestBody.Id,
        Agencia: Number(requestBody.Agencia),
        AgenciaDigito: Number(requestBody.AgenciaDigito),
        Conta: Number(requestBody.Conta),
        ContaDigito: Number(requestBody.ContaDigito),
        CodigoBanco: Number(requestBody.CodigoBanco),
        ChavePix: requestBody.ChavePix,
        TipoChavePix: requestBody.TipoChavePix,
        CriadoEm: requestBody.CriadoEm,
        ModificadoEm: requestBody.ModificadoEm,
        TitularId: requestBody.TitularId,
      };

      const result = await prisma.contasCorrente.create({
        data: contaCorrenteData,
      });

      if (result.TitularId) {
        await prisma.pessoas.update({
          where: { Id: result.TitularId },
          data: { ContaCorrenteId: result.Id },
        });
      }

      res.json(result);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        res.status(500).send({
          code: error.code,
          message: error.message,
          meta: error.meta,
          cause: error.cause,
        });
        return;
      }
      res.status(500).send({ error });
    }
  } else {
    res.status(400).send({
      metodo: req.method,
      message: "Método não implementado para esta entidade",
    });
  }
}
