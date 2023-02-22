import { Alert, AlertIcon, Spinner, Text, VStack } from "@chakra-ui/react";
import { ContasCorrente } from "@prisma/client";
import ContentTitle from "../Shared/ContentTitle";
import AccountAccordion from "./AccountAccordion";
import AccountForm from "./AccountForm";
import useSWR from "swr";
import { BoundedMutationHelper } from "utils/BoundedMutationHelper";
import { fetcher } from "utils/fetcher";
import ErrorPage from "components/ErrorPage/ErrorPage";

interface Props {
  pessoaId?: string;
  empresaMedicaId?: string;
  isActive: boolean;
}

export default function FinancialData({
  pessoaId,
  empresaMedicaId,
  isActive,
}: Props) {
  const searchParams = new URLSearchParams();

  if (pessoaId) searchParams.append("pessoaId", pessoaId);

  if (empresaMedicaId) searchParams.append("empresaMedicaId", empresaMedicaId);

  const {
    data: accounts,
    isLoading,
    error,
    mutate,
  } = useSWR<ContasCorrente[]>(
    isActive ? `/api/contascorrente/?${searchParams.toString()}` : null,
    fetcher
  );

  BoundedMutationHelper.setFinancialDataMutator(mutate);

  if (isLoading) return <Spinner colorScheme="green" />;

  if (error) return <ErrorPage />;

  return (
    <VStack alignItems="flex-start" spacing={4}>
      <Text as="b">Contas correntes cadastradas</Text>
      {accounts && accounts.length === 0 && (
        <Alert status="info">
          <AlertIcon />
          <Text>Não há conta corrente cadastrada para esta entidade</Text>
        </Alert>
      )}
      {accounts &&
        accounts.map((account, index) => (
          <AccountAccordion
            key={account.Id}
            account={account}
            position={index + 1}
          />
        ))}
      <ContentTitle title="Cadastrar uma nova conta corrente" />
      <AccountForm empresaMedicaId={empresaMedicaId} pessoaId={pessoaId} />
    </VStack>
  );
}
