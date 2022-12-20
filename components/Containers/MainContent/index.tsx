import { Box } from "@chakra-ui/react";

interface Props {
  children: React.ReactNode;
}

export default function MainContent({ children }: Props) {
  return <Box padding="4">{children}</Box>;
}
