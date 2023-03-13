import {
  Box,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import useDebounce from "hooks/useDebouncer";
import { useRouter } from "next/router";
import {
  EmpresaResponse,
  EmpresasMedicasAutocompleteResponse,
} from "pages/api/empresas-medicas/autocomplete";
import { DoctorEntity } from "pages/medicos/[id]";
import { useState } from "react";
import useSwr from "swr";
import { ErrorHandler } from "utils/ErrorHandler";
import { fetcher } from "utils/fetcher";

interface Props {
  doctor: DoctorEntity;
}

export default function DoctorSearchEmpresaMedica({ doctor }: Props) {
  const [inputValue, setInputValue] = useState<string>("");
  const [isInputActive, setIsInputActive] = useState<boolean>(false);
  const [selectedEmpresaMedica, setSelectedEmpresaMedica] = useState<
    EmpresaResponse | undefined
  >();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const queryString = useDebounce(inputValue, 1000);
  const toast = useToast();
  const router = useRouter();

  const { data } = useSwr<EmpresasMedicasAutocompleteResponse>(
    queryString
      ? `/api/empresas-medicas/autocomplete?razaoSocial=${queryString}`
      : null,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  const showAutoCompleteMenu = isInputActive && data;

  const handleButtonOnClick = (empresaMedica: EmpresaResponse) => {
    setSelectedEmpresaMedica(empresaMedica);
    setInputValue("");
    setIsInputActive(false);
    onOpen();
  };

  const handleInputOnBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { relatedTarget } = event;
    if (relatedTarget?.localName !== "button") {
      setIsInputActive(false);
    }
  };

  const handleConfirmOnClick = () => {
    setIsLoading(true);
    const newData = {
      EmpresaMedicaId: selectedEmpresaMedica?.Id,
    };
    axios
      .patch(`/api/medicos/${doctor.Id}`, newData)
      .then(
        () => {
          toast({
            title: "Empresa vinculada com sucesso!",
            duration: 5000,
            status: "success",
            isClosable: true,
          });
          router.reload();
        },
        () => {
          toast({
            duration: 9000,
            status: "error",
            title: "Não foi possível vincular uma empresa a este médico!",
            isClosable: true,
          });
        }
      )
      .catch((error) => ErrorHandler.logAxiosPatchError(error))
      .finally(() => setIsLoading(false));
  };

  return (
    <Box>
      <Text>Vincule este médico a uma empresa médica:</Text>
      <Input
        placeholder="procure uma empresa por nome"
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        onFocus={() => setIsInputActive(true)}
        onBlur={handleInputOnBlur}
      />
      {showAutoCompleteMenu && (
        <Box
          alignItems="flex-start"
          border="1px"
          borderTop="0px"
          w="100%"
          borderRadius="0px 0px 6px 6px"
        >
          {data.empresas.map((empresaMedica) => (
            <Button
              key={empresaMedica.Id}
              variant="ghost"
              w="100%"
              justifyContent="left"
              onClick={() => handleButtonOnClick(empresaMedica)}
            >
              {empresaMedica.RazaoSocial}
            </Button>
          ))}
        </Box>
      )}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirme:</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize="lg">Deseja vincular Dr(a) {doctor.Nome}</Text>
            <Text fontSize="lg">
              à empresa <Text as="b">{selectedEmpresaMedica?.RazaoSocial}</Text>
              ?
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="green"
              onClick={handleConfirmOnClick}
              isLoading={isLoading}
            >
              confirmar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
