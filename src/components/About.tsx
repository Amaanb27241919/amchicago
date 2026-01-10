import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

const statVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.4,
      ease: "easeOut" as const,
    },
  }),
};

export const About = () => {
  return (
    <section id="about" className="py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="aspect-[4/5] rounded-xl overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&auto=format&fit=crop&q=80"
                alt="A|M Chicago"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </motion.div>
            {/* Floating accent */}
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.5, 0.7, 0.5],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -right-6 w-32 h-32 gradient-brand rounded-xl blur-2xl"
            />
          </motion.div>

          {/* Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.span variants={itemVariants} className="text-sm tracking-[0.3em] uppercase text-primary mb-4 block">
              Our Story
            </motion.span>
            <motion.h2 variants={itemVariants} className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold mb-6">
              Built on legacy. <span className="gradient-brand-text">Designed for the future.</span>
            </motion.h2>
            <motion.div variants={itemVariants} className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                At A|M Chicago, we're building more than a brand — we're shaping a movement rooted in discipline,
                resilience, and respect for our origins. Our vision blends cultural legacy with modern design to create
                essentials that feel intentional, purposeful, and built to last.
              </p>
              <p>
                Founded in Chicago, we focus on premium pieces with character: wide-leg silhouettes, heavyweight
                fabrics, and a minimalist aesthetic that stands the test of time. Every drop is engineered for
                durability, comfort, and relevance — everyday staples that elevate your routine while keeping you
                grounded in something greater.
              </p>
              <p>
                We believe style is more than appearance; it's presence. Our apparel is for individuals who move with
                confidence, lead with authenticity, and carry a story worth sharing. Whether it's the grind, the
                weekend, or the moments that matter, A | M Chicago delivers pieces that reflect your values and
                ambition.
              </p>
              <p>
                We're here to grow with intention, build community, and stay true to what defines us — timeless,
                functional, purpose-driven design.
              </p>
            </motion.div>

            {/* Signature */}
            <motion.div variants={itemVariants} className="mt-8 pt-6 border-t border-border/50">
              <p className="font-display text-xl font-semibold gradient-brand-text">A | M Chicago</p>
              <p className="text-sm text-muted-foreground italic mt-1">Built on legacy. Designed for the future.</p>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-6 mt-10 pt-10 border-t border-border"
            >
              {[
                { value: "Chi", label: "Based in Chicago" },
                { value: "100%", label: "Premium Quality" },
                { value: "24/7", label: "Support" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  custom={i}
                  variants={statVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-3xl font-display font-semibold gradient-brand-text">{stat.value}</div>
                  <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
