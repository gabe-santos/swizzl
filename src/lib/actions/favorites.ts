"use server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function addToFavorites(drinkId: string) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return { error: "User not authenticated" };
  }

  if (!drinkId) {
    return { error: "DrinkId is required" };
  }

  const { data: existingFavorite, error: checkError } = await supabase
    .from("user_favorites")
    .select("id")
    .eq("user_id", user.id)
    .eq("drink_id", drinkId)
    .single();

  if (checkError && checkError.code !== "PGRST116") {
    console.error("Supabase error:", checkError);
    return { error: "Failed to check existing favorite" };
  }

  if (existingFavorite) {
    const { error: deleteError } = await supabase
      .from("user_favorites")
      .delete()
      .eq("id", existingFavorite.id);

    if (deleteError) {
      console.error("Supabase error:", deleteError);
      return { error: "Failed to remove favorite" };
    }
  } else {
    const { error: insertError } = await supabase
      .from("user_favorites")
      .insert({ user_id: user.id, drink_id: drinkId });

    if (insertError) {
      console.error("Supabase error:", insertError);
      return { error: "Failed to add favorite" };
    }
  }

  revalidatePath("/drink/[drinkId]");
  return { success: true, isFavorited: !existingFavorite };
}

export async function checkFavoriteStatus(drinkId: string) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return { error: "User not authenticated" };
  }

  const { data, error } = await supabase
    .from("user_favorites")
    .select("id")
    .eq("user_id", user.id)
    .eq("drink_id", drinkId)
    .single();

  if (error && error.code !== "PGRST116") {
    console.error("Supabase error: ", error);
    return { error: "Failed to check favorite status" };
  }

  return { isFavorited: !!data };
}
