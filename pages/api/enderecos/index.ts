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

        if (req.body.PessoaId) {
          await prisma.pessoas.update({
            where: {
              Id: req.body.PessoaId,
            },
            data: {
              EnderecoId: result.Id,
            },
          });
        } else if (req.body.EmpresaMedicaId) {
          await prisma.empresasMedicas.update({
            where: {
              Id: req.body.EmpresaMedicaId,
            },
            data: {
              EnderecoId: result.Id,
            },
          });
        }

        res.json(result);
      } catch (error) {
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
