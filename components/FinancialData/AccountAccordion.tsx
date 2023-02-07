import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  VStack,
  Text,
  useToast,
  Accordion,
  Flex,
} from "@chakra-ui/react";
import { ContasCorrente } from "@prisma/client";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { BoundedMutationHelper } from "../../utils/BoundedMutationHelper";
import { EnumFormat } from "../../utils/EnumFormat";
import { ErrorHandler } from "../../utils/ErrorHandler";

interface Props {
  position: number;
  account: ContasCorrente;
}

export default function AccountAccordion({ account, position }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const toast = useToast();
  const mutation = BoundedMutationHelper.getFinancialDataMutator();

  const handleDeleteOnClick = () => {
    setIsLoading(true);

    axios
      .delete(`/api/contascorrente/${account.Id}`)
      .then(
        () => mutation(),
        () => {
          toast({
            duration: 9000,
            title: "Não foi possível deletar esta conta.",
            isClosable: true,
            status: "error",
          });
        }
      )
      .catch((error: AxiosError) => ErrorHandler.logAxiosDeleteError(error))
      .finally(() => setIsLoading(false));
  };

  return (
    <Accordion
      w="950px"
      allowToggle
      borderColor="transparent"
      borderLeft="4px"
      borderLeftColor="gray.300"
    >
      <AccordionItem>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            <Text fontSize="lg">Conta corrente nº {position}</Text>
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel>
          <VStack alignItems="flex-start" spacing={3}>
            <Flex w="50%">
              <Text minW="200px">Código do banco:</Text>
              <Text>{account.CodigoBanco}</Text>
            </Flex>

            <Flex w="50%">
              <Text minW="200px">Nome do banco:</Text>
              <Text>{account.NomeBanco}</Text>
            </Flex>

            <Flex w="50%">
              <Text minW="200px">Agência:</Text>
              <Text>{account.Agencia}</Text>
            </Flex>

            <Flex w="50%">
              <Text minW="200px">Dígito da agência:</Text>
              <Text>{account.AgenciaDigito}</Text>
            </Flex>

            <Flex w="50%">
              <Text minW="200px">Conta corrente:</Text>
              <Text>{account.Conta}</Text>
            </Flex>

            <Flex w="50%">
              <Text minW="200px">Dígito da conta:</Text>
              <Text>{account.ContaDigito}</Text>
            </Flex>

            {account.ChavePix && (
              <Flex w="50%">
                <Text minW="200px">Chave PIX:</Text>
                <Text>{account.ChavePix}</Text>
              </Flex>
            )}

            {account.ChavePix && account.TipoChavePix && (
              <Flex w="50%">
                <Text minW="200px">Tipo de chave PIX:</Text>
                <Text>
                  {EnumFormat.formatTipoChavePixEnum(account.TipoChavePix)}
                </Text>
              </Flex>
            )}
          </VStack>
          <Button
            colorScheme="red"
            onClick={handleDeleteOnClick}
            isLoading={isLoading}
            mt={5}
          >
            deletar conta
          </Button>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}
