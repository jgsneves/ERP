import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../services/Prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      try {
        const result = await prisma.pessoas.findUnique({
          where: {
            Id: req.query.id as string,
          },
          include: {
            ContasCorrentes: true,
            Endereco: true,
          },
        });

        if (result) return res.json(result);

        res.status(404).send({ message: "Empregado não encontrado!" });
      } catch (error) {
        console.log({ error });

        res.status(500).send({ error });
      }
      break;

    case "PATCH":
      try {
        await prisma.pessoas.update({
          where: {
            Id: req.query.id as string,
          },
          data: req.body,
        });
        res.status(200).send({ message: "Empregado atualizado com sucesso! " });
      } catch (error) {
        res
          .status(500)
          .send({ message: "Não foi possível editar este empregado!" });
      }
      break;

    default:
      res.status(400).send({
        method: req.method,
        message: "Método não implementado para esta entidade!",
      });
      break;
  }
}
