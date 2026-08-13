'use client';

import { useI18n } from '@/components/providers/I18nProvider';
import { PageHero } from '@/components/layout/PageHero';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CTABanner } from '@/components/sections/CTABanner';
import { ProductCard } from '@/components/cards/ProductCard';
import { Reveal } from '@/components/animations/Reveal';
import { productImages, galleryImages } from '@/lib/images';

export default function ProductsPage() {
  const { dict } = useI18n();
  const p = dict.products;

  // Map product items to images cyclically.
  const items = p.items.map((item, i) => ({ ...item, image: productImages[i % productImages.length] }));
  const ctaImg = productImages[1] ?? productImages[0];

  return (
    <>
      <PageHero
        image={productImages[0] ?? galleryImages[0]}
        eyebrow={p.featuredTitle}
        title={p.title}
        subtitle={p.subtitle}
      />

      <section className="section">
        <div className="container">
          <SectionHeading eyebrow={p.featuredTitle} title={p.title} align="center" animated={false} className="mb-12" />

          {/* Product grid — 2 columns on mobile, up to 4 on large screens. */}
          <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
            {items.map((item, i) => (
              <Reveal key={item.name} direction="up" delay={Math.min(i * 0.06, 0.4)}>
                <ProductCard
                  image={item.image}
                  name={item.name}
                  price={item.price}
                  desc={item.desc}
                  buyLabel={dict.common.buyNow}
                  index={i}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        image={ctaImg}
        eyebrow={dict.nav.cta}
        title={p.subtitle}
        primary={{ label: dict.nav.contact, href: '/contact' }}
        secondary={{ label: dict.nav.about, href: '/about' }}
      />
    </>
  );
}
