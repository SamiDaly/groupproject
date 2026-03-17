export function el<K extends keyof HTMLElementTagNameMap>(tag: K, opts: { className?: string; text?: string } = {}) {
  const node = document.createElement(tag);
  if (opts.className) node.className = opts.className;
  if (opts.text) node.textContent = opts.text;
  return node;
}

export const placeholderPoster = "/vite.svg";
export const safePoster = (src: string) => (src && src !== "N/A" ? src : placeholderPoster);
