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
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-sm tracking-[0.3em] uppercase text-primary mb-4 block">
              Our Story
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold mb-6">
              Aspire.{" "}
              <span className="gradient-brand-text">Manifest.</span>
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Born in the heart of Chicago, A|M is more than a clothing brand—it's a movement. 
                We believe in the power of vision and the courage to pursue it.
              </p>
              <p>
                Every piece we create embodies the spirit of ambition. From our signature hoodies 
                to our limited-edition Founders Series, each garment is designed for those who 
                dare to dream and work to achieve.
              </p>
              <p>
                Our mission is simple: to inspire you to aspire for more and manifest your 
                greatest vision. This isn't just fashion—it's a reminder of who you're becoming.
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
