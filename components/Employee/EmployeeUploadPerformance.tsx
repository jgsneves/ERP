import {
  Button,
  FormLabel,
  Input,
  Select,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { Documentos, DocumentoTipo } from "@prisma/client";
import { useState } from "react";
import ContentTitle from "../Shared/ContentTitle";
import { v4 as uuid4 } from "uuid";
import { UploadFileHelper } from "../../utils/UploadFileHelper";
import axios from "axios";
import { ErrorHandler } from "../../utils/ErrorHandler";
import { useRouter } from "next/router";

interface Props {
  employeeId: string;
}

export default function EmployeeUploadPerformance({ employeeId }: Props) {
  const [formData, setFormData] = useState<Documentos>({
    Id: uuid4(),
    CriadoEm: new Date(),
    ModificadoEm: null,
    Nome: "",
    PessoaId: employeeId,
    Tipo: DocumentoTipo.ATESTADO,
    Url: "ble",
    EmpresaMedicaId: null,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();
  const toast = useToast();

  const handleSaveOnClick = () => {
    setIsLoading(true);
    axios
      .post(`/api/documentos`, {
        ...formData,
        Nome: UploadFileHelper.formatFileName(formData.Nome),
      })
      .then(
        () => {
          toast({
            title: "Documento salvo com sucesso!",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          router.reload();
        },
        () => {
          toast({
            title: "Houve algum error!",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        }
      )
      .catch((error) => ErrorHandler.logAxiosPostError(error))
      .finally(() => setIsLoading(false));
  };

  return (
    <VStack w="350px" alignItems="flex-start" spacing={5}>
      <ContentTitle title="Salvar folha de ponto ou atestado" />
      <FormLabel w="300px">
        Nome do documento
        <Input
          value={formData.Nome}
          onChange={(event) =>
            setFormData((state) => ({
              ...state,
              Nome: event.target.value,
            }))
          }
          isDisabled={isLoading}
        />
      </FormLabel>
      <FormLabel w="300px">
        Tipo de documento
        <Select
          isDisabled={isLoading}
          onChange={(event) =>
            setFormData((state) => ({
              ...state,
              Tipo: event.target.value as DocumentoTipo,
            }))
          }
        >
          <option value={DocumentoTipo.ATESTADO}>Atestado</option>
          <option value={DocumentoTipo.FOLHA_DE_PONTO_ASSINADA}>
            Folha de ponto
          </option>
        </Select>
      </FormLabel>
      <Button
        colorScheme="green"
        onClick={handleSaveOnClick}
        isLoading={isLoading}
      >
        salvar
      </Button>
    </VStack>
  );
}
