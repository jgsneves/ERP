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
import { v4 as uuid4 } from "uuid";
import axios from "axios";
import ContentTitle from "components/Shared/ContentTitle";
import { UploadFileService } from "services/UploadFileService";
import { BoundedMutationHelper } from "utils/BoundedMutationHelper";
import { ErrorHandler } from "utils/ErrorHandler";

interface Props {
  employeeId: string;
}

export default function EmployeeUploadPerformance({ employeeId }: Props) {
  const formInitialData: Documentos = {
    Id: uuid4(),
    CriadoEm: new Date(),
    ModificadoEm: null,
    Nome: "",
    PessoaId: employeeId,
    Tipo: DocumentoTipo.ATESTADO,
    Url: "",
    EmpresaMedicaId: null,
  };

  const [formData, setFormData] = useState<Documentos>(formInitialData);
  const [file, setFile] = useState<File | null>(null);
  const [fileInputValue, setFileInputValue] = useState<string | undefined>(
    undefined
  );

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const toast = useToast();
  const mutation = BoundedMutationHelper.getEmployeePerformanceTableMutator();

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
      axios
        .post(`/api/documentos`, { ...formData, Url: url })
        .then(
          () => {
            toast({
              title: "Documento salvo com sucesso!",
              status: "success",
              duration: 5000,
              isClosable: true,
            });
            mutation();
            setFormData(formInitialData);
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
        .finally(() => {
          setIsLoading(false);
          setFileInputValue("");
        });
    }
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
          value={formData.Tipo}
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
      <FormLabel>
        <input
          value={fileInputValue}
          type="file"
          accept="application/pdf"
          onChange={handleInputFileOnChange}
        />
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
