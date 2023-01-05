import { Spinner } from "@chakra-ui/react";
import { ContasCorrente } from "@prisma/client";
import Account from "./account";
import AccountForm from "./accountForm";
import useSWR from "swr";

interface Props {
  accountId: string | null;
  partnerId: string;
}

export default function FinancialData({ accountId, partnerId }: Props) {
  return (
    <>
      {accountId ? (
        <Account accountId={accountId} partnerId={partnerId} />
      ) : (
        <AccountForm partnerId={partnerId} />
      )}
    </>
  );
}
