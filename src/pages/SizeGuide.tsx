import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePageMeta } from "@/hooks/usePageMeta";

const hoodiesSizes = [
  { size: "S", chest: "26.0", length: "27.6", shoulder: "25.6", sleeve: "21.1" },
  { size: "M", chest: "26.8", length: "28.3", shoulder: "26.4", sleeve: "21.5" },
  { size: "L", chest: "27.6", length: "29.1", shoulder: "27.2", sleeve: "21.9" },
  { size: "XL", chest: "28.3", length: "29.9", shoulder: "28.0", sleeve: "22.2" },
  { size: "2XL", chest: "29.1", length: "30.7", shoulder: "28.7", sleeve: "22.6" },
];

const tshirtSizes = [
  { size: "S", chest: "19.7", length: "27.6", shoulder: "17.3" },
  { size: "M", chest: "20.5", length: "28.3", shoulder: "18.1" },
  { size: "L", chest: "21.3", length: "29.1", shoulder: "18.9" },
  { size: "XL", chest: "22.0", length: "29.9", shoulder: "19.7" },
  { size: "2XL", chest: "22.8", length: "30.7", shoulder: "20.5" },
];

const joggerSizes = [
  { size: "S", waist: "26-28", hip: "38", inseam: "29", leg: "10.6" },
  { size: "M", waist: "28-30", hip: "40", inseam: "30", leg: "11.0" },
  { size: "L", waist: "30-32", hip: "42", inseam: "31", leg: "11.4" },
  { size: "XL", waist: "32-34", hip: "44", inseam: "32", leg: "11.8" },
  { size: "2XL", waist: "34-36", hip: "46", inseam: "33", leg: "12.2" },
];

const SizeGuide = () => {
  usePageMeta({
    title: "Size Guide",
    description: "Find your perfect fit with our comprehensive size guide for hoodies, t-shirts, and joggers. All measurements in inches.",
    keywords: "size guide, clothing measurements, hoodie sizes, t-shirt sizes, jogger sizes, streetwear fit",
    canonicalPath: "/size-guide",
  });
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CartDrawer />
      <main className="pt-24 sm:pt-32 pb-20">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <span className="text-sm tracking-[0.3em] uppercase text-primary mb-2 block">
              Fit Guide
            </span>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold mb-4">
              Size Guide
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Find your perfect fit. All measurements are in inches. For the best fit, 
              measure a similar garment you already own and compare.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-4xl mx-auto"
          >
            <Tabs defaultValue="hoodies" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="hoodies">Hoodies & Crews</TabsTrigger>
                <TabsTrigger value="tshirts">T-Shirts</TabsTrigger>
                <TabsTrigger value="joggers">Joggers</TabsTrigger>
              </TabsList>
              
              <TabsContent value="hoodies">
                <div className="bg-card rounded-lg border border-border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-secondary/50">
                        <TableHead className="font-semibold">Size</TableHead>
                        <TableHead className="font-semibold">Chest (in)</TableHead>
                        <TableHead className="font-semibold">Length (in)</TableHead>
                        <TableHead className="font-semibold">Shoulder (in)</TableHead>
                        <TableHead className="font-semibold">Sleeve (in)</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {hoodiesSizes.map((row) => (
                        <TableRow key={row.size}>
                          <TableCell className="font-medium">{row.size}</TableCell>
                          <TableCell>{row.chest}</TableCell>
                          <TableCell>{row.length}</TableCell>
                          <TableCell>{row.shoulder}</TableCell>
                          <TableCell>{row.sleeve}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
              
              <TabsContent value="tshirts">
                <div className="bg-card rounded-lg border border-border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-secondary/50">
                        <TableHead className="font-semibold">Size</TableHead>
                        <TableHead className="font-semibold">Chest (in)</TableHead>
                        <TableHead className="font-semibold">Length (in)</TableHead>
                        <TableHead className="font-semibold">Shoulder (in)</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {tshirtSizes.map((row) => (
                        <TableRow key={row.size}>
                          <TableCell className="font-medium">{row.size}</TableCell>
                          <TableCell>{row.chest}</TableCell>
                          <TableCell>{row.length}</TableCell>
                          <TableCell>{row.shoulder}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
              
              <TabsContent value="joggers">
                <div className="bg-card rounded-lg border border-border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-secondary/50">
                        <TableHead className="font-semibold">Size</TableHead>
                        <TableHead className="font-semibold">Waist (in)</TableHead>
                        <TableHead className="font-semibold">Hip (in)</TableHead>
                        <TableHead className="font-semibold">Inseam (in)</TableHead>
                        <TableHead className="font-semibold">Leg Opening (in)</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {joggerSizes.map((row) => (
                        <TableRow key={row.size}>
                          <TableCell className="font-medium">{row.size}</TableCell>
                          <TableCell>{row.waist}</TableCell>
                          <TableCell>{row.hip}</TableCell>
                          <TableCell>{row.inseam}</TableCell>
                          <TableCell>{row.leg}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </Tabs>

            {/* How to Measure */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-12 bg-card rounded-lg border border-border p-6 sm:p-8"
            >
              <h2 className="font-display text-xl sm:text-2xl font-semibold mb-6">
                How to Measure
              </h2>
              <div className="grid sm:grid-cols-2 gap-6 text-sm">
                <div>
                  <h3 className="font-semibold mb-2">Chest</h3>
                  <p className="text-muted-foreground">
                    Measure across the chest from armpit to armpit while the garment is laid flat.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Length</h3>
                  <p className="text-muted-foreground">
                    Measure from the highest point of the shoulder to the bottom hem.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Shoulder</h3>
                  <p className="text-muted-foreground">
                    Measure from shoulder seam to shoulder seam across the back.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Sleeve</h3>
                  <p className="text-muted-foreground">
                    Measure from shoulder seam to the end of the cuff.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Fit Tips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 p-6 bg-secondary/50 rounded-lg"
            >
              <h3 className="font-semibold mb-3">💡 Fit Tips</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Our hoodies and crews have a relaxed, oversized fit</li>
                <li>• For a more fitted look, consider sizing down</li>
                <li>• T-shirts are true to size with a comfortable regular fit</li>
                <li>• Joggers feature an elastic waist with adjustable drawstring</li>
                <li>• When in doubt, reach out to us at am.threads.chicago@gmail.com</li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SizeGuide;