import en from "@/messages/en.json";

/**
 * Single source of content for the (English-only) site. Kept in a JSON file so
 * copy stays separate from components. (Formerly a multi-locale dictionary; the
 * site is now English-only, so there is just the one content object.)
 */
export const content = en;
export type Content = typeof en;
