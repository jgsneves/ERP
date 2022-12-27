import Link from "next/link";
import { Text, Box } from "@chakra-ui/react";

interface Props {
  href: string;
  content: string;
  selected: boolean;
}

export default function Button({ content, href, selected }: Props) {
  return (
    <Link href={href}>
      <Box width="286px" cursor="pointer">
        <Text
          fontSize="md"
          fontWeight={500}
          color={selected ? "green.400" : "gray.800"}
          _hover={{ color: "green.400" }}
        >
          {content}
        </Text>
      </Box>
    </Link>
  );
}
