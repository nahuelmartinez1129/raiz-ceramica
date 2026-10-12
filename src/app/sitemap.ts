import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { products } from "@/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.replace(/\/$/, "");
  const pages = ["", "/catalogo", "/nuestra-historia"].map((path) => ({
    url: `${base}${path}`,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));
  const productPages = products.map((product) => ({
    url: `${base}/productos/${product.id}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));
  return [...pages, ...productPages];
}
