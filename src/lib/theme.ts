export type ThemeToken = "ink" | "ocean" | "foam" | "mist" | "shell" | "accent" | "sand" | "shadow";

// Reads the active theme's token so GSAP can tween to a concrete rgba value
export const themeColor = (token: ThemeToken, alpha = 1) => {
  const rgb = getComputedStyle(document.documentElement).getPropertyValue(`--${token}`).trim().split(/\s+/).join(", ");
  return `rgba(${rgb}, ${alpha})`;
};
