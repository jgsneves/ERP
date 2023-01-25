import { EmpresasMedicas, Pessoas, PessoasTipo } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../services/Prisma";

interface Doctors extends Pessoas {
  EmpresaMedica: EmpresasMedicas;
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
        const perPage = parseInt(req.query.perPage as string) || 10;
        const empresaId = (req.query.empresaMedicaId as string) ?? "";

        const whereClause = {
          EmpresaMedicaId: empresaId.length === 0 ? undefined : empresaId,
          Tipo: PessoasTipo.MEDICO,
        };

        const doctors = await prisma.pessoas.findMany({
          skip: (pagina - 1) * perPage,
          take: perPage,
          orderBy: {
            Nome: "asc",
          },
          where: whereClause,
          include: {
            EmpresaMedica: true,
          },
        });

        const count = doctors.length;
        const totalPaginas = Math.ceil(count / perPage);
        res.json({ pagina, totalPaginas, doctors });
      } catch (error) {
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
