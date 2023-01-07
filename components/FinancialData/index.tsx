import Account from "./account";
import AccountForm from "./accountForm";

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
