import { EmpresasMedicas } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../services/Prisma";

export interface EmpresasMedicasResponse {
  pagina: number;
  totalPaginas: number;
  empresasMedicas: EmpresasMedicas[];
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

        const empresasMedicas = await prisma.empresasMedicas.findMany({
          skip: (pagina - 1) * perPage,
          take: perPage,
          orderBy: {
            RazaoSocial: "asc",
          },
        });

        const totalCompanies = await prisma.empresasMedicas.count();
        const totalPaginas = Math.ceil(totalCompanies / perPage);
        res.json({ pagina, totalPaginas, empresasMedicas });
      } catch (error) {
        res.status(500).send({ error });
      }
      break;

    case "POST":
      try {
        const result = await prisma.empresasMedicas.create({
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
