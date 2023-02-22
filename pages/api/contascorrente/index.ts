import { ContasCorrente } from "@prisma/client";
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
        const pessoaId = req.query.pessoaId;
        const empresaMedicaId = req.query.empresaMedicaId;

        const contas = await prisma.contasCorrente.findMany({
          where: {
            PessoaId: typeof pessoaId === "string" ? pessoaId : undefined,
            EmpresaMedicaId:
              typeof empresaMedicaId === "string" ? empresaMedicaId : undefined,
          },
        });

        res.json(contas);
      } catch (error) {
        ErrorHandler.logPrismaError(error);
        res.status(500).send({ error });
      }
      break;

    case "POST":
      try {
        const contaCorrenteData: ContasCorrente = {
          Id: req.body.Id,
          Agencia: Number(req.body.Agencia),
          AgenciaDigito: Number(req.body.AgenciaDigito),
          Conta: Number(req.body.Conta),
          ContaDigito: Number(req.body.ContaDigito),
          CodigoBanco: Number(req.body.CodigoBanco),
          ChavePix: req.body.ChavePix,
          TipoChavePix: req.body.TipoChavePix,
          CriadoEm: req.body.CriadoEm,
          ModificadoEm: req.body.ModificadoEm,
          PessoaId: req.body.PessoaId,
          EmpresaMedicaId: req.body.EmpresaMedicaId,
          NomeBanco: req.body.NomeBanco,
        };

        const result = await prisma.contasCorrente.create({
          data: contaCorrenteData,
        });

        res.json(result);
      } catch (error) {
        ErrorHandler.logPrismaError(error);
        res.status(500).send({ error });
      }
      break;

    default:
      res
        .status(400)
        .send({ message: "Método não implementado para esta entidade!" });
      break;
  }
}
