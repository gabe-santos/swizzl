"use server";
import { DrinkData } from "@/types/drink";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { getDrinkById } from "./drinks";

type FavoritesResponse = {
  favoriteDrinks?: DrinkData[];
  error?: string;
};

export async function getFavoriteDrinks(): Promise<FavoritesResponse> {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { favoriteDrinks: [], error: "User not authenticated" };
  }

  const { data, error } = await supabase
    .from("user_favorites")
    .select("drink_id")
    .eq("user_id", user.id);

  if (error) {
    console.error("Supabase error: ", error);
    return { error: "Failed to fetch favorites" };
  }

  if (!data || data.length === 0) {
    return { favoriteDrinks: [] };
  }

  try {
    const favoriteDrinks = await Promise.all(
      data.map(async (item) => {
        const drinkData = await getDrinkById(item.drink_id);
        return drinkData;
      }),
    );

    // Filter out any null results in case getDrinkById failed for some drinks
    const validFavoriteDrinks = favoriteDrinks.filter(
      (drink): drink is DrinkData => drink !== null,
    );

    return { favoriteDrinks: validFavoriteDrinks };
  } catch (error) {
    console.error("Error fetching drink details:", error);
    return { error: "Failed to fetch drink details" };
  }
}
