import { Flex } from "@chakra-ui/react";

interface Props {
  children: React.ReactNode;
}
export default function Loading({ children }: Props) {
  return (
    <Flex h="100vh" w="100vw" alignItems="center" justifyContent="center">
      {children}
    </Flex>
  );
}
