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
    <Card as={NextLink} href={`/drinks/${id}`} className="w-full">
      <CardBody className="p-0">
        <Image
          src={src}
          alt={title}
          className="w-full aspect-square object-cover"
        />
      </CardBody>
      <CardFooter className="justify-center">
        <p className=" font-regular text-center">{title}</p>
      </CardFooter>
    </Card>
  );
}
