import Carousel from "@/components/ui/carousel";
import DrinkCard from "@/components/drinks/drink-card";
import { Suspense } from "react";
import {
  getDrinksByIngredient,
  getMultipleDrinksById,
} from "@/lib/queries/drinks";

const drinkCategories = [
  {
    name: "Classics",
    ids: [
      "11003",
      "11001",
      "11008",
      "11728",
      "11006",
      "11004",
      "12402",
      "12127",
      "11009",
      "12196",
      "17197",
      "17206",
      "11000",
    ],
  },
  {
    name: "Great for Summer",
    ids: [
      "12316",
      "178341",
      "178336",
      "12362",
      "178360",
      "178325",
      "11064",
      "178332",
      "17255",
      "17210",
      "178352",
      "11666",
    ],
  },
  {
    name: "Tiki",
    ids: ["17241", "11690", "17211", "17267", "17207"],
  },
  {
    name: "Shots",
    ids: ["15853", "178306", "13202", "14956", "14087"],
  },
];

export default async function Home() {
  const drinksData = await Promise.all(
    drinkCategories.map(async (category) => ({
      name: category.name,
      drinks: await getMultipleDrinksById(category.ids),
    })),
  );

  return (
    <div className="w-full flex flex-col items-center">
      {drinksData.map(({ name, drinks }) => (
        <section key={name} className="w-full max-w-7xl mb-8">
          <Suspense fallback={<CarouselSkeleton />}>
            <Carousel label={name}>
              {drinks.map((drink) => (
                <DrinkCard
                  key={drink.idDrink}
                  id={drink.idDrink}
                  title={drink.strDrink}
                  src={drink.strDrinkThumb}
                />
              ))}
            </Carousel>
          </Suspense>
        </section>
      ))}
    </div>
  );
}

function CarouselSkeleton() {
  return (
    <div className="w-full">
      <div className="h-8 w-48 bg-gray-200 rounded mb-4 animate-pulse" />
      <div className="flex space-x-4 overflow-x-auto pb-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="flex-none w-[calc(100%-2rem)] sm:w-[calc(50%-1rem)] md:w-[calc(33.333%-1rem)] lg:w-[calc(25%-1rem)] h-64 bg-gray-200 rounded-lg animate-pulse"
          />
        ))}
      </div>
    </div>
  );
}
