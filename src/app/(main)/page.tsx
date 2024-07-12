import Carousel from "@/components/ui/carousel";
import DrinkCard from "@/components/drinks/drink-card";
import { getDrinks } from "@/lib/queries/drinks";

export default async function Home() {
  const martinis = await getDrinks("martini");
  const negronis = await getDrinks("negroni");
  const margaritas = await getDrinks("margarita");

  return (
    <div className="w-full flex flex-col items-center">
      <Carousel label="Martinis">
        {martinis.map((drink) => (
          <DrinkCard
            key={drink.idDrink}
            id={drink.idDrink}
            title={drink.strDrink}
            src={drink.strDrinkThumb}
          />
        ))}
      </Carousel>

      <Carousel label="Negronis">
        {negronis.map((drink) => (
          <DrinkCard
            key={drink.idDrink}
            id={drink.idDrink}
            title={drink.strDrink}
            src={drink.strDrinkThumb}
          />
        ))}
      </Carousel>

      <Carousel label="margaritas">
        {margaritas.map((drink) => (
          <DrinkCard
            key={drink.idDrink}
            id={drink.idDrink}
            title={drink.strDrink}
            src={drink.strDrinkThumb}
          />
        ))}
      </Carousel>
    </div>
  );
}
