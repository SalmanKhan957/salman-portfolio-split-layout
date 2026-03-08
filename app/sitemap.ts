import type { MetadataRoute } from "next";
import { SITE, PROJECTS } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.seo.siteUrl.replace(/\/$/, "");

    const staticRoutes = [
    "",
    "/projects"
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date()
  }));

  const projectRoutes = PROJECTS.map((p) => ({
    url: `${base}/projects/${p.slug}`,
    lastModified: new Date()
  }));

  return [...staticRoutes, ...projectRoutes];
}
