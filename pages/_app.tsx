import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { ChakraProvider, Spinner } from "@chakra-ui/react";
import { Router } from "next/router";
import React from "react";
import Loading from "../components/Layout/loading";

export default function App({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = React.useState(false);
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
  );
}
