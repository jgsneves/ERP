import { NextApiRequest, NextApiResponse } from "next";
import prisma from "services/Prisma";

export interface EmpresaResponse {
  Id: string;
  RazaoSocial: string;
}
export interface EmpresasMedicasAutocompleteResponse {
  empresas: EmpresaResponse[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      try {
        const result = await prisma.empresasMedicas.findMany({
          where: {
            RazaoSocial: {
              contains: req.query.razaoSocial as string,
              mode: "insensitive",
            },
          },
          select: {
            RazaoSocial: true,
            Id: true,
          },
        });
        res.json({ empresas: result });
      } catch (error) {
        res.status(500).send({ error });
      }
      break;

    default:
      res
        .status(500)
        .send({ message: "Método não implementado para este endpoint!" });
      break;
  }
}
