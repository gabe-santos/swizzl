"use client";

import { Button, Tooltip } from "@nextui-org/react";
import { Heart } from "lucide-react";
import { addToFavorites, checkFavoriteStatus } from "@/lib/actions/favorites";
import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function FavoriteBtn({ drinkId }: { drinkId: string }) {
  const [isPending, startTransition] = useTransition();
  const [isFavorited, setIsFavorited] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const checkUserAndFavorite = async () => {
      try {
        const { data, error } = await supabase.auth.getUser();
        if (error) throw error;

        setIsSignedIn(!!data.user);

        if (data.user) {
          const result = await checkFavoriteStatus(drinkId);
          if ("isFavorited" in result) {
            setIsFavorited(result.isFavorited);
          }
        }
      } catch (error) {
        console.error("Error checking user and favorite status:", error);
        setIsSignedIn(false);
      }
    };
    checkUserAndFavorite();
  }, [drinkId, supabase]);

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
      <Tooltip content="Must be signed in" isDisabled={isSignedIn} showArrow>
        <Button
          type="submit"
          variant="flat"
          startContent={
            <Heart color="#ef4444" fill={isFavorited ? "#ef4444" : "none"} />
          }
          isLoading={isPending}
          disabled={!isSignedIn}
          // isDisabled={!isSignedIn}
        >
          {isFavorited ? "Remove from Favorites" : "Add to Favorites"}
        </Button>
      </Tooltip>
    </form>
  );
}
