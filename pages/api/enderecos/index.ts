import { NextApiRequest, NextApiResponse } from "next";
import prisma from "services/Prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      try {
        const pessoaId = req.body.PessoaId;
        const empresaMedicaId = req.body.EmpresaMedicaId;

        const result = await prisma.enderecos.create({
          data: {
            // transaction: update pessoa
            Pessoa:
              typeof pessoaId === "string"
                ? {
                    connect: {
                      Id: pessoaId,
                    },
                  }
                : undefined,
            // transaction: update pessoa
            EmpresaMedica:
              typeof empresaMedicaId === "string"
                ? {
                    connect: {
                      Id: empresaMedicaId,
                    },
                  }
                : undefined,
            ...req.body,
          },
        });

        res.json(result);
      } catch (error) {
        console.log({ error });
        res.status(500).send(error);
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
