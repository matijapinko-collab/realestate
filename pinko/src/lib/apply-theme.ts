import type { Theme } from "@/components/ui/ThemeToggle";

/**
 * Applies a chosen world, everywhere it has to be recorded.
 *
 * Three places, and all three matter: the attribute so the page repaints at
 * once, localStorage so the pre-paint script in <head> knows next time, and
 * a cookie so the SERVER knows — the two worlds are different component
 * trees now, and the server can only pick the right one if the choice
 * reaches it. Miss the cookie and a visitor gets the other world on their
 * next navigation.
 *
 * `SameSite=Lax` and no `Secure` flag on localhost, so development works;
 * it is a display preference, not a credential.
 */
export function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
  try {
    localStorage.setItem("pinko-theme", theme);
  } catch {
    // Storage blocked. The cookie below still carries the choice.
  }
  try {
    const secure = location.protocol === "https:" ? "; Secure" : "";
    document.cookie = `pinko-theme=${theme}; path=/; max-age=31536000; SameSite=Lax${secure}`;
  } catch {
    // Nothing more to do; the attribute above already applied it.
  }
}
