"use client";
import { Button } from "@nextui-org/button";
import { Shuffle } from "lucide-react";
import { getRandomDrink } from "@/lib/queries/drinks";
import { useTransition } from "react";

export default function RandomDrinkBtn() {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    startTransition(() => {
      getRandomDrink();
    });
  };

  return (
    <form action="" onSubmit={handleSubmit}>
      <Button
        isIconOnly
        type="submit"
        color="primary"
        size="lg"
        isLoading={isPending}
      >
        <Shuffle />
      </Button>
    </form>
  );
}
