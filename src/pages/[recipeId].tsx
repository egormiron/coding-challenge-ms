import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import DefaultErrorPage from "next/error";
import styled from "styled-components";

import { getRecipeById, getRecipes } from "../services/recipe";
import { Recipe } from "../types/recipe";
import Loader from "../components/loader";
import Tags from "../components/tags";

type RecipePageType = {
  recipe: Recipe;
};

export default function ItemDetails({ recipe }: RecipePageType) {
  const router = useRouter();

  if (router.isFallback) {
    return <Loader />;
  }

  if (!recipe) {
    return <DefaultErrorPage statusCode={404} />;
  }

  return (
    <>
      <Head>
        <title>{recipe.title} - Marley Spoon</title>
      </Head>
      <Container>
        <h1>{recipe.title}</h1>
        <p>
          {recipe.chef && <b>By: {recipe.chef} | </b>}
          <i>{recipe.createAt}</i>
        </p>
      </Container>
      <Image height="450" src={recipe.photo.url} alt={recipe.photo.title} />
      <Description>{recipe.description}</Description>
      <Tags items={recipe.tags} />
      <Link href="/">
        <A>Go Back</A>
      </Link>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const recipe = await getRecipeById(params.recipeId as string);

  return { props: { recipe } };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const recipes = await getRecipes();
  return {
    paths: recipes.map((item) => ({ params: { recipeId: item.id } })),
    fallback: true,
  };
};

const Container = styled.div`
  text-align: center;
`;

const Image = styled.img`
  width: 100%;
  object-fit: cover;
`;

const A = styled.a`
  padding: 1rem;
  font-weight: 700;
`;

const Description = styled.div`
  padding: 1rem;
`;
