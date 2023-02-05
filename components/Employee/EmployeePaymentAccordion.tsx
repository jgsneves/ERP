import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Alert,
  AlertIcon,
  Button,
  Flex,
  FormLabel,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { DateFormat } from "../../utils/DateFormat";
import { Pagamento } from "./EmployeePayments";
import { CurrencyFormat } from "../../utils/CurrencyFormat";
import { EnumFormat } from "../../utils/EnumFormat";
import { useState } from "react";
import {
  Documentos,
  EmpregadosPagamentos,
  EmpregadosPagamentosTipo,
} from "@prisma/client";
import Document from "../Document";
import { UploadFileService } from "../../services/UploadFileService";
import { v4 } from "uuid";
import axios from "axios";
import { ErrorHandler } from "../../utils/ErrorHandler";
import { BoundedMutationHelper } from "../../utils/BoundedMutationHelper";

interface Props {
  pagamento: Pagamento;
}

export default function EmployeePaymentAccordion({ pagamento }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [fileInputValue, setFileInputValue] = useState<string | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const toast = useToast();
  const mutator = BoundedMutationHelper.getEmployeePaymentsMutator();

  const handleInputFileOnChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { files } = event.target;
    if (files) {
      const pdfFile = files.item(0);
      setFile(pdfFile);
    }
  };

  const formatPaymentType = (type: EmpregadosPagamentosTipo): string => {
    const result = EnumFormat.formatEmpregadosPagamentosEnum(type);
    return result.charAt(0).toUpperCase() + result.slice(1);
  };

  const handleSaveOnClick = async () => {
    setIsLoading(true);

    if (file) {
      const { url } = await UploadFileService.uploadFile(file);

      const createDocumentRequestBody: Documentos = {
        Id: v4(),
        CriadoEm: new Date(),
        Nome: `recibo do pagamento id: ${pagamento.Id}`,
        ModificadoEm: null,
        EmpresaMedicaId: null,
        PessoaId: pagamento.EmpregadoId,
        Tipo: EnumFormat.formatDocumentoTipoByEmpregadoPagamentoTipo(
          pagamento.Tipo
        ),
        Url: url,
      };

      const { data } = await axios.post<Documentos>(
        `/api/documentos`,
        createDocumentRequestBody
      );

      const patchPagamentoBody: EmpregadosPagamentos = {
        ComprovanteId: pagamento.ComprovanteId,
        CriadoEm: new Date(pagamento.CriadoEm),
        EmpregadoId: pagamento.EmpregadoId,
        Id: pagamento.Id,
        ModificadoEm: new Date(),
        ReciboId: data.Id,
        Tipo: pagamento.Tipo,
        Valor: Number(pagamento.Valor),
      };

      await axios
        .patch(`/api/empregados-pagamentos/${pagamento.Id}`, patchPagamentoBody)
        .then(
          () => {
            toast({
              title: "Recibo salvo com sucesso!",
              status: "success",
              duration: 5000,
              isClosable: true,
            });
            mutator();
          },
          () => {
            toast({
              title: "Houve algum erro.",
              status: "error",
              duration: 9000,
              isClosable: true,
            });
          }
        )
        .catch((error) => ErrorHandler.logAxiosPatchError(error));
    }

    setIsLoading(false);
    setFileInputValue("");
    setFile(null);
  };

  return (
    <AccordionItem>
      <AccordionButton>
        <Flex
          as="span"
          flex="1"
          textAlign="left"
          justifyContent="space-between"
        >
          <Text minW="200px">{`${formatPaymentType(pagamento.Tipo)}`}</Text>

          <Text>
            efetuado em:{" "}
            {DateFormat.formatISODateStringToLocale(pagamento.CriadoEm)}
          </Text>

          <Text minW="200px">
            valor:{" "}
            {CurrencyFormat.formatStringToBrazilianCurrency(pagamento.Valor)}
          </Text>
        </Flex>
        <AccordionIcon />
      </AccordionButton>

      <AccordionPanel>
        <Flex justifyContent="space-around">
          {pagamento.Recibo ? (
            <Document tipo={pagamento.Recibo.Tipo} url={pagamento.Recibo.Url} />
          ) : (
            <VStack spacing={5} alignItems="flex-start" mt={2}>
              <Alert status="warning">
                <AlertIcon />
                <Text>Salve o recibo deste pagamento!</Text>
              </Alert>
              <FormLabel display="flex" flexDirection="column">
                Recibo
                <input
                  type="file"
                  accept="application/pdf"
                  value={fileInputValue}
                  onChange={handleInputFileOnChange}
                />
              </FormLabel>
              <Button
                colorScheme="green"
                variant="outline"
                onClick={handleSaveOnClick}
                isLoading={isLoading}
              >
                salvar
              </Button>
            </VStack>
          )}

          <Document
            tipo={pagamento.Comprovante.Tipo}
            url={pagamento.Comprovante.Url}
          />
        </Flex>
      </AccordionPanel>
    </AccordionItem>
  );
}
