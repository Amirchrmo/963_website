/**
 * Translation dictionaries for English (en) and Persian/Farsi (fa).
 * `Locale` drives both the displayed copy and the document direction (LTR/RTL).
 */
export type Locale = 'en' | 'fa';

export const locales: Locale[] = ['en', 'fa'];
export const defaultLocale: Locale = 'en';

export const localeMeta: Record<Locale, { label: string; dir: 'ltr' | 'rtl'; htmlLang: string }> = {
  en: { label: 'English', dir: 'ltr', htmlLang: 'en' },
  fa: { label: 'فارسی', dir: 'rtl', htmlLang: 'fa' },
};

/** A two-line philosophy / genesis point. */
export interface GenesisPoint {
  line1: string;
  line2: string;
}

/** A past event with bilingual (Persian-first) description. */
export interface PastEvent {
  title: string;
  name: string;
  faDesc: string;
  enDesc: string;
}

export interface Dictionary {
  nav: {
    home: string;
    about: string;
    events: string;
    gallery: string;
    products: string;
    sponsors: string;
    contact: string;
    cta: string;
  };
  common: {
    viewAll: string;
    learnMore: string;
    readMore: string;
    explore: string;
    register: string;
    buyNow: string;
    loading: string;
    back: string;
    close: string;
    next: string;
    prev: string;
    all: string;
    fullscreen: string;
    toggleTheme: string;
    toggleLang: string;
    menu: string;
    language: string;
    theme: string;
  };
  hero: {
    slides: { eyebrow: string; title: string; subtitle: string }[];
    scroll: string;
  };
  home: {
    introEyebrow: string;
    introTitle: string;
    introBody: string;
    statsTitle: string;
    stats: { value: string; label: string }[];
    eventsEyebrow: string;
    eventsTitle: string;
    /** The 2 events shown on the home page "Upcoming events" section. */
    homeEvents: {
      title: string;
      location: string;
      /** Optional — omitted cards hide the date row. */
      date?: string;
      /** Optional — omitted cards hide the distance. */
      distance?: string;
      /** Optional — omitted cards hide the status badge. */
      status?: string;
      desc: string;
    }[];
    champsEyebrow: string;
    champsTitle: string;
    productsEyebrow: string;
    productsTitle: string;
    sponsorsEyebrow: string;
    sponsorsTitle: string;
    galleryEyebrow: string;
    galleryTitle: string;
    testimonialsEyebrow: string;
    testimonialsTitle: string;
    testimonials: { quote: string; author: string; role: string }[];
    newsletterEyebrow: string;
    newsletterTitle: string;
    newsletterBody: string;
    newsletterPlaceholder: string;
    newsletterSubmit: string;
    newsletterSuccess: string;
  };
  about: {
    title: string;
    subtitle: string;
    /** Page hero eyebrow. */
    pageEyebrow: string;

    // Identity (formerly "Our roots" history section)
    identityEyebrow: string;
    identityTitle: string;
    identityLead: string;
    identityBody: string;

    // Shorabil Lake — bilingual (Persian first, English below)
    shorabilEyebrow: string;
    shorabilTitle: string;
    shorabilFa: string;
    shorabilEn: string;

    // Takhti Stadium — bilingual (Persian first, English below)
    takhtiEyebrow: string;
    takhtiTitle: string;
    takhtiFa: string;
    takhtiEn: string;

    // Genesis (formerly "How we train" philosophy)
    genesisEyebrow: string;
    genesisTitle: string;
    genesisPoints: GenesisPoint[];

    achievementsEyebrow: string;
    achievementsTitle: string;
    achievements: { title: string; desc: string }[];

    timelineEyebrow: string;
    timelineTitle: string;
    timeline: { year: string; title: string; desc: string }[];
  };
  events: {
    title: string;
    subtitle: string;
    upcomingEyebrow: string;
    upcomingTitle: string;
    pastEyebrow: string;
    pastTitle: string;
    registerCta: string;
    /** Past events rendered with bilingual descriptions + photo galleries. */
    pastEvents: PastEvent[];
  };
  gallery: {
    clubTitle: string;
    clubSubtitle: string;
    champTitle: string;
    champSubtitle: string;
    filterAll: string;
    filterRunning: string;
    filterTF: string;
    filterPortrait: string;
    filterLandscape: string;
    filterAction: string;
    layoutMasonry: string;
    layoutGrid: string;
  };
  products: {
    title: string;
    subtitle: string;
    categories: string[];
    featuredTitle: string;
    items: { name: string; category: string; price: string; desc: string }[];
  };
  sponsors: {
    title: string;
    subtitle: string;
    partnerTitle: string;
    partnerBody: string;
  };
  contact: {
    title: string;
    subtitle: string;
    formTitle: string;
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
    send: string;
    success: string;
    infoTitle: string;
    addressLabel: string;
    address: string;
    phoneLabel: string;
    emailLabel: string;
    hoursLabel: string;
    hours: string;
    followTitle: string;
  };
  footer: {
    tagline: string;
    quickLinks: string;
    explore: string;
    contactTitle: string;
    rights: string;
    newsletterLabel: string;
  };
}
