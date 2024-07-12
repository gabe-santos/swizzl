"use server";

import { DrinkData } from "@/types/drink";
import { redirect } from "next/navigation";

export async function getDrinks(query: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/search.php?s=${query}`,
  );

  if (!res.ok) {
    throw new Error("failed to fetch data");
  }

  return res.json();
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

export async function getRandomDrink() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/random.php`);
  if (!res.ok) {
    throw new Error("failed to fetch data");
  }

  const data = await res.json();
  const drink = data.drinks[0];

  redirect(`/drink/${drink.idDrink}`);
}
