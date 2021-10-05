import colors from "@/colors";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRef } from "react";
import { createGlobalStyle } from "styled-components";
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";

const GlobalStyle = createGlobalStyle`
  html { font-family: 'Inter', sans-serif; }
  @supports (font-variation-settings: normal) {
    html { font-family: 'Inter var', sans-serif; }
  }
  body {
    background-color: #ffffff;
  }
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    -webkit-appearance: none;
  }
  input:focus,
  select:focus,
  textarea:focus,
  button:focus {
    outline: none;
  }
  .cover {
    object-fit: cover;
    width: 100% !important;
    position: relative !important;
    height: unset !important;
  }
  .contain {
    object-fit: contain;
    object-position: left;
  }
`;

function MyApp({ Component, pageProps }: AppProps) {
  const queryClientRef = useRef<QueryClient>();
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=0"
        />
        <link
          rel="mask-icon"
          href="/safari-pinned-tab.svg"
          color={colors.primary}
        />
        <meta name="msapplication-TileColor" content={colors.black} />
        <meta name="theme-color" content={colors.primary} />
        <link href="https://rsms.me/inter/inter.css" rel="stylesheet" />
      </Head>
      <GlobalStyle />
      <QueryClientProvider client={queryClientRef.current}>
        <Hydrate state={pageProps.dehydratedState}>
          <Component {...pageProps} />
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}
export default MyApp;
