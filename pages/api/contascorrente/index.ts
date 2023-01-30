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
        PessoaId: req.body.PessoaId,
        EmpresaMedicaId: req.body.EmpresaMedicaId,
        NomeBanco: req.body.NomeBanco,
      };

      const result = await prisma.contasCorrente.create({
        data: contaCorrenteData,
      });

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
