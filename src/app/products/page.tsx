'use client';

import { useState } from 'react';
import { useI18n } from '@/components/providers/I18nProvider';
import { PageHero } from '@/components/layout/PageHero';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CTABanner } from '@/components/sections/CTABanner';
import { ProductCard } from '@/components/cards/ProductCard';
import { motion } from 'framer-motion';
import { productImages, galleryImages } from '@/lib/images';

export default function ProductsPage() {
  const { dict } = useI18n();
  const p = dict.products;
  // Index-based tab state — locale-independent, so switching language never
  // breaks the active tab. Index 0 is always the "All" category.
  const [activeIdx, setActiveIdx] = useState(0);
  const categories = p.categories;

  // Map product items to images cyclically.
  const items = p.items.map((item, i) => ({ ...item, image: productImages[i % productImages.length] }));
  const activeCategory = categories[activeIdx] ?? categories[0];
  const visible = items.map((it) => activeIdx === 0 || it.category === activeCategory);
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
          <div className="mb-12 flex flex-col gap-8">
            <SectionHeading eyebrow={p.featuredTitle} title={p.title} align="center" animated={false} />
            {/* Category filter — stable layoutId scoped to this page */}
            <div className="flex flex-wrap justify-center gap-1.5">
              {categories.map((cat, idx) => {
                const isActive = activeIdx === idx;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveIdx(idx)}
                    aria-pressed={isActive}
                    aria-current={isActive ? 'true' : undefined}
                    className={`relative isolate rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
                      isActive
                        ? 'text-ink-950 dark:text-white'
                        : 'text-ink-500 hover:text-ink-900 dark:text-ink-400 dark:hover:text-white'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="product-filter-bg"
                        className="absolute inset-0 -z-10 rounded-full bg-ink-900/10 ring-1 ring-ink-900/10 dark:bg-white/15 dark:ring-white/10"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Cards stay mounted so category switching is instant. */}
          <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
            {items.map((item, i) => {
              const isVisible = visible[i];
              return (
                <div
                  key={item.name}
                  data-visible={isVisible}
                  className={`transition-[opacity,transform,filter] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
                    isVisible
                      ? 'pointer-events-auto block scale-100 opacity-100'
                      : 'pointer-events-none hidden scale-95 opacity-0'
                  }`}
                  aria-hidden={!isVisible}
                >
                  <ProductCard
                    image={item.image}
                    name={item.name}
                    category={item.category}
                    price={item.price}
                    desc={item.desc}
                    buyLabel={dict.common.buyNow}
                    index={i}
                  />
                </div>
              );
            })}
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
