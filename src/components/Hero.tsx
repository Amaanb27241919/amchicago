import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import aspireManifestLogo from "@/assets/aspire-manifest-logo.png";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background">
        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-purple/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-brand-magenta/15 rounded-full blur-[100px] animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-blue/10 rounded-full blur-[150px]" />
      </div>

      <div className="relative container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Logo */}
          <motion.img
            src={aspireManifestLogo}
            alt="Aspire | Manifest Chicago"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="h-32 sm:h-44 md:h-56 w-auto mx-auto mb-6"
          />

          {/* Main heading */}
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold mb-6 tracking-tight">
            <span className="gradient-brand-text glow-text">Elevate</span>
            <br />
            <span className="text-foreground">Your Style</span>
          </h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto mb-10"
          >
            Premium streetwear from Chicago. Bold designs that speak to your ambition.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              size="lg"
              className="gradient-brand text-primary-foreground font-semibold px-8 glow-brand hover:opacity-90 transition-opacity"
              onClick={() => document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Shop Collection
            </Button>
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

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-muted-foreground"
          >
            <ArrowDown className="h-5 w-5" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
