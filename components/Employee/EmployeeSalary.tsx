import { Stat, StatNumber, VStack } from "@chakra-ui/react";
import { CurrencyFormat } from "../../utils/CurrencyFormat";
import ContentTitle from "../Shared/ContentTitle";

interface Props {
  salary: number | null;
}
export default function EmployeeSalary({ salary }: Props) {
  return (
    <VStack w="300px" alignItems="flex-start">
      <ContentTitle title="Salário" />
      <Stat>
        <StatNumber>
          {salary ? CurrencyFormat.formatNumberToBrazilianCurrency(salary) : 0}
        </StatNumber>
      </Stat>
    </VStack>
  );
}
