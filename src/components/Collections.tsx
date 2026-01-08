import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const collections = [
  {
    name: "A | M Collection",
    slug: "frontpage",
    image: "https://amchicago.shop/cdn/shop/collections/Logo_Designs.png?v=1763877847&width=800",
  },
  {
    name: "Hope V1",
    slug: "hope-v1",
    image: "https://amchicago.shop/cdn/shop/collections/A_M_DESIGNS.png?v=1764915394&width=800",
  },
  {
    name: "Founders Series",
    slug: "a-m-founders-series",
    image: "https://amchicago.shop/cdn/shop/collections/FS_LOGO.png?v=1765429798&width=800",
  },
];

export const Collections = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", checkScroll);
      return () => el.removeEventListener("scroll", checkScroll);
    }
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="collections" className="py-16 sm:py-24 bg-[#f5f5f5]">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1a1a1a]">
            Shop by Collection
          </h2>
        </motion.div>

        {/* Carousel container */}
        <div className="relative">
          {/* Left arrow */}
          {canScrollLeft && (
            <Button
              variant="outline"
              size="icon"
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white border-gray-200 shadow-lg hidden md:flex"
              onClick={() => scroll("left")}
            >
              <ChevronLeft className="h-5 w-5 text-[#1a1a1a]" />
            </Button>
          )}

          {/* Right arrow */}
          {canScrollRight && (
            <Button
              variant="outline"
              size="icon"
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white border-gray-200 shadow-lg hidden md:flex"
              onClick={() => scroll("right")}
            >
              <ChevronRight className="h-5 w-5 text-[#1a1a1a]" />
            </Button>
          )}

          {/* Scrollable cards */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {/* Duplicate for infinite feel */}
            {[...collections, ...collections].map((collection, index) => (
              <motion.div
                key={`${collection.slug}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (index % 3) * 0.1 }}
                className="flex-shrink-0 snap-center"
              >
                <div
                  className="group cursor-pointer w-72 sm:w-80"
                  onClick={() => {
                    document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  {/* Card */}
                  <div className="relative overflow-hidden rounded-xl bg-white aspect-square mb-4 shadow-sm hover:shadow-md transition-shadow">
                    <img
                      src={collection.image}
                      alt={collection.name}
                      className="w-full h-full object-contain p-8 transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-center font-display text-lg font-semibold text-[#1a1a1a] group-hover:text-red-600 transition-colors">
                    {collection.name}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
