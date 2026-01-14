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
    slug: "founders-series",
    image: foundersSeriesImage,
    imageClass: "object-cover",
  },
  {
    name: "Hope V1",
    description: "Bold statements, timeless style",
    slug: "hope-v1",
    image: hopeV1Image,
    imageClass: "object-contain scale-75",
  },
  {
    name: "A | M Essentials",
    description: "Everyday luxury streetwear",
    slug: "am-essentials",
    image: amEssentialsImage,
    imageClass: "object-cover",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

export const Collections = () => {
  return (
    <section id="collections" className="py-20 sm:py-32 bg-card/50">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.span
            initial={{ opacity: 0, letterSpacing: "0.2em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.3em" }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm tracking-[0.3em] uppercase text-primary mb-2 block"
          >
            Explore
          </motion.span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold">
            Collections
          </h2>
        </motion.div>

        {/* Collection cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {collections.map((collection) => (
            <motion.div
              key={collection.name}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <Link
                to={`/collections/${collection.slug}`}
                className="group block relative overflow-hidden rounded-xl aspect-[4/5] hover-shine"
              >
                {/* Background image */}
                <motion.img
                  src={collection.image}
                  alt={collection.name}
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className={`absolute inset-0 w-full h-full ${collection.imageClass}`}
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <motion.h3
                    className="font-display text-2xl font-semibold mb-2 group-hover:gradient-brand-text transition-all"
                  >
                    {collection.name}
                  </motion.h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {collection.description}
                  </p>
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-2 text-sm font-medium text-primary opacity-0 translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                  >
                    <span>Shop Now</span>
                    <ArrowRight className="h-4 w-4" />
                  </motion.div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
