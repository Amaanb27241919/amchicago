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
  selectedCollections: string[];
  onCollectionChange: (collections: string[]) => void;
  categories: string[];
  selectedCategories: string[];
  onCategoryChange: (categories: string[]) => void;
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
  selectedCollections,
  onCollectionChange,
  categories,
  selectedCategories,
  onCategoryChange,
  sortBy,
  onSortChange,
}: ProductFiltersProps) => {
  const toggleCollection = (collection: string) => {
    if (selectedCollections.includes(collection)) {
      onCollectionChange(selectedCollections.filter(c => c !== collection));
    } else {
      onCollectionChange([...selectedCollections, collection]);
    }
  };

  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      onCategoryChange(selectedCategories.filter(c => c !== category));
    } else {
      onCategoryChange([...selectedCategories, category]);
    }
  };

  return (
    <div className="space-y-4 mb-8">
      {/* Collection Filters */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <span className="text-sm text-muted-foreground mr-2">Collection:</span>
        <Button
          variant={selectedCollections.length === 0 ? "default" : "outline"}
          size="sm"
          onClick={() => onCollectionChange([])}
          className={cn(
            "transition-all",
            selectedCollections.length === 0 && "bg-primary text-primary-foreground"
          )}
        >
          All
        </Button>
        {collections.map((collection) => (
          <Button
            key={collection}
            variant={selectedCollections.includes(collection) ? "default" : "outline"}
            size="sm"
            onClick={() => toggleCollection(collection)}
            className={cn(
              "transition-all",
              selectedCollections.includes(collection) && "bg-primary text-primary-foreground"
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
          variant={selectedCategories.length === 0 ? "default" : "outline"}
          size="sm"
          onClick={() => onCategoryChange([])}
          className={cn(
            "transition-all",
            selectedCategories.length === 0 && "bg-primary text-primary-foreground"
          )}
        >
          All
        </Button>
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategories.includes(category) ? "default" : "outline"}
            size="sm"
            onClick={() => toggleCategory(category)}
            className={cn(
              "transition-all",
              selectedCategories.includes(category) && "bg-primary text-primary-foreground"
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
