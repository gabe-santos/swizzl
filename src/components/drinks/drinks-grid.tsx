import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import NextImage from "next/image";
import Link from "next/link";
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

const DrinkCard = ({
  id,
  title,
  src,
}: {
  id: string;
  title: string;
  src: string;
}) => {
  return (
    <Card as={Link} href={`/drinks/${id}`} className="w-fit">
      <Image
        as={NextImage}
        className="hover:scale-105 transition-transform duration-500 ease-in-out"
        src={src}
        alt={title}
        width={300}
        height={300}
        isZoomed
      />
      <CardFooter>
        <p className="group-hover:font-medium font-regular text-lg text-center w-full">
          {title}
        </p>
      </CardFooter>
    </Card>
  );
};
