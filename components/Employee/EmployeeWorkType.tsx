import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Badge,
  Box,
  Button,
  Select,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { ModalidadeTrabalho } from "@prisma/client";
import axios from "axios";
import ContentTitle from "components/Shared/ContentTitle";
import { useRouter } from "next/router";
import { useState } from "react";
import { ErrorHandler } from "utils/ErrorHandler";

interface Props {
  type: ModalidadeTrabalho | null;
  id: string;
}

export default function EmployeeWorkType({ type, id }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState({ ModalidadeTrabalho: type });

  const toast = useToast();
  const router = useRouter();

  const handleSaveButtonOnClick = () => {
    setIsLoading(true);

    axios
      .patch(`/api/empregados/${id}`, data)
      .then(
        () => {
          toast({
            duration: 5000,
            title: "Status de admissão modificado com sucesso!",
            status: "success",
          });
          router.reload();
        },
        () => {
          toast({
            duration: 9000,
            title: "Não foi possível modificar o status da admissão.",
            status: "error",
            isClosable: true,
          });
        }
      )
      .catch((error) => ErrorHandler.logAxiosPatchError(error))
      .finally(() => setIsLoading(false));
  };
  return (
    <VStack w="300px" alignItems="flex-start">
      <ContentTitle title="Modalidade de trabalho" />
      <Badge colorScheme="blue">{type}</Badge>

      <Accordion allowToggle w="100%" borderColor="transparent">
        <AccordionItem>
          <AccordionButton px={0}>
            <Box flex="1" textAlign="left">
              modificar modalidade?
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pl={0}>
            <Select
              isDisabled={isLoading}
              value={data.ModalidadeTrabalho ?? ""}
              onChange={(event) =>
                setData({
                  ModalidadeTrabalho: event.target
                    .value as keyof typeof ModalidadeTrabalho,
                })
              }
            >
              {Object.keys(ModalidadeTrabalho).map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </Select>
            <Button
              colorScheme="green"
              variant="ghost"
              mt={2}
              isLoading={isLoading}
              onClick={handleSaveButtonOnClick}
            >
              salvar
            </Button>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </VStack>
  );
}
