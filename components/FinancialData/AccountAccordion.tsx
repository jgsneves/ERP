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
import { ErrorHandler } from "../../utils/ErrorHandler";

interface Props {
  position: number;
  account: ContasCorrente;
}

export default function AccountAccordion({ account, position }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const toast = useToast();
  const router = useRouter();

  const handleDeleteOnClick = () => {
    setIsLoading(true);

    axios
      .delete(`/api/contascorrente/${account.Id}`)
      .then(
        () => router.reload(),
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
            Conta corrente nº {position}
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel>
          <Flex gap={10} wrap="wrap" justifyContent="space-between">
            <Text>
              <Text as="strong">Código do banco: </Text>
              {account.CodigoBanco}
            </Text>
            <Text>
              <Text as="strong">Nome do banco: </Text>
              {account.NomeBanco}
            </Text>
            <Text>
              <Text as="strong">Agência: </Text>
              {account.Agencia}
            </Text>
            <Text>
              <Text as="strong">Dígito da agência: </Text>
              {account.AgenciaDigito}
            </Text>
            <Text>
              <Text as="strong">Conta corrente: </Text>
              {account.Conta}
            </Text>
            <Text>
              <Text as="strong">Dígito da conta: </Text>
              {account.ContaDigito}
            </Text>
            {account.ChavePix && (
              <Text>
                <Text as="strong">Chave PIX: </Text>
                {account.ChavePix}
              </Text>
            )}
            {account.ChavePix && (
              <Text>
                <Text as="strong">Tipo de chave PIX: </Text>
                {account.TipoChavePix}
              </Text>
            )}
          </Flex>
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
