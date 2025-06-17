import { browser } from "$app/environment";
import { writable } from "svelte/store";

// Get initial theme from localStorage or default to 'light'
const getInitialTheme = () => {
  if (browser) {
    const stored = localStorage.getItem("theme");
    if (stored) return stored;

    // Check system preference
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
  }
  return "light";
};

// Create the theme store
export const theme = writable(getInitialTheme());

// Subscribe to theme changes and update localStorage and document class
if (browser) {
  theme.subscribe((value) => {
    localStorage.setItem("theme", value);

    if (value === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  });

  // Apply initial theme immediately
  const initialTheme = getInitialTheme();
  if (initialTheme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}

// Theme toggle function
export const toggleTheme = () => {
  theme.update((current) => (current === "light" ? "dark" : "light"));
};
