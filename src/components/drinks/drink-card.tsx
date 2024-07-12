import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import NextLink from "next/link";

export default function DrinkCard({
  id,
  title,
  src,
}: {
  id: string;
  title: string;
  src: string;
}) {
  return (
    <Card as={NextLink} scroll href={`/drinks/${id}`} className="w-full h-full">
      <CardBody className="p-0 aspect-square">
        <Image src={src} alt={title} className="w-full h-full object-cover" />
      </CardBody>
      <CardFooter className="justify-center p-4">
        <p className="font-regular text-center truncate">{title}</p>
      </CardFooter>
    </Card>
  );
}
