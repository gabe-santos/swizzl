"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Search } from "lucide-react";
import { getDrinksByQuery } from "@/lib/queries/drinks";

interface Suggestion {
  idDrink: string;
  strDrink: string;
}

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const getResults = async () => {
      if (query.length > 2) {
        const searchResults = await getDrinksByQuery(query);
        setSuggestions(searchResults.slice(0, 5)); // Limit to 5 suggestions
        setShowSuggestions(true);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    };
    const debounceTimer = setTimeout(() => {
      getResults();
    }, 300);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setActiveSuggestion(-1);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/drinks/?query=${encodeURIComponent(query)}`);
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (suggestion: Suggestion) => {
    setQuery(suggestion.strDrink);
    router.push(`/drinks/${suggestion.idDrink}`);
    setShowSuggestions(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveSuggestion((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : prev,
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveSuggestion((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Enter" && activeSuggestion !== -1) {
      e.preventDefault();
      handleSuggestionClick(suggestions[activeSuggestion]);
    }
  };

  return (
    <div className="relative w-full">
      <form onSubmit={handleSearch} className="flex w-full gap-4">
        <Input
          ref={inputRef}
          variant="bordered"
          size="lg"
          type="text"
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Search for drinks..."
          isClearable
          onClear={() => {
            setQuery("");
            setSuggestions([]);
            setShowSuggestions(false);
          }}
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
      {showSuggestions && suggestions.length > 0 && (
        <ul
          ref={dropdownRef}
          className="absolute z-10 w-full bg-white shadow-lg rounded-b-lg mt-1"
        >
          {suggestions.map((suggestion, index) => (
            <li
              key={suggestion.idDrink}
              className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                index === activeSuggestion ? "bg-gray-100" : ""
              }`}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion.strDrink}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
