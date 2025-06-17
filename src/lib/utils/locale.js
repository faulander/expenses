import { browser } from "$app/environment";

// Get browser language, fallback to English
export const getBrowserLocale = () => {
  if (!browser) return "en";
  return navigator.language || navigator.languages?.[0] || "en";
};

// Get localized month names
export const getLocalizedMonths = (locale = getBrowserLocale()) => {
  const months = [];
  for (let i = 0; i < 12; i++) {
    const date = new Date(2023, i, 1); // Use any year, month i
    const monthName = new Intl.DateTimeFormat(locale, { month: "long" }).format(
      date
    );
    months.push({
      value: i + 1,
      name: monthName,
    });
  }
  return months;
};

// Get date format for the locale
export const getLocaleDateFormat = (locale = getBrowserLocale()) => {
  // Create a sample date to determine format
  const sampleDate = new Date(2023, 11, 31); // Dec 31, 2023
  const formatted = new Intl.DateTimeFormat(locale).format(sampleDate);

  // Determine format based on the formatted output
  if (formatted.includes("31.12.2023") || formatted.includes("31/12/2023")) {
    return "dd.MM.yyyy"; // European format
  } else if (formatted.includes("12/31/2023")) {
    return "MM/dd/yyyy"; // US format
  } else if (formatted.includes("2023-12-31")) {
    return "yyyy-MM-dd"; // ISO format
  } else {
    // Try to detect based on locale
    if (locale.startsWith("de")) return "dd.MM.yyyy";
    if (locale.startsWith("en-US")) return "MM/dd/yyyy";
    if (locale.startsWith("en-GB")) return "dd/MM/yyyy";
    return "dd.MM.yyyy"; // Default to European
  }
};

// Get flatpickr locale string from browser locale
export const getFlatpickrLocale = (locale = getBrowserLocale()) => {
  // Map browser locales to flatpickr locale strings
  const localeMap = {
    de: "de",
    "de-DE": "de",
    "de-AT": "de",
    "de-CH": "de",
    en: "default",
    "en-US": "default",
    "en-GB": "default",
    fr: "fr",
    "fr-FR": "fr",
    es: "es",
    "es-ES": "es",
    it: "it",
    "it-IT": "it",
    nl: "nl",
    "nl-NL": "nl",
  };

  // Try exact match first, then language code
  return localeMap[locale] || localeMap[locale.split("-")[0]] || "default";
};

// Format date according to locale
export const formatDateForLocale = (date, locale = getBrowserLocale()) => {
  if (!date) return "";

  const dateObj = typeof date === "string" ? new Date(date) : date;

  // Configure formatting options for proper leading zeros
  const options = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };

  return new Intl.DateTimeFormat(locale, options).format(dateObj);
};
