"use server";

import { redirect } from "next/navigation";

export async function getDrinks(query: string) {
  const res = await fetch(
    `https://thecocktaildb.com/api/json/v1/1/search.php?s=${query}`,
  );

  if (!res.ok) {
    throw new Error("failed to fetch data");
  }

  return res.json();
}

export async function getDrinkById(id: string) {
  const res = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`,
  );

  if (!res.ok) {
    throw new Error("failed to fetch drink by id");
  }

  const data = await res.json();
  return data.drinks[0];
}

export async function getRandomDrink() {
  const res = await fetch("https://thecocktaildb.com/api/json/v1/1/random.php");
  if (!res.ok) {
    throw new Error("failed to fetch data");
  }

  const data = await res.json();
  const drink = data.drinks[0];

  redirect(`/drink/${drink.idDrink}`);
}
