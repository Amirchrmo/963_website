'use client';

import { useI18n } from '@/components/providers/I18nProvider';
import { PageHero } from '@/components/layout/PageHero';
import { MasonryGallery } from '@/components/gallery/MasonryGallery';
import { CTABanner } from '@/components/sections/CTABanner';
import { galleryChampImages, galleryImages } from '@/lib/images';

export default function ChampionsGalleryPage() {
  const { dict } = useI18n();
  const g = dict.gallery;

  return (
    <>
      <PageHero
        image={galleryChampImages[0]}
        eyebrow={g.champTitle}
        title={g.champTitle}
        subtitle={g.champSubtitle}
      />

      <section className="section">
        <div className="container">
          <MasonryGallery images={galleryChampImages} columns={4} showControls idPrefix="champ" />
        </div>
      </section>

      <CTABanner
        image={galleryImages[6] ?? galleryImages[0]}
        eyebrow={g.clubTitle}
        title={g.clubTitle}
        body={g.clubSubtitle}
        primary={{ label: g.clubTitle, href: '/gallery' }}
        secondary={{ label: dict.nav.about, href: '/about' }}
      />
    </>
  );
}
