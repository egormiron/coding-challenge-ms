import { Recipe, RecipePreview } from "../types/recipe";
import { request, gql } from "graphql-request";

const SPACE_ID = "kk2bw5ojx476";
const TOKEN =
  "7ac531648a1b5e1dab6c18b0979f822a5aad0fe5f1109829b8a197eb2be4b84c";
const API_URL = `https://graphql.contentful.com/content/v1/spaces/${SPACE_ID}?access_token=${TOKEN}`;

const recipeFragment = gql`
  fragment RecipeFragment on Recipe {
    sys {
      id
      publishedAt
    }
    title
    photo {
      url
      title
    }
  }
`;

const GET_RECIPE_BY_ID = gql`
  query getRecipeById($id: String!) {
    recipe(id: $id) {
      ...RecipeFragment
      description
      chef {
        name
      }
      tagsCollection {
        items {
          name
        }
      }
    }
  }
  ${recipeFragment}
`;

const GET_RECIPES = gql`
  query getRecipes {
    recipeCollection {
      items {
        ...RecipeFragment
      }
    }
  }
  ${recipeFragment}
`;

export async function getRecipes(): Promise<RecipePreview[]> {
  const { recipeCollection } = await request(API_URL, GET_RECIPES);

  return recipeCollection.items.map((item) => ({
    id: item.sys.id,
    title: item.title,
    photo: {
      title: item.photo?.title || null,
      url: item.photo?.url || null,
    },
  }));
}

export async function getRecipeById(id: string): Promise<Recipe> {
  const { recipe } = await request(API_URL, GET_RECIPE_BY_ID, { id });

  return recipe && normalizeRecipe(recipe);
}

function normalizeRecipe(data): Recipe {
  return {
    id: data.sys.id,
    chef: data.chef && data.chef.name,
    createAt: new Date(data.sys.publishedAt).toLocaleDateString(),
    title: data.title,
    description: data.description,
    photo: {
      title: data.photo?.title || null,
      url: data.photo?.url || null,
    },
    tags: data.tagsCollection.items.map((item) => item.name),
  };
}
