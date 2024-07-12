"use client";
import React, { useRef, ReactNode } from "react";
import { Button } from "@nextui-org/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselProps {
  label: string;
  children: ReactNode;
}

export default function Carousel({ label, children }: CarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4 px-4">
        <h2 className="text-xl font-semibold">{label}</h2>
        <div className="flex gap-2">
          <Button
            isIconOnly
            onClick={() => scroll("left")}
            aria-label="Scroll left"
          >
            <ChevronLeft />
          </Button>
          <Button
            isIconOnly
            onClick={() => scroll("right")}
            aria-label="Scroll right"
          >
            <ChevronRight />
          </Button>
        </div>
      </div>
      <div className="relative">
        <div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory py-4 px-4 scrollbar-hide"
        >
          {React.Children.map(children, (child) => (
            <div className="snap-start flex-shrink-0 w-[calc(100%-2rem)] sm:w-[calc(50%-1rem)] md:w-[calc(33.333%-1rem)] lg:w-[calc(25%-1rem)]">
              {child}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
