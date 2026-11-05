// Shared emphasis for project rows (featured and archive). Pointing at a row, or focusing
// a link inside it, highlights the row and fills its link buttons with ink (near white on
// the dark theme), so the buttons read as the way to interact with the project. The button
// under the pointer or with keyboard focus turns accent.
export const projectRow =
  "group/row border-l-2 border-l-transparent px-3 transition-colors hover:border-l-accent hover:bg-paper focus-within:border-l-accent focus-within:bg-paper sm:px-4";

export const projectButton =
  "inline-flex min-h-9 items-center gap-1 border border-hair px-2.5 font-mono text-cap uppercase transition-colors group-hover/row:border-ink group-hover/row:bg-ink group-hover/row:text-canvas group-focus-within/row:border-ink group-focus-within/row:bg-ink group-focus-within/row:text-canvas hover:border-accent hover:bg-accent hover:text-canvas focus-visible:border-accent focus-visible:bg-accent focus-visible:text-canvas";
