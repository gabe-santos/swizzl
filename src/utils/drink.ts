import { DrinkData } from "@/types/drink";
import { IngredientMeasure } from "@/types/drink";

export const extractIngredientsAndMeasurements = (
  drinkData: DrinkData,
): IngredientMeasure[] => {
  const ingredients: IngredientMeasure[] = [];

  for (let i = 1; i <= 15; i++) {
    const ingredientKey = `strIngredient${i}` as keyof DrinkData;
    const measureKey = `strMeasure${i}` as keyof DrinkData;

    const ingredient = drinkData[ingredientKey];
    if (ingredient) {
      const measure = (drinkData[measureKey] || "").trim();
      ingredients.push({ ingredient, measure });
    }
  }

  return ingredients;
};
