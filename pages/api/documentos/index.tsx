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
        const pagina = parseInt(req.query.pagina as string) || 1;
        const quantidade = parseInt(req.query.quantidade as string) || 10;
        const tipo = req.query.tipo as string;

        const documentos = await prisma.documentos.findMany({
          skip: (pagina - 1) * quantidade,
          take: quantidade,
          where: {
            Tipo: tipo in DocumentoTipo ? (tipo as DocumentoTipo) : undefined,
          },
        });

        const count = documentos.length;
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
