import DrinksGrid from "@/components/drinks/drinks-grid";
import { getDrinksByQuery } from "@/lib/queries/drinks";

export default async function DrinksPage({
  searchParams,
}: {
  searchParams?: { query?: string };
}) {
  const query = searchParams?.query || "";
  const drinks = await getDrinksByQuery(query);

  return (
    <>
      <DrinksGrid drinks={drinks} />
    </>
  );
}
