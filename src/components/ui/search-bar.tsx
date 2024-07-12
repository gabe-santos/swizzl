"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Search } from "lucide-react";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/drinks/?query=${encodeURIComponent(query)}`);
  };

  return (
    <form onSubmit={handleSearch} className="flex w-full gap-4">
      <Input
        variant="bordered"
        size="lg"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for drinks..."
        isClearable
        endContent={
          <Button
            className="opacity-50"
            variant="light"
            size="sm"
            isIconOnly
            type="submit"
          >
            <Search />
          </Button>
        }
      />
    </form>
  );
}
