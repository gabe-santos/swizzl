import DrinksGrid from "@/components/drinks/drinks-grid";
import { getDrinks } from "@/lib/queries/drinks";

const bestDrinksIds = ["11001"];

export default async function DrinksPage({
  searchParams,
}: {
  searchParams?: { query?: string };
}) {
  const query = searchParams?.query || "";
  const res = await getDrinks(query);
  const drinks = res.drinks;

  return (
    <>
      <DrinksGrid drinks={drinks} />
    </>
  );
}
