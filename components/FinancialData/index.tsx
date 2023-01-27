import { ContasCorrente } from "@prisma/client";
import Account from "./account";
import AccountForm from "./accountForm";

interface Props {
  account: ContasCorrente | null;
  pessoaId?: string;
  empresaMedicaId?: string;
}

export default function FinancialData({
  account,
  pessoaId,
  empresaMedicaId,
}: Props) {
  return (
    <>
      {account ? (
        <Account account={account} />
      ) : (
        <AccountForm pessoaId={pessoaId} empresaMedicaId={empresaMedicaId} />
      )}
    </>
  );
}
