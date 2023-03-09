import { Documentos, DocumentoTipo } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "services/Prisma";
import { ErrorHandler } from "utils/ErrorHandler";

export interface DocumentoWithDate extends Omit<Documentos, "CriadoEm"> {
  CriadoEm: string;
}

export interface GetDocumentosResponse {
  pagina: number;
  totalPaginas: number;
  documentos: DocumentoWithDate[];
}

const parseQueryParamTipo = (
  param: string | string[] | undefined
): DocumentoTipo | DocumentoTipo[] | undefined => {
  if (typeof param === "string") return param as DocumentoTipo;
  if (Array.isArray(param)) return param as DocumentoTipo[];
  return param;
};

const mapWhereOrClause = (
  tipo: DocumentoTipo | DocumentoTipo[] | undefined
) => {
  if (Array.isArray(tipo)) {
    return tipo.map((documentoTipo) => ({ Tipo: documentoTipo }));
  }

  if (!tipo) return [{ Tipo: undefined }];

  return [{ Tipo: tipo }];
};

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
        const tipo = parseQueryParamTipo(req.query.tipo);
        const pessoaId = req.query.pessoaId;
        const empresaMedicaId = req.query.empresaMedicaId;

        const documentos = await prisma.documentos.findMany({
          skip: (pagina - 1) * quantidade,
          take: quantidade,
          where: {
            OR: mapWhereOrClause(tipo),
            PessoaId: typeof pessoaId === "string" ? pessoaId : undefined,
            EmpresaMedicaId:
              typeof empresaMedicaId === "string" ? empresaMedicaId : undefined,
          },
        });

        const count = await prisma.documentos.count({
          where: {
            OR: mapWhereOrClause(tipo),
            PessoaId: typeof pessoaId === "string" ? pessoaId : undefined,
            EmpresaMedicaId:
              typeof empresaMedicaId === "string" ? empresaMedicaId : undefined,
          },
        });
        const totalPaginas = Math.ceil(count / quantidade);
        res.json({ pagina, totalPaginas, documentos });
      } catch (error) {
        ErrorHandler.logPrismaError(error);
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
        ErrorHandler.logPrismaError(error);
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
