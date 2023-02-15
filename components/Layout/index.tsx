import { Inter } from "@next/font/google";
import Head from "next/head";

import { Box, Flex, Spinner } from "@chakra-ui/react";

import { useSessionContext } from "@supabase/auth-helpers-react";
import Login from "components/Login";
import Loading from "./loading";
import Menu from "components/Menu";

const inter = Inter({ subsets: ["latin"] });

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  const { session, isLoading } = useSessionContext();

  if (isLoading) {
    return (
      <Loading>
        <Spinner size="xl" color="green.400" />
      </Loading>
    );
  }

  return (
    <>
      <Head>
        <title>LysiMed</title>
      </Head>
      {session ? (
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
