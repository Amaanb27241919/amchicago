import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface ProductFiltersProps {
  collections: string[];
  selectedCollection: string | null;
  onCollectionChange: (collection: string | null) => void;
}

const collectionNames: Record<string, string> = {
  "Founders": "Founders Series",
  "Hope": "Hope V1",
  "A | M": "A | M Essentials",
};

export const ProductFilters = ({
  collections,
  selectedCollection,
  onCollectionChange,
}: ProductFiltersProps) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
      <Button
        variant={selectedCollection === null ? "default" : "outline"}
        size="sm"
        onClick={() => onCollectionChange(null)}
        className={cn(
          "transition-all",
          selectedCollection === null && "bg-primary text-primary-foreground"
        )}
      >
        All
      </Button>
      {collections.map((collection) => (
        <Button
          key={collection}
          variant={selectedCollection === collection ? "default" : "outline"}
          size="sm"
          onClick={() => onCollectionChange(collection)}
          className={cn(
            "transition-all",
            selectedCollection === collection && "bg-primary text-primary-foreground"
          )}
        >
          {collectionNames[collection] || collection}
        </Button>
      ))}
    </div>
  );
};
