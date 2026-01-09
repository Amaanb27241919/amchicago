import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "am_wishlist";

interface WishlistItem {
  handle: string;
  title: string;
  image: string;
  price: string;
}

export const useWishlist = () => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setWishlist(JSON.parse(stored));
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  const addToWishlist = useCallback((item: WishlistItem) => {
    setWishlist((prev) => {
      if (prev.some((p) => p.handle === item.handle)) return prev;
      const updated = [...prev, item];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const removeFromWishlist = useCallback((handle: string) => {
    setWishlist((prev) => {
      const updated = prev.filter((p) => p.handle !== handle);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const isInWishlist = useCallback(
    (handle: string) => wishlist.some((p) => p.handle === handle),
    [wishlist]
  );

  const toggleWishlist = useCallback(
    (item: WishlistItem) => {
      if (isInWishlist(item.handle)) {
        removeFromWishlist(item.handle);
      } else {
        addToWishlist(item);
      }
    },
    [addToWishlist, removeFromWishlist, isInWishlist]
  );

  const clearWishlist = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setWishlist([]);
  }, []);

  return {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    toggleWishlist,
    clearWishlist,
  };
};
