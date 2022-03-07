export interface OpenFoodFacts_IngredientsResp {
  count: number;
  tags: Array<IOpenFoodFacts_Ingredients>;
}
export interface IOpenFoodFacts_Ingredients {
  id: string;
  known: number;
  name: string;
  products: number;
  sameAs: Array<string>;
  url: string;
}
