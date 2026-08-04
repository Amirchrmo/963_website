/**
 * Image collections.
 *
 * For local development, preview and build performance we serve a *single*
 * sample image (`/public/images/IMG_2689.jpg`) for every slot. The per-item
 * `width` / `height` are preserved so layouts that rely on aspect-ratio
 * (masonry columns, portrait/landscape filters, CLS-free cards) keep their
 * exact proportions — only the underlying source file is unified.
 *
 * Images are served directly from `/public` as static assets (plain `<img>`,
 * no `/_next/image` optimizer) — there are zero remote/network image requests
 * and zero per-request image processing.
 */

/** The one local sample image used for every image slot. */
export const SAMPLE_IMAGE = '/images/IMG_2689.jpg';

export interface ImageItem {
  id: string;
  full: string;
  thumb: string;
  width: number;
  height: number;
  ratio: number;
  thumbW: number;
  thumbH: number;
}

interface RawAsset {
  file: string;
  width: number;
  height: number;
}

/**
 * Build a typed collection of `ImageItem`s. `full` and `thumb` always resolve
 * to {@link SAMPLE_IMAGE} (a single local file), while `width` / `height` /
 * `ratio` / `thumb*` keep each item's declared aspect ratio for layout.
 */
function build(folder: string, assets: RawAsset[]): ImageItem[] {
  return assets.map(({ file, width, height }) => ({
    id: file.replace(/\.[^.]+$/, ''),
    full: SAMPLE_IMAGE,
    thumb: SAMPLE_IMAGE,
    width,
    height,
    ratio: width / height,
    thumbW: width,
    thumbH: height,
  }));
}

// --- Gallery (club life / training / racing) -------------------------------
export const galleryImages = build('gallery', [
  { file: 'IMG_0159.jpg', width: 4032, height: 3024 },
  { file: 'IMG_0200.jpg', width: 4032, height: 3024 },
  { file: 'IMG_0258.jpg', width: 4284, height: 5712 },
  { file: 'IMG_0263.jpg', width: 4284, height: 5712 },
  { file: 'IMG_0379.jpg', width: 3024, height: 4032 },
  { file: 'IMG_0386.jpg', width: 4284, height: 5712 },
  { file: 'IMG_0491.jpg', width: 3024, height: 4032 },
  { file: 'IMG_0621.jpg', width: 3024, height: 4032 },
  { file: 'IMG_0876.jpg', width: 1024, height: 1536 },
  { file: 'IMG_0882.jpg', width: 3024, height: 4032 },
  { file: 'IMG_1170.jpg', width: 4004, height: 5339 },
  { file: 'IMG_1294.jpg', width: 3024, height: 4032 },
  { file: 'IMG_1320.jpg', width: 3024, height: 4032 },
  { file: 'IMG_1481.jpg', width: 3024, height: 4032 },
  { file: 'IMG_1740.jpg', width: 4480, height: 6720 },
  { file: 'IMG_1793.jpg', width: 3024, height: 4032 },
  { file: 'IMG_1794.jpg', width: 3024, height: 4032 },
  { file: 'IMG_2596.jpg', width: 4032, height: 3024 },
  { file: 'IMG_2689.jpg', width: 3024, height: 4032 },
  { file: 'IMG_2703.jpg', width: 3024, height: 4032 },
  { file: 'IMG_2992.jpg', width: 4284, height: 5712 },
  { file: 'IMG_3004.jpg', width: 4284, height: 5712 },
  { file: 'IMG_3016.jpg', width: 3024, height: 4032 },
  { file: 'IMG_3265.jpg', width: 4284, height: 5712 },
  { file: 'IMG_7303.jpg', width: 4284, height: 5712 },
  { file: 'IMG_7817.jpg', width: 3024, height: 4032 },
  { file: 'IMG_7937.jpg', width: 3583, height: 2891 },
  { file: 'IMG_8014.jpg', width: 3024, height: 4032 },
  { file: 'IMG_8386.jpg', width: 2268, height: 4032 },
  { file: 'IMG_9063.jpg', width: 3024, height: 4032 },
  { file: 'IMG_9070.jpg', width: 4032, height: 3024 },
  { file: 'IMG_9350.jpg', width: 3024, height: 4032 },
  { file: 'IMG_9422.jpg', width: 3024, height: 4032 },
  { file: 'IMG_9741.jpg', width: 3024, height: 4032 },
]);

// --- Champions / podium gallery -------------------------------------------
export const galleryChampImages = build('champ', [
  { file: 'IMG_0589.jpg', width: 4032, height: 3024 },
  { file: 'IMG_1011.jpg', width: 3024, height: 4032 },
  { file: 'IMG_1339.jpg', width: 2560, height: 1920 },
  { file: 'IMG_1341.jpg', width: 4284, height: 5712 },
  { file: 'IMG_1470.jpg', width: 4032, height: 3024 },
  { file: 'IMG_1513.jpg', width: 3024, height: 4032 },
  { file: 'IMG_1530.jpg', width: 3024, height: 4032 },
  { file: 'IMG_1565.jpg', width: 4032, height: 3024 },
  { file: 'IMG_1593.jpg', width: 3024, height: 4032 },
  { file: 'IMG_6322.jpg', width: 4284, height: 5712 },
  { file: 'IMG_7853.jpg', width: 3024, height: 4032 },
  { file: 'IMG_9035.jpg', width: 3024, height: 4032 },
  { file: 'IMG_9144.jpg', width: 2171, height: 3859 },
  { file: 'IMG_9769.jpg', width: 4032, height: 3024 },
  { file: 'IMG_9828.jpg', width: 4182, height: 6273 },
]);

