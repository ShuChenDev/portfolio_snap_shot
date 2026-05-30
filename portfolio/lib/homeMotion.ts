export const SKIP_HOME_POP_KEY = "skip-home-pop";

export function markSkipHomePopOnNextVisit() {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(SKIP_HOME_POP_KEY, "1");
}

export function consumeSkipHomePop(): boolean {
  if (typeof window === "undefined") return false;
  const skip = sessionStorage.getItem(SKIP_HOME_POP_KEY) === "1";
  if (skip) sessionStorage.removeItem(SKIP_HOME_POP_KEY);
  return skip;
}

export function isSameSiteHref(href: string): boolean {
  try {
    const url = new URL(href, window.location.origin);
    return url.origin === window.location.origin;
  } catch {
    return false;
  }
}

export function isHomePathname(pathname: string): boolean {
  return pathname === "/";
}

/** Runs before paint on hard navigations to home to avoid animation flash. */
export function homeEntranceMotionBootstrapScript(): string {
  return `(function(){try{if(location.pathname==="/"&&sessionStorage.getItem("${SKIP_HOME_POP_KEY}")==="1"){document.documentElement.dataset.homeAnimate="false";sessionStorage.removeItem("${SKIP_HOME_POP_KEY}");}}catch(e){}})();`;
}
