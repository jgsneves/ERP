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
import { StatusAdmissao } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { ErrorHandler } from "../../utils/ErrorHandler";
import ContentTitle from "../Shared/ContentTitle";

interface Props {
  statusAdmissao: StatusAdmissao | null;
  id: string;
}

export default function EmployeeStatus({ statusAdmissao, id }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState({ StatusAdmissao: statusAdmissao });

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

  const mapBadgeColorScheme = (status: StatusAdmissao | null): string => {
    const colors = {
      EMPREGADO: "green",
      DEMITIDO: "red",
      EXPERIENCIA: "orange",
    };
    return status ? colors[status] : "blue";
  };

  return (
    <VStack w="300px" alignItems="flex-start">
      <ContentTitle title="Status de Admissão" />
      <Badge colorScheme={mapBadgeColorScheme(statusAdmissao)}>
        {statusAdmissao}
      </Badge>
      <Accordion allowToggle w="100%" borderColor="transparent">
        <AccordionItem>
          <AccordionButton px={0}>
            <Box flex="1" textAlign="left">
              modificar status?
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pl={0}>
            <Select
              isDisabled={isLoading}
              value={data.StatusAdmissao ?? ""}
              onChange={(event) =>
                setData({
                  StatusAdmissao: event.target
                    .value as keyof typeof StatusAdmissao,
                })
              }
            >
              {Object.keys(StatusAdmissao).map((status) => (
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
