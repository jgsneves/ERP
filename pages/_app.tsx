import "../styles/globals.css";

import type { AppProps } from "next/app";
import React from "react";
import { useState } from "react";
import { Router } from "next/router";

import { ChakraProvider, Spinner } from "@chakra-ui/react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";

import Layout from "components/Layout";
import Loading from "components/Layout/loading";

export default function App({
  Component,
  pageProps,
}: AppProps<{ initialSession: Session }>) {
  const [loading, setLoading] = React.useState(false);
  const [supabase] = useState(() => createBrowserSupabaseClient());

  React.useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);

  return (
    <SessionContextProvider
      supabaseClient={supabase}
      initialSession={pageProps.initialSession}
    >
      <ChakraProvider>
        {loading ? (
          <Loading>
            <Spinner size="xl" color="green.400" />
          </Loading>
        ) : (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        )}
      </ChakraProvider>
    </SessionContextProvider>
  );
}