// --- Products --------------------------------------------------------------
export const productImages = build('products', [
  { file: 'IMG_1060.jpg', width: 1254, height: 1254 },
  { file: 'IMG_1061.jpg', width: 1254, height: 1254 },
  { file: 'IMG_1062.jpg', width: 1254, height: 1254 },
  { file: 'IMG_1063.jpg', width: 1254, height: 1254 },
]);

// --- Events ----------------------------------------------------------------
export const eventImages = build('events', [
  { file: 'IMG_0616.jpg', width: 5712, height: 4284 },
  { file: 'IMG_0665.jpg', width: 4284, height: 5712 },
  { file: 'IMG_0696.jpg', width: 3024, height: 4032 },
  { file: 'IMG_0711.jpg', width: 3024, height: 4636 },
  { file: 'IMG_0753.jpg', width: 1706, height: 2560 },
  { file: 'IMG_0757.jpg', width: 1706, height: 2560 },
  { file: 'IMG_0758.jpg', width: 1706, height: 2560 },
  { file: 'IMG_0759.jpg', width: 1706, height: 2560 },
  { file: 'IMG_0760.jpg', width: 1706, height: 2560 },
  { file: 'IMG_0763.jpg', width: 1706, height: 2560 },
  { file: 'IMG_0765.jpg', width: 1706, height: 2560 },
  { file: 'IMG_0766.jpg', width: 1706, height: 2560 },
  { file: 'IMG_0772.jpg', width: 1706, height: 2560 },
  { file: 'IMG_0773.jpg', width: 1706, height: 2560 },
  { file: 'IMG_0774.jpg', width: 1706, height: 2560 },
  { file: 'IMG_0775.jpg', width: 2270, height: 2560 },
  { file: 'IMG_0776.jpg', width: 1706, height: 2560 },
  { file: 'IMG_8950.jpg', width: 6720, height: 4480 },
  { file: 'IMG_8954.jpg', width: 6720, height: 4480 },
  { file: 'IMG_8999.jpg', width: 4480, height: 6720 },
  { file: 'IMG_9002.jpg', width: 4475, height: 2517 },
  { file: 'IMG_9003.jpg', width: 6720, height: 4480 },
  { file: 'IMG_9007.jpg', width: 6720, height: 4480 },
  { file: 'IMG_9016.jpg', width: 6720, height: 4480 },
  { file: 'IMG_9017.jpg', width: 4480, height: 6720 },
]);

// --- Logos -----------------------------------------------------------------
// `local()` keeps each file pointing at its own real local asset (so the
// header/footer logo can switch between the black and white variants by theme).
export const logoImages = local('logos', [
  { file: 'logo-black.PNG', width: 1024, height: 1024 },
  { file: 'logo-main-black.PNG', width: 1024, height: 1024 },
  { file: 'logo-main-white.PNG', width: 1024, height: 1024 },
  { file: 'logo-white.PNG', width: 1024, height: 1024 },
]);

/** Indexed access to the two themed logo marks used by the Header/Footer. */
export const logoBlack = logoImages.find((l) => l.id === 'logo-main-black')!;
export const logoWhite = logoImages.find((l) => l.id === 'logo-main-white')!;

// --- Sponsors --------------------------------------------------------------
// `local()` loads the real sponsor logo files (bergeerd.png, comode.png)
// directly from `/public/images/sponsors/...`.
export const sponsorImages = local('sponsors', [
  { file: 'bergeerd.png', width: 3355, height: 3076 },
  { file: 'comode.png', width: 1468, height: 928 },
]);

/** Map sponsor logos to friendly labels used in the sponsor wall / marquee. */
export const sponsors = sponsorImages.map((img, i) => ({
  ...img,
  name: ['Bergeerd', 'Comode'][i] ?? `Partner ${i + 1}`,
}));

// --- Home page: hero slider -------------------------------------------------
// Curated local backgrounds for the full-screen hero slider on the home page.
// `local()` keeps each item pointing at its own real local file (not SAMPLE_IMAGE)
// so the slider shows 5 distinct scenes.
function local(
  folder: string,
  assets: RawAsset[],
): ImageItem[] {
  return assets.map(({ file, width, height }) => {
    const src = `/images/${folder}/${file}`;
    return {
      id: file.replace(/\.[^.]+$/, ''),
      full: src,
      thumb: src,
      width,
      height,
      ratio: width / height,
      thumbW: width,
      thumbH: height,
    };
  });
}

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

/** 2 images for the home page "Upcoming events" cards. */
export const homeEventImages = local('home_upcoming_events', [
  { file: '1_dark.PNG', width: 1080, height: 1350 },
  { file: '1_ligth.PNG', width: 1080, height: 1350 },
]);
