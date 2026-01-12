import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Lock } from "lucide-react";
import aspireLogo from "@/assets/aspire-manifest-logo.png";

const EMPLOYEE_PASSWORD = "amthreads101";
const BYPASS_KEY = "am_employee_access";

const floatingAnimation = {
  initial: { y: 0 },
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  },
};

const textRevealVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const glowPulse = {
  animate: {
    opacity: [0.3, 0.6, 0.3],
    scale: [1, 1.1, 1],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  },
};

interface ComingSoonProps {
  onBypass?: () => void;
}

const ComingSoon = ({ onBypass }: ComingSoonProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from("launch_subscribers")
        .insert({ email: email.toLowerCase().trim() });

      if (error) {
        if (error.code === "23505") {
          toast({
            title: "Already subscribed!",
            description: "You're already on our launch list.",
          });
        } else {
          throw error;
        }
      } else {
        toast({
          title: "You're on the list! 🎉",
          description: "We'll notify you when we launch.",
        });
        setEmail("");
      }
    } catch (error) {
      console.error("Subscription error:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === EMPLOYEE_PASSWORD) {
      sessionStorage.setItem(BYPASS_KEY, "true");
      toast({
        title: "Access granted",
        description: "Welcome! You can now preview the site.",
      });
      onBypass?.();
    } else {
      toast({
        title: "Incorrect password",
        description: "Please try again.",
        variant: "destructive",
      });
      setPassword("");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Animated background orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-purple/20 rounded-full blur-3xl"
        variants={glowPulse}
        animate="animate"
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-brand-magenta/20 rounded-full blur-3xl"
        variants={glowPulse}
        animate="animate"
        style={{ animationDelay: "2s" }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-purple/10 rounded-full blur-3xl"
        variants={glowPulse}
        animate="animate"
        style={{ animationDelay: "1s" }}
      />

      <div className="relative z-10 text-center px-4 pb-16 max-w-2xl mx-auto">
        {/* Logo */}
        <motion.div
          variants={floatingAnimation}
          initial="initial"
          animate="animate"
          className="mb-8"
        >
          <img
            src={aspireLogo}
            alt="Aspire | Manifest"
            className="w-48 md:w-64 mx-auto drop-shadow-2xl"
          />
        </motion.div>

        {/* Text content */}
        <motion.div
          variants={textRevealVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          <motion.h1
            variants={childVariants}
            className="text-5xl md:text-7xl font-display font-bold"
          >
            <span className="gradient-brand-text glow-text">Coming Soon</span>
          </motion.h1>

          <motion.p
            variants={childVariants}
            className="text-lg md:text-xl text-muted-foreground max-w-md mx-auto"
          >
            Chicago's newest streetwear brand is preparing something special. 
            Be the first to know when we launch.
          </motion.p>

          {/* Email signup form */}
          <motion.form
            variants={childVariants}
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mt-8"
          >
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-card/50 border-border/50 backdrop-blur-sm h-12 text-base"
              disabled={isSubmitting}
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              className="gradient-brand text-white font-semibold h-12 px-8 hover:opacity-90 transition-opacity"
            >
              {isSubmitting ? "Joining..." : "Notify Me"}
            </Button>
          </motion.form>

          <motion.p
            variants={childVariants}
            className="text-sm text-muted-foreground/70 mt-4"
          >
            No spam, just launch updates. Unsubscribe anytime.
          </motion.p>

          {/* Employee access section */}
          <motion.div variants={childVariants} className="mt-8 pt-6 border-t border-border/30">
            {!showPasswordInput ? (
              <button
                onClick={() => setShowPasswordInput(true)}
                className="inline-flex items-center gap-2 text-sm text-muted-foreground/50 hover:text-muted-foreground transition-colors"
              >
                <Lock className="w-4 h-4" />
                Employee Access
              </button>
            ) : (
              <form onSubmit={handlePasswordSubmit} className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto">
                <Input
                  type="password"
                  placeholder="Enter employee password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="flex-1 bg-card/50 border-border/50 backdrop-blur-sm h-10 text-sm"
                  autoFocus
                />
                <Button
                  type="submit"
                  variant="outline"
                  className="h-10 px-6 text-sm"
                >
                  Enter
                </Button>
              </form>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* Footer branding */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-4 left-0 right-0 text-center"
      >
        <p className="text-xs text-muted-foreground/40">
          Aspire | Manifest · Chicago, IL
        </p>
      </motion.div>
    </div>
  );
};

export default ComingSoon;
