import { Flex, Text } from "@chakra-ui/react";
import { DateFormat } from "utils/DateFormat";

interface Props {
  date: string;
  content: string;
}

export default function EmployeeComment({ content, date }: Props) {
  return (
    <Flex mx={2}>
      <Text>
        {DateFormat.formatISODateStringToLocale(date)} - {content}
      </Text>
    </Flex>
  );
}
