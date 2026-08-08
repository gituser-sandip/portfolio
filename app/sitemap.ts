import type { MetadataRoute } from 'next';
import { projects, site } from '@/content/portfolio';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date('2026-08-08');

  return [
    {
      url: site.url,
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...projects.map((project) => ({
      url: site.url + '/case-studies/' + project.slug,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];
}
