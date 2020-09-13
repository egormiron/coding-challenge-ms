import Link from "next/link";
import Head from "next/head";
import styled from "styled-components";

import { getRecipes } from "../services/recipe";
import { Recipe } from "../types/recipe";

type ListPageProps = {
  items: Recipe[];
};

export default function Home({ items }: ListPageProps) {
  return (
    <>
      <Head>
        <title>Recipes - Marley Spoon</title>
      </Head>
      <H1>Recipes</H1>
      <GridContainer>
        {items.map((item) => (
          <GridItem key={item.id}>
            <Link href="/[recipeId]" as={`/${item.id}`}>
              <a>
                <img width="100%" src={item.photo.url} alt={item.photo.title} />
              </a>
            </Link>
            <Link href="/[recipeId]" as={`/${item.id}`}>
              <A>{item.title}</A>
            </Link>
          </GridItem>
        ))}
      </GridContainer>
    </>
  );
}

export async function getStaticProps() {
  const items = await getRecipes();
  return { props: { items } };
}

const H1 = styled.h1`
  text-align: center;
`;

const GridContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 50% 50%;
`;

const GridItem = styled.div`
  padding: 1.5rem;
  text-align: center;
  font-size: 1.25rem;
  display: flex;
  flex-direction: column;
`;

const A = styled.a`
  padding: 1rem;
`;
