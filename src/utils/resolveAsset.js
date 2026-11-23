/**
 * Utility to resolve static asset paths with Vite's BASE_URL for GitHub Pages deployment.
 * Handles paths with or without leading slashes, external URLs, and prevents double base prefixes.
 *
 * @param {string} path - The asset path to resolve (e.g. '/pro1/Pro1.png', 'pro1/Pro1.png')
 * @returns {string} - The resolved URL (e.g. '/architect-portfolio/pro1/Pro1.png')
 */
export function resolveAsset(path) {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:') || path.startsWith('blob:')) {
    return path;
  }
  const clean = path.replace(/\\/g, '/');
  const base = import.meta.env.BASE_URL || '/';

  // If path already starts with the base URL, return directly
  if (clean.startsWith(base)) {
    return clean;
  }

  // Remove leading slash to safely append to base (which ends with '/')
  const normalized = clean.startsWith('/') ? clean.slice(1) : clean;

  // Avoid duplication if normalized path already contains base path without slashes
  const baseTrimmed = base.replace(/^\/+|\/+$/g, '');
  if (baseTrimmed && normalized.startsWith(baseTrimmed + '/')) {
    return `/${normalized}`;
  }

  return `${base}${normalized}`;
}
