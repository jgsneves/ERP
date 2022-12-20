import Link from "next/link";
import { Text, Box } from "@chakra-ui/react";

interface Props {
  href: string;
  content: string;
}

export default function Button({ content, href }: Props) {
  return (
    <Link href={href}>
      <Box width="286px" cursor="pointer">
        <Text fontSize="md" fontWeight={500} _hover={{ color: "green.400" }}>
          {content}
        </Text>
      </Box>
    </Link>
  );
}
