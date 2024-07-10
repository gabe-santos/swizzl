"use client";

import { Button } from "@nextui-org/react";
import { Heart } from "lucide-react";
import { addToFavorites, checkFavoriteStatus } from "@/lib/actions/favorites";
import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

export default function FavoriteBtn({ drinkId }: { drinkId: string }) {
  const [isPending, startTransition] = useTransition();
  const [isFavorited, setIsFavorited] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkStatus = async () => {
      const result = await checkFavoriteStatus(drinkId);
      if (result.isFavorited) {
        setIsFavorited(result.isFavorited);
      }
    };
    checkStatus();
  }, [drinkId]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    startTransition(async () => {
      const result = await addToFavorites(drinkId);

      if (result.error) {
        console.error(result.error);
      } else {
        setIsFavorited(!isFavorited);
        console.log("Added to favorites");
        router.refresh();
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Button
        type="submit"
        variant="flat"
        startContent={
          <Heart color="#ef4444" fill={isFavorited ? "#ef4444" : "none"} />
        }
        isLoading={isPending}
      >
        {isFavorited ? "Remove from Favorites" : "Add to Favorites"}
      </Button>
    </form>
  );
}
