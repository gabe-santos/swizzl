import FavoriteBtn from "@/components/buttons/favorite-btn";
import { getDrinkById } from "@/lib/queries/drinks";
import { DrinkData } from "@/types/drink";
import { Chip, Image } from "@nextui-org/react";
import { extractIngredientsAndMeasurements } from "@/utils/drink";

export default async function DrinkPage({
  params,
}: {
  params: { drinkId: string };
}) {
  const drinkData: DrinkData = await getDrinkById(params.drinkId);

  if (!drinkData) return "No drink found.";

  const ingredients = extractIngredientsAndMeasurements(drinkData);

  return (
    <div className="flex w-full h-full gap-0">
      <div className="w-full">
        <Image
          src={drinkData.strDrinkThumb}
          alt={drinkData.strDrink}
          // className='object-cover'
        />
      </div>

      <div className="flex w-full flex-col items-start justify-between px-10 ">
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-medium">{drinkData.strDrink}</h1>
          <FavoriteBtn drinkId={params.drinkId} />
          <p>{drinkData.strInstructions}</p>
          <ul>
            {ingredients.map(({ ingredient, measure }, index) => (
              <li key={index}>
                {measure} {ingredient}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex gap-1">
          {drinkData.strTags?.split(",").map((t, index) => {
            return <Chip key={index}>{t}</Chip>;
          })}
        </div>
      </div>
    </div>
  );
}
