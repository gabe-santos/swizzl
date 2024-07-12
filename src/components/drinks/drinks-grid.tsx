import DrinkCard from "./drink-card";
import { DrinkData } from "@/types/drink";

export default async function DrinksGrid({ drinks }: { drinks: DrinkData[] }) {
  if (!drinks || drinks.length === 0) {
    return <p>No drinks found.</p>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {drinks.map((d: DrinkData) => (
        <DrinkCard
          key={d.idDrink}
          id={d.idDrink}
          title={d.strDrink}
          src={d.strDrinkThumb}
        />
      ))}
    </div>
  );
}
