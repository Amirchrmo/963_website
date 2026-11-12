/**
 * Image collections.
 *
 * Images are served directly from `/public` as static assets (plain `<img>`,
 * no `/_next/image` optimizer) — there are zero remote/network image requests
 * and zero per-request image processing. Each item keeps its declared aspect
 * ratio so layouts that rely on it (masonry columns, portrait/landscape filters,
 * CLS-free cards) keep their exact proportions.
 */

/** Legacy single-sample export — kept for compatibility (e.g. metadata). */
export const SAMPLE_IMAGE = '/images/gallery/IMG_2689.jpg';

export type GalleryCategory = 'running' | 'tf';

export interface ImageItem {
  id: string;
  full: string;
  thumb: string;
  width: number;
  height: number;
  ratio: number;
  thumbW: number;
  thumbH: number;
  /** Optional gallery category used by the club gallery filter. */
  category?: GalleryCategory;
}

interface RawAsset {
  file: string;
  width: number;
  height: number;
  /**
   * Set when a downscaled copy exists at `<folder>/thumbs/<file>`. Grids and
   * cards load the thumb; the lightbox / banners load the full image.
   */
  thumb?: { width: number; height: number };
}

interface CategorizedAsset extends RawAsset {
  category?: GalleryCategory;
}

function toItem(folder: string, { file, width, height, thumb, category }: CategorizedAsset): ImageItem {
  const src = `/images/${folder}/${file}`;
  return {
    id: file.replace(/\.[^.]+$/, ''),
    full: src,
    thumb: thumb ? `/images/${folder}/thumbs/${file}` : src,
    width,
    height,
    ratio: width / height,
    thumbW: thumb?.width ?? width,
    thumbH: thumb?.height ?? height,
    ...(category ? { category } : {}),
  };
}

/**
 * Build a typed collection of `ImageItem`s that resolve to their own real local
 * files under `/public/images/<folder>/...`. Dimensions/ratio are preserved for
 * layout.
 */
function local(folder: string, assets: RawAsset[]): ImageItem[] {
  return assets.map((asset) => toItem(folder, asset));
}

/**
 * Build a gallery collection where each item keeps its real local file AND its
 * filter category (running / track & field).
 */
function localGallery(folder: string, assets: CategorizedAsset[]): ImageItem[] {
  return assets.map((asset) => toItem(folder, asset));
}

