import "../styles/globals.css";

import type { AppProps } from "next/app";
import React from "react";
import { useState } from "react";
import { Router } from "next/router";

import { ChakraProvider, Spinner } from "@chakra-ui/react";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";

import Layout from "components/Layout";
import Loading from "components/Layout/loading";
import { createClient } from "@supabase/supabase-js";

App.getInitialProps = async () => {
  const supabaseUrl =
    process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;

  if (!supabaseUrl) throw new Error("Forneça a URL do supabase!");

  const supabaseAnonKey =
    process.env.SUPABASE_ANON_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseAnonKey) throw new Error("Forneça a ANONKEY do supabase!");

  return {
    supabaseUrl,
    supabaseAnonKey,
  };
};

interface Props extends AppProps {
  initialSession: Session;
  supabaseUrl: string;
  supabaseAnonKey: string;
}

export default function App({
  initialSession,
  supabaseAnonKey,
  supabaseUrl,
  pageProps,
  Component,
}: Props) {
  const [loading, setLoading] = React.useState(false);
  const [client] = useState(() => createClient(supabaseUrl, supabaseAnonKey));

  console.log({ initialSession, supabaseAnonKey, supabaseUrl });

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
      supabaseClient={client}
      initialSession={initialSession}
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
