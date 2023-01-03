import { Inter } from "@next/font/google";
import Head from "next/head";

import { Box, Flex } from "@chakra-ui/react";

import { useSession } from "@supabase/auth-helpers-react";

import Menu from "../Menu";
import Login from "../Login";

const inter = Inter({ subsets: ["latin"] });

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  const supabaseSession = useSession();

  return (
    <>
      <Head>
        <title>LysiMed</title>
      </Head>
      {supabaseSession ? (
        <Flex className={inter.className}>
          <Menu />
          <Box flex={1}>{children}</Box>
        </Flex>
      ) : (
        <Login />
      )}
    </>
  );
}
