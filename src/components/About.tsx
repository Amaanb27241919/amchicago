import { motion } from "framer-motion";

export const About = () => {
  return (
    <section id="about" className="py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&auto=format&fit=crop&q=80"
                alt="A|M Chicago"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating accent */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 gradient-brand rounded-xl opacity-50 blur-2xl" />
          </motion.div>

          {/* Content */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <span className="text-sm tracking-[0.3em] uppercase text-primary mb-4 block">Our Story</span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold mb-6">
              Built on legacy. <span className="gradient-brand-text">Designed for the future.</span>
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
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
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-10 pt-10 border-t border-border">
              <div>
                <div className="text-3xl font-display font-semibold gradient-brand-text">Chi</div>
                <div className="text-sm text-muted-foreground mt-1">Based in Chicago</div>
              </div>
              <div>
                <div className="text-3xl font-display font-semibold gradient-brand-text">100%</div>
                <div className="text-sm text-muted-foreground mt-1">Premium Quality</div>
              </div>
              <div>
                <div className="text-3xl font-display font-semibold gradient-brand-text">24/7</div>
                <div className="text-sm text-muted-foreground mt-1">Support</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
