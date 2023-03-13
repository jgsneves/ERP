import { Pessoas, PessoasTipo } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "services/Prisma";
import { ErrorHandler } from "utils/ErrorHandler";

interface EmpresaMedicaRazaoSocial {
  RazaoSocial: string;
}

interface Doctors extends Pessoas {
  EmpresaMedica: EmpresaMedicaRazaoSocial | null;
}

export interface MedicosResponse {
  pagina: number;
  totalPaginas: number;
  doctors: Doctors[];
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
        const empresaMedicaId = req.query.empresaMedicaId;

        const whereClause = {
          EmpresaMedicaId:
            typeof empresaMedicaId === "string" ? empresaMedicaId : undefined,
          Tipo: PessoasTipo.MEDICO,
        };

        const doctors = await prisma.pessoas.findMany({
          skip: (pagina - 1) * quantidade,
          take: quantidade,
          orderBy: {
            Nome: "asc",
          },
          where: whereClause,
          include: {
            EmpresaMedica: {
              select: {
                RazaoSocial: true,
              },
            },
          },
        });

        const count = doctors.length;
        const totalPaginas = Math.ceil(count / quantidade);
        res.json({ pagina, totalPaginas, doctors });
      } catch (error) {
        ErrorHandler.logPrismaError(error);
        res.status(500).send({ error });
      }
      break;

    case "POST":
      try {
        const result = await prisma.pessoas.create({
          data: req.body,
        });
        res.json(result);
      } catch (error) {
        ErrorHandler.logPrismaError(error);
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
