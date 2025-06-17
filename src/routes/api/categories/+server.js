import { json } from "@sveltejs/kit";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

const CATEGORIES_FILE = join(process.cwd(), "categories.json");

// Initialize categories file if it doesn't exist
if (!existsSync(CATEGORIES_FILE)) {
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
      writeFileSync(CATEGORIES_FILE, JSON.stringify(categories, null, 2));
    }

    return json({ success: true, categories });
  } catch (error) {
    return json({ success: false, error: error.message }, { status: 500 });
  }
}
