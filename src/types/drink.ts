export type DrinkData = {
  idDrink: string;
  strDrink: string;
  strCategory: string;
  strInstructions: string;
  strTags: null | string;
  strDrinkThumb: string;
};

export interface IngredientMeasure {
  ingredient: string;
  measure: string;
}
