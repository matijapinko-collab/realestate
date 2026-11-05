import { cookies } from "next/headers";

/**
 * Which world to render on the server.
 *
 * The two worlds are no longer one markup tree in two skins: light and dark
 * have different sections, in a different order, with different copy. That
 * cannot be done honestly with CSS alone, and rendering both and hiding one
 * would put every sentence in the page twice — bad for a screen reader and
 * worse for a crawler.
 *
 * So the choice is a cookie, written next to the existing localStorage entry
 * whenever a visitor picks a world. The server reads it and renders that
 * world and only that world: one URL, one copy of the content, and no flash,
 * because the right tree is in the first byte.
 *
 * Someone who has never chosen gets the dark world, which is also what the
 * pill chooser opens over. `localStorage` stays the source of truth for the
 * pre-paint script; the cookie is its server-readable twin.
 */

export const THEME_COOKIE = "pinko-theme";

export type Theme = "dark" | "light";

export async function getTheme(): Promise<Theme> {
  const store = await cookies();
  return store.get(THEME_COOKIE)?.value === "light" ? "light" : "dark";
}
