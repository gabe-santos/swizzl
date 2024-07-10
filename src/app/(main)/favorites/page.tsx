import DrinksGrid from "@/components/drinks/drinks-grid";
import { getUser } from "@/lib/actions/auth";
import { getFavoriteDrinks } from "@/lib/queries/favorites";
import { redirect } from "next/navigation";

export default async function FavoritesPages() {
  const user = await getUser();
  if (!user) redirect("/");

  const { favoriteDrinks, error } = await getFavoriteDrinks();
  if (error) {
    return "Error";
  }

  if (!favoriteDrinks || favoriteDrinks?.length === 0) {
    return "No drinks found!";
  }

  return (
    <main className="flex flex-col gap-8 justify-between">
      <h1 className="text-3xl font-medium">Favorites</h1>
      <DrinksGrid drinks={favoriteDrinks} />
    </main>
  );
}
