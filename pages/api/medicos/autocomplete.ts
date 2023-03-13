import { NextApiRequest, NextApiResponse } from "next";
import prisma from "services/Prisma";

interface MedicoNome {
  Nome: string;
}

export interface MedicosAutocompleteResponse {
  medicos: MedicoNome;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      try {
        const result = await prisma.pessoas.findMany({
          where: {
            Tipo: "MEDICO",
            Nome: {
              contains: req.query.nome as string,
              mode: "insensitive",
            },
          },
          select: {
            Nome: true,
          },
        });
        res.json({ medicos: result });
      } catch (error) {
        res.status(500).send({ error });
      }
      break;

    default:
      res
        .status(400)
        .send({ message: "Método não implementado para este endpoint!" });
      break;
  }
}
