/** @format */

import Head from "next/head";
import { useRouter } from "next/router";
import { useQuery, useMutation, gql } from "@apollo/client";
import { initializeApollo } from "../../lib/apollo";
import React from "react";
import styled from "styled-components";

const BIKE = gql`
	query bike($id: ID!) {
		bike(id: $id) {
			id
			bikeName
			bikePrice
			bikeSale
		}
	}
`;

const Bike: React.FC = () => {
	const router = useRouter();
	const id = router.query.Bike;
	const { loading, error, data, refetch, networkStatus } = useQuery(BIKE, {
		variables: { id },
		pollInterval: 10000,
	});

	const { bikeName, bikePrice, bikeSale } = data.bike;
	if (error) return <div>Error</div>;
	if (loading) return <div>Loading</div>;
	return (
		<React.Fragment>
			<Head>
				<title>SHOP</title>
				<meta name='viewport' content='initial-scale=1.0, width=device-width' />
			</Head>
			<AppBike>
				<div>{bikeName}</div>
				<div>Cena: {bikePrice} zł</div>
				{bikeSale ? <Sale sale={"green"}>W sprzedaży</Sale> : <Sale sale={"red"}>Wkrótrce w sklepach</Sale>}
			</AppBike>
		</React.Fragment>
	);
};

export default Bike;

export const getStaticPaths = async () => {
	const apolloClient = initializeApollo();

	const BIKES = gql`
		query bikes($skip: Int, $limit: Int) {
			bikes(skip: $skip, limit: $limit) {
				id
			}
		}
	`;
	const { data, loading } = await apolloClient.query({
		query: BIKES,
	});
	const paths = data.bikes.map((bike) => {
		return { params: { Bike: bike.id } };
	});
	return { paths, fallback: true };
};

export async function getStaticProps({ params }) {
	const apolloClient = initializeApollo();
	await apolloClient.query({
		query: BIKE,
		variables: { id: params.Bike },
	});
	return {
		props: {
			initialApolloState: apolloClient.cache.extract(),
		},
		revalidate: 1,
	};
}

const AppBike = styled.section`
	margin: 0px;
	padding: 0px;
	box-sizing: border-box;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	color: ${(props) => props.theme.colors.main};
`;

type SaleProp = { sale: string };

const Sale = styled.div<SaleProp>`
	color: ${(props) => props.sale};
`;
