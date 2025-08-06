import { json } from "@sveltejs/kit";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { getCategoriesFilePath, ensureDataDirectory } from "$lib/utils/dataDirectory.js";

const CATEGORIES_FILE = getCategoriesFilePath();

// Initialize categories file if it doesn't exist
if (!existsSync(CATEGORIES_FILE)) {
  ensureDataDirectory();
  const defaultCategories = [
    "Food & Dining",
    "Transportation",
    "Shopping",
    "Entertainment",
    "Bills & Utilities",
    "Healthcare",
    "Education",
    "Travel",
    "Other",
  ];
  writeFileSync(CATEGORIES_FILE, JSON.stringify(defaultCategories, null, 2));
}

export async function GET() {
  try {
    const categories = JSON.parse(readFileSync(CATEGORIES_FILE, "utf-8"));
    return json(categories);
  } catch (error) {
    return json(["Other"], { status: 500 });
  }
}

export async function POST({ request }) {
  try {
    const { category } = await request.json();

    const categories = JSON.parse(readFileSync(CATEGORIES_FILE, "utf-8"));

    if (!categories.includes(category)) {
      categories.push(category);
      ensureDataDirectory();
      writeFileSync(CATEGORIES_FILE, JSON.stringify(categories, null, 2));
    }

    return json({ success: true, categories });
  } catch (error) {
    return json({ success: false, error: error.message }, { status: 500 });
  }
}
