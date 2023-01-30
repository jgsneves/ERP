import { Alert, AlertIcon, Text, VStack } from "@chakra-ui/react";
import { ContasCorrente } from "@prisma/client";
import ContentTitle from "../Shared/ContentTitle";
import AccountAccordion from "./AccountAccordion";
import AccountForm from "./AccountForm";

interface Props {
  accounts: ContasCorrente[];
  pessoaId?: string;
  empresaMedicaId?: string;
}

export default function FinancialData({
  accounts,
  pessoaId,
  empresaMedicaId,
}: Props) {
  return (
    <VStack alignItems="flex-start">
      <ContentTitle title="Contas correntes cadastradas" />
      {accounts.length === 0 && (
        <Alert status="info">
          <AlertIcon />
          <Text>Não há conta corrente cadastrada para esta entidade</Text>
        </Alert>
      )}
      {accounts.map((account, index) => (
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
