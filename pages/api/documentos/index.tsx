import { Documentos, DocumentoTipo } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../services/Prisma";

interface DocumentoWithDate extends Omit<Documentos, "CriadoEm"> {
  CriadoEm: string;
}

export interface GetDocumentosResponse {
  pagina: number;
  totalPaginas: number;
  documentos: DocumentoWithDate[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      try {
        const pagina =
          typeof req.query.pagina === "string" ? parseInt(req.query.pagina) : 1;
        const quantidade =
          typeof req.query.quantidade === "string"
            ? parseInt(req.query.quantidade)
            : 5;
        const tipo = req.query.tipo;
        const pessoaId = req.query.pessoaId;
        const empresaMedicaId = req.query.empresaMedicaId;

        const documentos = await prisma.documentos.findMany({
          skip: (pagina - 1) * quantidade,
          take: quantidade,
          where: {
            Tipo: tipo ? (tipo as DocumentoTipo) : undefined,
            PessoaId: typeof pessoaId === "string" ? pessoaId : undefined,
            EmpresaMedicaId:
              typeof empresaMedicaId === "string" ? empresaMedicaId : undefined,
          },
        });

        const count = await prisma.documentos.count({
          where: {
            PessoaId: typeof pessoaId === "string" ? pessoaId : undefined,
            EmpresaMedicaId:
              typeof empresaMedicaId === "string" ? empresaMedicaId : undefined,
            Tipo: tipo ? (tipo as DocumentoTipo) : undefined,
          },
        });
        const totalPaginas = Math.ceil(count / quantidade);
        res.json({ pagina, totalPaginas, documentos });
      } catch (error) {
        res.status(500).send({ error });
      }
      break;

    case "POST":
      try {
        const result = await prisma.documentos.create({
          data: req.body,
        });
        res.json(result);
      } catch (error) {
        res.status(500).send({ error });
      }
      break;

    default:
      res.status(500).send({
        method: req.method,
        message: "Método não implementado para esta entidade!",
      });
      break;
  }
}
