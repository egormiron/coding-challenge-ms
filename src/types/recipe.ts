export type RecipePreview = {
  id: string;
  createAt: string;
  title: string;
  photo: {
    title: string;
    url: string;
  };
};

export type Recipe = RecipePreview & {
  chef: string;
  description: string;
  tags: string[];
};
