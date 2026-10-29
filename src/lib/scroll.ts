// Locks page scrolling for both native scroll and Lenis (see LenisWrapper's virtualScroll)
export const setScrollLock = (locked: boolean) => {
  document.documentElement.toggleAttribute("data-scroll-locked", locked);
};

export const isScrollLocked = () => document.documentElement.hasAttribute("data-scroll-locked");
