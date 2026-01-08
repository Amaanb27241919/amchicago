import { useEffect } from 'react';

interface PageMetaOptions {
  title: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  canonicalPath?: string;
}

/**
 * Hook to dynamically update page meta tags for SEO
 */
export const usePageMeta = ({
  title,
  description,
  keywords,
  ogImage,
  canonicalPath,
}: PageMetaOptions) => {
  useEffect(() => {
    // Update title
    const fullTitle = `${title} | A | M Chicago`;
    document.title = fullTitle;

    // Update meta description
    if (description) {
      const metaDesc = document.querySelector('meta[name="description"]');
      const ogDesc = document.querySelector('meta[property="og:description"]');
      const twitterDesc = document.querySelector('meta[name="twitter:description"]');
      
      if (metaDesc) metaDesc.setAttribute('content', description);
      if (ogDesc) ogDesc.setAttribute('content', description);
      if (twitterDesc) twitterDesc.setAttribute('content', description);
    }

    // Update meta keywords
    if (keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute('content', keywords);
    }

    // Update og:title and twitter:title
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (ogTitle) ogTitle.setAttribute('content', fullTitle);
    if (twitterTitle) twitterTitle.setAttribute('content', fullTitle);

    // Update og:image if provided
    if (ogImage) {
      const ogImageMeta = document.querySelector('meta[property="og:image"]');
      const twitterImage = document.querySelector('meta[name="twitter:image"]');
      if (ogImageMeta) ogImageMeta.setAttribute('content', ogImage);
      if (twitterImage) twitterImage.setAttribute('content', ogImage);
    }

    // Update canonical URL
    if (canonicalPath) {
      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', `https://amchicago.com${canonicalPath}`);
    }

    // Cleanup - restore defaults on unmount
    return () => {
      document.title = 'A | M Chicago – Premium Streetwear | Aspire & Manifest';
    };
  }, [title, description, keywords, ogImage, canonicalPath]);
};
