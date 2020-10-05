/** @format */

import "../styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";

//SWR
import { SWRConfig } from "swr";
import axios from "axios";

import { ApolloProvider } from "@apollo/client";
import { Provider } from "react-redux";
import { useStore } from "../lib/redux";
import { useApollo } from "../lib/apollo";

//STYLED COMPONETNS
import { ThemeProvider } from "styled-components";
import DarkTheme from "../styles/theme/dark";
import LightTheme from "../styles/theme/light";
import GlobalStyle from "../styles/global";

//LAYOUT
import Layout from "../components/Layout";

export default function App({ Component, pageProps }: AppProps) {
	const store = useStore(pageProps.initialReduxState);
	const apolloClient = useApollo(pageProps.initialApolloState);
	return (
		<Provider store={store}>
			<ApolloProvider client={apolloClient}>
				<ThemeProvider theme={DarkTheme}>
					<GlobalStyle />
					<SWRConfig
						value={{
							refreshInterval: 3000,
							fetcher: (url: string) => axios.get(url).then((res) => res.data),
						}}
					>
						<React.StrictMode>
							<Layout>
								<Component {...pageProps} />
							</Layout>
						</React.StrictMode>
					</SWRConfig>
				</ThemeProvider>
			</ApolloProvider>
		</Provider>
	);
}
