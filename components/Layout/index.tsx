import { Inter } from "@next/font/google";
import Head from "next/head";
import { Box, Flex } from "@chakra-ui/react";
import Menu from "../Menu";

const inter = Inter({ subsets: ["latin"] });

interface Props {
  children: React.ReactNode;
}
export default function Layout({ children }: Props) {
  return (
    <>
      <Head>
        <title>LysiMed</title>
      </Head>
      <Flex className={inter.className}>
        <Menu />
        <Box flex={1}>{children}</Box>
      </Flex>
    </>
  );
}
