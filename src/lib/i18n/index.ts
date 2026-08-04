import type { Dictionary, Locale } from '../i18n-types';
import en from './en';
import fa from './fa';

export const dictionaries: Record<Locale, Dictionary> = { en, fa };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? en;
}