// --- Gallery (club life / training / racing) -------------------------------
// `r` = "Running & Physical fitness", `t` = "T&F" (track & field).
export const galleryImages = localGallery('gallery', [
  { file: 'IMG_0159.jpg', width: 4032, height: 3024, category: 'running' },
  { file: 'IMG_0200.jpg', width: 4032, height: 3024, category: 'tf' },
  { file: 'IMG_0258.jpg', width: 4284, height: 5712, category: 'running' },
  { file: 'IMG_0263.jpg', width: 4284, height: 5712, category: 'running' },
  { file: 'IMG_0379.jpg', width: 3024, height: 4032, category: 'tf' },
  { file: 'IMG_0386.jpg', width: 4284, height: 5712, category: 'running' },
  { file: 'IMG_0491.jpg', width: 3024, height: 4032, category: 'tf' },
  { file: 'IMG_0876.jpg', width: 1024, height: 1536, category: 'running' },
  { file: 'IMG_1170.jpg', width: 4004, height: 5339, category: 'tf' },
  { file: 'IMG_1294.jpg', width: 3024, height: 4032, category: 'running' },
  { file: 'IMG_1320.jpg', width: 3024, height: 4032, category: 'tf' },
  { file: 'IMG_1481.jpg', width: 3024, height: 4032, category: 'running' },
  { file: 'IMG_1740.jpg', width: 4480, height: 6720, category: 'tf' },
  { file: 'IMG_1793.jpg', width: 3024, height: 4032, category: 'running' },
  { file: 'IMG_1794.jpg', width: 3024, height: 4032, category: 'running' },
  { file: 'IMG_2596.jpg', width: 4032, height: 3024, category: 'tf' },
  { file: 'IMG_2689.jpg', width: 3024, height: 4032, category: 'running' },
  { file: 'IMG_2992.jpg', width: 4284, height: 5712, category: 'tf' },
  { file: 'IMG_3004.jpg', width: 4284, height: 5712, category: 'running' },
  { file: 'IMG_3016.jpg', width: 3024, height: 4032, category: 'tf' },
  { file: 'IMG_3265.jpg', width: 4284, height: 5712, category: 'running' },
  { file: 'IMG_7303.jpg', width: 4284, height: 5712, category: 'tf' },
  { file: 'IMG_7817.jpg', width: 3024, height: 4032, category: 'running' },
  { file: 'IMG_7937.jpg', width: 3583, height: 2891, category: 'tf' },
  { file: 'IMG_8014.jpg', width: 3024, height: 4032, category: 'running' },
  { file: 'IMG_8386.jpg', width: 2268, height: 4032, category: 'tf' },
  { file: 'IMG_9063.jpg', width: 3024, height: 4032, category: 'running' },
  { file: 'IMG_9070.jpg', width: 4032, height: 3024, category: 'tf' },
  { file: 'IMG_9350.jpg', width: 3024, height: 4032, category: 'running' },
  { file: 'IMG_9422.jpg', width: 3024, height: 4032, category: 'tf' },
  { file: 'IMG_9741.jpg', width: 3024, height: 4032, category: 'running' },
  // Added 2026-11-12 (optimized: full <= 2048px + thumbs/).
  { file: 'IMG_5991.jpg', width: 1152, height: 2048, thumb: { width: 788, height: 1400 }, category: 'running' },
  { file: 'IMG_5988.jpg', width: 2048, height: 1152, thumb: { width: 1400, height: 788 }, category: 'running' },
  { file: 'IMG_5989.jpg', width: 1152, height: 2048, thumb: { width: 788, height: 1400 }, category: 'running' },
  { file: 'IMG_5986.jpg', width: 1536, height: 2048, thumb: { width: 800, height: 1067 }, category: 'running' },
  { file: 'IMG_5318.jpg', width: 1348, height: 2048, thumb: { width: 800, height: 1215 }, category: 'running' },
  { file: 'IMG_5987.jpg', width: 1152, height: 2048, thumb: { width: 788, height: 1400 }, category: 'running' },
  { file: 'IMG_5990.jpg', width: 1536, height: 2048, thumb: { width: 800, height: 1067 }, category: 'running' },
  { file: 'IMG_5985.jpg', width: 1536, height: 2048, thumb: { width: 800, height: 1067 }, category: 'running' },
  { file: 'IMG_5996.jpg', width: 1922, height: 2048, thumb: { width: 800, height: 852 }, category: 'running' },
  { file: 'IMG_5995.jpg', width: 1726, height: 2048, thumb: { width: 800, height: 949 }, category: 'running' },
  { file: 'IMG_5994.jpg', width: 1170, height: 1555, thumb: { width: 800, height: 1063 }, category: 'running' },
  { file: 'IMG_6001.jpg', width: 1536, height: 2048, thumb: { width: 800, height: 1067 }, category: 'running' },
  { file: 'IMG_6003.jpg', width: 1536, height: 2048, thumb: { width: 800, height: 1067 }, category: 'running' },
  { file: 'IMG_6009.jpg', width: 2048, height: 1152, thumb: { width: 1400, height: 788 }, category: 'running' },
  { file: 'IMG_6010.jpg', width: 1536, height: 2048, thumb: { width: 800, height: 1067 }, category: 'running' },
  { file: 'IMG_6011.jpg', width: 1536, height: 2048, thumb: { width: 800, height: 1067 }, category: 'running' },
]);

// --- Champions / podium gallery -------------------------------------------
export const galleryChampImages = local('champ', [
  { file: 'IMG_0589.jpg', width: 4032, height: 3024 },
  { file: 'IMG_1011.jpg', width: 3024, height: 4032 },
  { file: 'IMG_1339.jpg', width: 2560, height: 1920 },
  { file: 'IMG_1341.jpg', width: 4284, height: 5712 },
  { file: 'IMG_1470.jpg', width: 4032, height: 3024 },
  { file: 'IMG_1513.jpg', width: 3024, height: 4032 },
  { file: 'IMG_1565.jpg', width: 4032, height: 3024 },
  { file: 'IMG_1593.jpg', width: 3024, height: 4032 },
  { file: 'IMG_6322.jpg', width: 4284, height: 5712 },
  { file: 'IMG_9035.jpg', width: 3024, height: 4032 },
  { file: 'IMG_9144.jpg', width: 2171, height: 3859 },
  { file: 'IMG_9769.jpg', width: 4032, height: 3024 },
  { file: 'IMG_3130.jpg', width: 1037, height: 1348, thumb: { width: 800, height: 1040 } },
  { file: 'IMG_5993.jpg', width: 1072, height: 1714, thumb: { width: 800, height: 1279 } },
]);

// --- Products --------------------------------------------------------------
export const productImages = local('products', [
  { file: 'IMG_1060.jpg', width: 1254, height: 1254 },
  { file: 'IMG_1061.jpg', width: 1254, height: 1254 },
  { file: 'IMG_1062.jpg', width: 1254, height: 1254 },
  { file: 'IMG_1063.jpg', width: 1254, height: 1254 },
]);

