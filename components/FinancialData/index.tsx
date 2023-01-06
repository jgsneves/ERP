import { Spinner } from "@chakra-ui/react";
import { ContasCorrente } from "@prisma/client";
import Account from "./account";
import AccountForm from "./accountForm";
import useSWR from "swr";

interface Props {
  accountId: string | null;
  pessoaId?: string;
  empresaMedicaId?: string;
}

export default function FinancialData({
  accountId,
  pessoaId,
  empresaMedicaId,
}: Props) {
  return (
    <>
      {accountId ? (
        <Account accountId={accountId} pessoaId={pessoaId} />
      ) : (
        <AccountForm pessoaId={pessoaId} empresaMedicaId={empresaMedicaId} />
      )}
    </>
  );
}
