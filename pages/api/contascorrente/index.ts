import { ContasCorrente } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../services/Prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
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
        TitularId: req.body.TitularId,
        EmpresaTitularId: req.body.EmpresaTitularId,
      };

      const result = await prisma.contasCorrente.create({
        data: contaCorrenteData,
      });

      if (req.body.TitularId) {
        await prisma.pessoas.update({
          where: {
            Id: req.body.TitularId,
          },
          data: {
            ContaCorrenteId: result.Id,
          },
        });
      } else if (req.body.EmpresaTitularId) {
        await prisma.empresasMedicas.update({
          where: {
            Id: req.body.EmpresaTitularId,
          },
          data: {
            ContaCorrenteId: result.Id,
          },
        });
      }

      res.json(result);
    } catch (error) {
      res.status(500).send({ error });
    }
  } else {
    res.status(400).send({
      metodo: req.method,
      message: "Método não implementado para esta entidade",
    });
  }
}