// --- Events ----------------------------------------------------------------
// General event images (used for hero banners / card imagery).
export const eventImages = local('events', [
  { file: 'IMG_0616.jpg', width: 5712, height: 4284 },
  { file: 'IMG_0665.jpg', width: 4284, height: 5712 },
  { file: 'IMG_0696.jpg', width: 3024, height: 4032 },
  { file: 'IMG_0711.jpg', width: 3024, height: 4636 },
  { file: 'IMG_8950.jpg', width: 6720, height: 4480 },
  { file: 'IMG_8954.jpg', width: 6720, height: 4480 },
  { file: 'IMG_8999.jpg', width: 4480, height: 6720 },
  { file: 'IMG_9002.jpg', width: 4475, height: 2517 },
  { file: 'IMG_9003.jpg', width: 6720, height: 4480 },
  { file: 'IMG_9007.jpg', width: 6720, height: 4480 },
  { file: 'IMG_9016.jpg', width: 6720, height: 4480 },
  { file: 'IMG_9017.jpg', width: 4480, height: 6720 },
]);

/** Upcoming event — WALK&TALK: card poster + photo rows shown inside the card. */
export const [walkTalkCover] = local('events/walk-talk', [
  { file: 'IMG_4732.jpg', width: 1280, height: 1600 },
]);
const walkTalkPhotos = local('events/walk-talk', [
  { file: 'IMG_5181.jpg', width: 1179, height: 1557, thumb: { width: 800, height: 1056 } },
  { file: 'IMG_5999.jpg', width: 1993, height: 2048, thumb: { width: 800, height: 822 } },
  { file: 'IMG_5998.jpg', width: 1638, height: 2048, thumb: { width: 800, height: 1000 } },
  { file: 'IMG_5997.jpg', width: 1536, height: 2048, thumb: { width: 800, height: 1067 } },
  { file: 'IMG_6004.jpg', width: 1638, height: 2048, thumb: { width: 800, height: 1000 } },
  { file: 'IMG_6002.jpg', width: 1749, height: 2048, thumb: { width: 800, height: 937 } },
]);
/** Rows of 2 then 4 photos. */
export const walkTalkPhotoRows = [walkTalkPhotos.slice(0, 2), walkTalkPhotos.slice(2)];

/** Past event #1 — CaveRun (Kanzagh Village). ~10 photos. */
export const caveRunImages = local('events', [
  { file: 'IMG_0753.jpg', width: 1706, height: 2560 },
  { file: 'IMG_0757.jpg', width: 1706, height: 2560 },
  { file: 'IMG_0758.jpg', width: 1706, height: 2560 },
  { file: 'IMG_0759.jpg', width: 1706, height: 2560 },
  { file: 'IMG_0760.jpg', width: 1706, height: 2560 },
  { file: 'IMG_0763.jpg', width: 1706, height: 2560 },
  { file: 'IMG_0765.jpg', width: 1706, height: 2560 },
  { file: 'IMG_0766.jpg', width: 1706, height: 2560 },
  { file: 'IMG_0773.jpg', width: 1706, height: 2560 },
  { file: 'IMG_0774.jpg', width: 1706, height: 2560 },
  { file: 'IMG_0776.jpg', width: 1706, height: 2560 },
]);

/** Past event #2 — CoffeeRun (Fandoghlo Forest). ~10 photos. */
export const coffeeRunImages = local('events', [
  { file: 'IMG_0616.jpg', width: 5712, height: 4284 },
  { file: 'IMG_0665.jpg', width: 4284, height: 5712 },
  { file: 'IMG_0696.jpg', width: 3024, height: 4032 },
  { file: 'IMG_0711.jpg', width: 3024, height: 4636 },
  { file: 'IMG_8950.jpg', width: 6720, height: 4480 },
  { file: 'IMG_8954.jpg', width: 6720, height: 4480 },
  { file: 'IMG_8999.jpg', width: 4480, height: 6720 },
  { file: 'IMG_9002.jpg', width: 4475, height: 2517 },
  { file: 'IMG_9003.jpg', width: 6720, height: 4480 },
  { file: 'IMG_9007.jpg', width: 6720, height: 4480 },
  { file: 'IMG_9016.jpg', width: 6720, height: 4480 },
  { file: 'IMG_9017.jpg', width: 4480, height: 6720 },
]);

