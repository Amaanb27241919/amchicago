import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import amEssentialsImage from "@/assets/am-essentials-collection.png";
import foundersSeriesImage from "@/assets/founders-series-collection.png";
import hopeV1Image from "@/assets/hope-v1-collection.png";

const collections = [
  {
    name: "Founders Series",
    description: "Premium essentials for the visionaries",
    query: "Founders",
    image: foundersSeriesImage,
  },
  {
    name: "Hope V1",
    description: "Bold statements, timeless style",
    query: "Hope",
    image: hopeV1Image,
  },
  {
    name: "A | M Essentials",
    description: "Everyday luxury streetwear",
    query: "A | M",
    image: amEssentialsImage,
  },
];

export const Collections = () => {
  return (
    <section id="collections" className="py-20 sm:py-32 bg-card/50">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="text-sm tracking-[0.3em] uppercase text-primary mb-2 block">
            Explore
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold">
            Collections
          </h2>
        </motion.div>

        {/* Collection cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {collections.map((collection, index) => (
            <motion.div
              key={collection.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={`/?collection=${encodeURIComponent(collection.query)}`}
                onClick={() => {
                  setTimeout(() => {
                    document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });
                  }, 100);
                }}
                className="group block relative overflow-hidden rounded-xl aspect-[4/5] hover-shine"
              >
                {/* Background image */}
                <img
                  src={collection.image}
                  alt={collection.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <h3 className="font-display text-2xl font-semibold mb-2 group-hover:gradient-brand-text transition-all">
                    {collection.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {collection.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm font-medium text-primary opacity-0 translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    <span>Shop Now</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
