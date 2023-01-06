import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../services/Prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      try {
        const result = await prisma.enderecos.create({ data: req.body });

        await prisma.pessoas.update({
          where: {
            Id: req.body.PessoaId,
          },
          data: {
            EnderecoId: result.Id,
          },
        });

        res.json(result);
      } catch (error) {
        console.log(error);

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