/** Past event #3 — Night Run + Coffee (Shorabil, 9pm). */
export const nightRunImages = local('events/night-run', [
  { file: 'IMG_4086.jpg', width: 1152, height: 2048, thumb: { width: 788, height: 1400 } },
  { file: 'IMG_4084.jpg', width: 1536, height: 2048, thumb: { width: 800, height: 1067 } },
  { file: 'IMG_3912.jpg', width: 2048, height: 1536, thumb: { width: 1067, height: 800 } },
  { file: 'IMG_3905.jpg', width: 2048, height: 1365, thumb: { width: 1200, height: 800 } },
  { file: 'IMG_3906.jpg', width: 2048, height: 1365, thumb: { width: 1200, height: 800 } },
  { file: 'IMG_3904.jpg', width: 2048, height: 1365, thumb: { width: 1200, height: 800 } },
  { file: 'IMG_4035.jpg', width: 2048, height: 1365, thumb: { width: 1200, height: 800 } },
  { file: 'IMG_4036.jpg', width: 2048, height: 1365, thumb: { width: 1200, height: 800 } },
  { file: 'IMG_5992.jpg', width: 1536, height: 2048, thumb: { width: 800, height: 1067 } },
  { file: 'IMG_6005.jpg', width: 1536, height: 2048, thumb: { width: 800, height: 1067 } },
  { file: 'IMG_6006.jpg', width: 1536, height: 2048, thumb: { width: 800, height: 1067 } },
  { file: 'IMG_6007.jpg', width: 1536, height: 2048, thumb: { width: 800, height: 1067 } },
  { file: 'IMG_6008.jpg', width: 2048, height: 1536, thumb: { width: 1067, height: 800 } },
]);

/** Header (poster) images for the past events, in `dict.events.pastEvents` order. */
export const pastEventCovers = [
  // CaveRun — first photo of its gallery.
  caveRunImages[0],
  // CoffeeRun — event poster.
  ...local('events', [{ file: 'IMG_0610.jpg', width: 1001, height: 1334 }]),
  // Night Run + Coffee — event poster.
  ...local('events/night-run', [{ file: 'IMG_3653.jpg', width: 1280, height: 1600 }]),
];

// --- Logos -----------------------------------------------------------------
export const logoImages = local('logos', [
  { file: 'logo-main-black.PNG', width: 1024, height: 1024 },
  { file: 'logo-main-white.PNG', width: 1024, height: 1024 },
]);

/** Indexed access to the two themed logo marks used by the Header/Footer. */
export const logoBlack = logoImages.find((l) => l.id === 'logo-main-black')!;
export const logoWhite = logoImages.find((l) => l.id === 'logo-main-white')!;

/** Strava logo (used in the footer social row). */
export const stravaLogo = {
  src: '/images/logos/strava.png',
  width: 900,
  height: 800,
};

// --- Sponsors --------------------------------------------------------------
export const sponsorImages = local('sponsors', [
  { file: 'bergeerd.png', width: 3355, height: 3076 },
  { file: 'comode.png', width: 1468, height: 928 },
  { file: 'fam.PNG', width: 2363, height: 2363 },
  { file: 'sara.PNG', width: 3724, height: 2050 },
  { file: 'shayan.PNG', width: 1600, height: 1645 },
  { file: 'zirvah.PNG', width: 1181, height: 1181 },
]);

/** Friendly labels + Instagram handles for each sponsor logo. */
const sponsorMeta = [
  { name: 'Bergeerd', instagram: 'https://instagram.com/bergeerd' },
  { name: 'Comode', instagram: 'https://instagram.com/comode.concept' },
  { name: 'FAM Space', instagram: 'https://instagram.com/famspace.co' },
  { name: "Sara's English Corner", instagram: 'https://instagram.com/sarasenglishcorner' },
  { name: 'Shayan realestate', instagram: 'https://instagram.com/realestate_shayan_ard' },
  { name: 'Zirvah', instagram: 'https://instagram.com/zirvah_basketballclub' },
];

/** Map sponsor logos to friendly labels + Instagram links used in the sponsor wall / marquee. */
export const sponsors = sponsorImages.map((img, i) => ({
  ...img,
  name: sponsorMeta[i]?.name ?? `Partner ${i + 1}`,
  instagram: sponsorMeta[i]?.instagram ?? '#',
}));

// --- Home page: hero slider -------------------------------------------------
/** 5 hero backgrounds for the home page main slider. */
export const heroSliderImages = local('home_section_1', [
  { file: 'home_1.jpg', width: 1920, height: 1080 },
  { file: 'home_2.jpg', width: 1920, height: 1080 },
  { file: 'home_3.jpg', width: 1920, height: 1080 },
  { file: 'home_4.jpg', width: 1920, height: 1080 },
  { file: 'home_5.jpg', width: 1920, height: 1080 },
]);

/** 3 images for the "More than a club — a movement" intro collage. */
export const introCollageImages = local('home_section_2', [
  { file: '1.jpg', width: 1080, height: 1350 },
  { file: '2.jpg', width: 1080, height: 1350 },
  { file: '3.jpg', width: 1080, height: 1350 },
]);
