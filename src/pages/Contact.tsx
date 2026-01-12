import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { usePageMeta } from "@/hooks/usePageMeta";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Mail, Phone, Instagram, Linkedin, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { logError } from "@/lib/logger";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  subject: z.string().trim().max(200, "Subject must be less than 200 characters").optional(),
  message: z.string().trim().min(1, "Message is required").max(2000, "Message must be less than 2000 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const Contact = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});

  usePageMeta({
    title: "Contact Us",
    description: "Get in touch with A | M Chicago. We'd love to hear from you.",
    canonicalPath: "/contact",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validate form data
    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as keyof ContactFormData] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await supabase.functions.invoke("submit-contact", {
        body: {
          name: result.data.name,
          email: result.data.email,
          subject: result.data.subject || null,
          message: result.data.message,
        },
      });

      if (response.error) {
        throw new Error(response.error.message || "Failed to send message");
      }

      const data = response.data;

      if (data?.error) {
        if (data.error.includes("Too many requests")) {
          toast.error("Please wait a few minutes before sending another message");
        } else {
          throw new Error(data.error);
        }
      } else {
        toast.success("Message sent! We'll get back to you soon.");
        setFormData({ name: "", email: "", subject: "", message: "" });
      }
    } catch (error) {
      logError("Contact form error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CartDrawer />

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl sm:text-5xl font-semibold mb-4 gradient-brand-text">
              Get in Touch
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have a question, feedback, or just want to say hello? We'd love to hear from you.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Info */}
            <div>
              <h2 className="font-display text-2xl font-semibold mb-6">Contact Information</h2>
              
              <div className="space-y-6 mb-10">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Location</h3>
                    <p className="text-muted-foreground">Chicago, IL</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Email</h3>
                    <a
                      href="mailto:support@amthreads.shop"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      support@amthreads.shop
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Phone</h3>
                    <p className="text-muted-foreground">(312) 555-0123</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-4">Follow Us</h3>
                <div className="flex gap-3">
                  <a
                    href="https://www.instagram.com/amthreads_chicago"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full border-border hover:border-primary hover:text-primary"
                    >
                      <Instagram className="h-5 w-5" />
                    </Button>
                  </a>
                  <a
                    href="https://www.linkedin.com/company/a-m-chicago/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full border-border hover:border-primary hover:text-primary"
                    >
                      <Linkedin className="h-5 w-5" />
                    </Button>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-card p-6 sm:p-8 rounded-xl border border-border">
              <h2 className="font-display text-2xl font-semibold mb-6">Send a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="mt-1.5 bg-secondary border-border"
                      disabled={isSubmitting}
                    />
                    {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="mt-1.5 bg-secondary border-border"
                      disabled={isSubmitting}
                    />
                    {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What's this about?"
                    className="mt-1.5 bg-secondary border-border"
                    disabled={isSubmitting}
                  />
                  {errors.subject && <p className="text-sm text-destructive mt-1">{errors.subject}</p>}
                </div>

                <div>
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message..."
                    rows={5}
                    className="mt-1.5 bg-secondary border-border resize-none"
                    disabled={isSubmitting}
                  />
                  {errors.message && <p className="text-sm text-destructive mt-1">{errors.message}</p>}
                </div>

                <Button
                  type="submit"
                  className="w-full gradient-brand text-primary-foreground font-semibold glow-brand"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
