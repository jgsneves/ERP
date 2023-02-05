import { parseCurrency } from "@brazilian-utils/brazilian-utils";
import {
  Button,
  FormLabel,
  Input,
  Select,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import {
  Documentos,
  DocumentoTipo,
  EmpregadosPagamentos,
  EmpregadosPagamentosTipo,
} from "@prisma/client";
import axios from "axios";
import { useState } from "react";
import { v4 as uuid4 } from "uuid";
import { UploadFileService } from "../../services/UploadFileService";
import { BoundedMutationHelper } from "../../utils/BoundedMutationHelper";
import { CurrencyFormat } from "../../utils/CurrencyFormat";
import { ErrorHandler } from "../../utils/ErrorHandler";
import ContentTitle from "../Shared/ContentTitle";

interface Props {
  empregadoId: string;
  salario: number | null;
}

interface Pagamento extends Omit<EmpregadosPagamentos, "Valor"> {
  Valor: string;
}

export default function EmployeeCreatePayment({ empregadoId, salario }: Props) {
  const [formData, setFormData] = useState<Pagamento>({
    Id: uuid4(),
    ComprovanteId: "",
    CriadoEm: new Date(),
    EmpregadoId: empregadoId,
    ModificadoEm: null,
    ReciboId: null,
    Tipo: EmpregadosPagamentosTipo.SALARIO,
    Valor:
      salario === null
        ? ""
        : CurrencyFormat.formatNumberToBrazilianCurrency(salario),
  });
  const [file, setFile] = useState<File | null>(null);
  const [fileInputValue, setFileInputValue] = useState<string | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const toast = useToast();
  const mutate = BoundedMutationHelper.getEmployeePaymentsMutator();

  const handleInputFileOnChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { files } = event.target;
    if (files) {
      const pdfFile = files.item(0);
      setFile(pdfFile);
    }
  };
  const handleSaveOnClick = async () => {
    setIsLoading(true);
    if (file) {
      const { url } = await UploadFileService.uploadFile(file);

      const createDocumentBody: Documentos = {
        Id: uuid4(),
        CriadoEm: new Date(),
        PessoaId: empregadoId,
        Url: url,
        Tipo: DocumentoTipo.COMPROVANTE_TRANSFERENCIA,
        Nome: "comprovante de pagamento verba trabalhista",
        EmpresaMedicaId: null,
        ModificadoEm: null,
      };
      const { data } = await axios.post<Documentos>(
        `/api/documentos`,
        createDocumentBody
      );

      await axios
        .post(`/api/empregados-pagamentos`, {
          ...formData,
          ComprovanteId: data.Id,
          Valor: parseCurrency(formData.Valor),
        })
        .then(
          () => {
            toast({
              title: "Pagamento criado com sucesso!",
              duration: 5000,
              status: "success",
              isClosable: true,
            });
            mutate();
          },
          () =>
            toast({
              duration: 9000,
              status: "error",
              title: "Não foi possível criar um pagamento!",
              isClosable: true,
            })
        )
        .catch((error) => ErrorHandler.logAxiosPostError(error));

      setIsLoading(false);
      setFileInputValue("");
      setFile(null);
    }
  };

  return (
    <VStack spacing={3} w="100%" alignItems="flex-start">
      <ContentTitle title="Cadastrar um novo pagamento" />
      <FormLabel>
        Valor (R$)
        <Input
          value={formData.Valor}
          onChange={(event) =>
            setFormData((state) => ({
              ...state,
              Valor: CurrencyFormat.moneyMask(event.target.value),
            }))
          }
        />
      </FormLabel>
      <FormLabel>
        Tipo de pagamento
        <Select
          value={formData.Tipo}
          isDisabled={isLoading}
          onChange={(event) =>
            setFormData((state) => ({
              ...state,
              Tipo: event.target.value as EmpregadosPagamentosTipo,
            }))
          }
        >
          <option value={EmpregadosPagamentosTipo.DECIMO_TERCEIRO_SALARIO}>
            13º Salário
          </option>
          <option value={EmpregadosPagamentosTipo.REEMBOLSO}>Reembolso</option>
          <option value={EmpregadosPagamentosTipo.SALARIO}>Salário</option>
          <option value={EmpregadosPagamentosTipo.VALE_DE_TRANSPORTE}>
            Vale de transporte
          </option>
        </Select>
      </FormLabel>
      <FormLabel>
        Arquivo do <Text color="red.400">comprovante de transferência</Text>
        <input
          value={fileInputValue}
          type="file"
          accept="application/pdf"
          onChange={handleInputFileOnChange}
        />
      </FormLabel>
      <Button
        isLoading={isLoading}
        colorScheme="green"
        onClick={handleSaveOnClick}
      >
        salvar
      </Button>
    </VStack>
  );
}
