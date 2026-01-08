import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

type SortOption = "newest" | "price-asc" | "price-desc";

interface ProductFiltersProps {
  collections: string[];
  selectedCollection: string | null;
  onCollectionChange: (collection: string | null) => void;
  categories: string[];
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
}

const collectionNames: Record<string, string> = {
  "Founders": "Founders Series",
  "Hope": "Hope V1",
  "A | M": "A | M Essentials",
};

const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

export const ProductFilters = ({
  collections,
  selectedCollection,
  onCollectionChange,
  categories,
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
}: ProductFiltersProps) => {
  return (
    <div className="space-y-4 mb-8">
      {/* Collection Filters */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <span className="text-sm text-muted-foreground mr-2">Collection:</span>
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

      {/* Category Filters */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <span className="text-sm text-muted-foreground mr-2">Category:</span>
        <Button
          variant={selectedCategory === null ? "default" : "outline"}
          size="sm"
          onClick={() => onCategoryChange(null)}
          className={cn(
            "transition-all",
            selectedCategory === null && "bg-primary text-primary-foreground"
          )}
        >
          All
        </Button>
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => onCategoryChange(category)}
            className={cn(
              "transition-all",
              selectedCategory === category && "bg-primary text-primary-foreground"
            )}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Sort Dropdown */}
      <div className="flex items-center justify-center gap-2">
        <span className="text-sm text-muted-foreground">Sort by:</span>
        <Select value={sortBy} onValueChange={(value) => onSortChange(value as SortOption)}>
          <SelectTrigger className="w-[180px] bg-background">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-background z-50">
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
