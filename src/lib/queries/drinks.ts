import { DrinkData } from "@/types/drink";
import { redirect } from "next/navigation";

export async function getDrinks(query: string): Promise<DrinkData[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/search.php?s=${query}`,
  );

  if (!res.ok) {
    throw new Error("failed to fetch data");
  }

  const { drinks } = await res.json();
  return drinks;
}

export async function getDrinkById(id: string): Promise<DrinkData> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/lookup.php?i=${id}`,
  );

  if (!res.ok) {
    throw new Error("failed to fetch drink by id");
  }

  const data = await res.json();
  return data.drinks[0];
}

export async function getMultipleDrinksById(ids: string[]) {
  const drinks: DrinkData[] = [];

  for (const id of ids) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/lookup.php?i=${id}`,
      );
      if (!res.ok) {
        console.error(`Failed to fetch drink with id ${id}`);
        continue;
      }
      const data = await res.json();
      if (data.drinks && data.drinks.length > 0) {
        drinks.push(data.drinks[0]);
      }
    } catch (error) {
      console.error(`Error fetching drink with id ${id}:`, error);
    }
  }

  return drinks;
}

export async function getRandomDrink() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/random.php`);
  if (!res.ok) {
    throw new Error("failed to fetch data");
  }

  const data = await res.json();
  const drink = data.drinks[0];

  redirect(`/drink/${drink.idDrink}`);
}
