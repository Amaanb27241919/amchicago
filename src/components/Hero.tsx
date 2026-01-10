import { motion, type Easing } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import aspireManifestLogo from "@/assets/aspire-manifest-logo.png";

const easeOutQuart: Easing = [0.25, 0.46, 0.45, 0.94];

const floatingAnimation = {
  y: [0, -10, 0],
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut" as const,
  },
};

const textRevealVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: easeOutQuart,
    },
  }),
};

const glowPulse = {
  scale: [1, 1.02, 1],
  opacity: [0.15, 0.25, 0.15],
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut" as const,
  },
};

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background">
        {/* Animated gradient orbs */}
        <motion.div
          animate={glowPulse}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-purple/20 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.02, 1],
            opacity: [0.15, 0.25, 0.15],
            transition: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut" as const,
              delay: 1,
            },
          }}
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-brand-magenta/15 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.02, 1],
            opacity: [0.15, 0.25, 0.15],
            transition: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut" as const,
              delay: 2,
            },
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-blue/10 rounded-full blur-[150px]"
        />
      </div>

      <div className="relative container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Logo with floating animation */}
          <motion.img
            src={aspireManifestLogo}
            alt="Aspire | Manifest Chicago"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8, ease: easeOutQuart }}
            whileInView={floatingAnimation}
            className="h-44 sm:h-56 md:h-64 lg:h-72 w-auto mx-auto mb-0"
          />

          {/* Main heading with staggered text reveal */}
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold mb-6 tracking-tight">
            <motion.span
              custom={0}
              variants={textRevealVariants}
              initial="hidden"
              animate="visible"
              className="bg-gradient-to-r from-brand-purple via-brand-magenta to-brand-purple bg-clip-text text-transparent glow-text inline-block"
            >
              Elevate
            </motion.span>
            <br />
            <motion.span
              custom={1}
              variants={textRevealVariants}
              initial="hidden"
              animate="visible"
              className="text-foreground inline-block"
            >
              Your Style
            </motion.span>
          </h1>

          {/* Subheading */}
          <motion.p
            custom={2}
            variants={textRevealVariants}
            initial="hidden"
            animate="visible"
            className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto mb-10"
          >
            Premium streetwear from Chicago. Bold designs that speak to your ambition.
          </motion.p>

          {/* CTA with stagger */}
          <motion.div
            custom={3}
            variants={textRevealVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Button
                size="lg"
                className="gradient-brand text-primary-foreground font-semibold px-8 glow-brand hover:opacity-90 transition-opacity"
                onClick={() => document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Shop Collection
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Button
                size="lg"
                variant="outline"
                className="border-border hover:bg-secondary/50"
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Our Story
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-muted-foreground"
          >
            <ArrowDown className="h-5 w-5" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
