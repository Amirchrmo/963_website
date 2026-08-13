'use client';

import { useI18n } from '@/components/providers/I18nProvider';
import { PageHero } from '@/components/layout/PageHero';
import { MasonryGallery } from '@/components/gallery/MasonryGallery';
import { CTABanner } from '@/components/sections/CTABanner';
import { galleryImages, galleryChampImages } from '@/lib/images';

export default function ClubGalleryPage() {
  const { dict } = useI18n();
  const g = dict.gallery;

  return (
    <>
      <PageHero
        image={galleryImages[0]}
        eyebrow={g.clubTitle}
        title={g.clubTitle}
        subtitle={g.clubSubtitle}
      />

      <section className="section">
        <div className="container">
          <MasonryGallery
            images={galleryImages}
            columns={3}
            showControls
            idPrefix="club"
            filterMode="category"
          />
        </div>
      </section>

      <CTABanner
        image={galleryChampImages[0] ?? galleryImages[10]}
        eyebrow={g.champTitle}
        title={g.champTitle}
        body={g.champSubtitle}
        primary={{ label: g.champTitle, href: '/gallery/champions' }}
        secondary={{ label: dict.nav.events, href: '/events' }}
      />
    </>
  );
}
