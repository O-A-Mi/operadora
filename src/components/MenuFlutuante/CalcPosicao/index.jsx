function getFloatingMenuPosition({
  preferredPos = "right",
  triggerRect,
  menuRect,
  viewportWidth = window.innerWidth,
  viewportHeight = window.innerHeight,
  GAP = 8,
}) {
  const fallbackMap = {
    top: ["bottom", "right", "left"],
    bottom: ["top", "right", "left"],
    left: ["right", "top", "bottom"],
    right: ["left", "top", "bottom"],
  };

  const positionsToCheck = [
    preferredPos,
    ...(fallbackMap[preferredPos] || []),
    "top",
    "bottom",
    "left",
    "right",
  ].filter((v, i, self) => self.indexOf(v) === i);

  for (const pos of positionsToCheck) {
    let top = 0,
      left = 0;

    switch (pos) {
      case "top":
        top = triggerRect.top - menuRect.height - GAP;
        left = triggerRect.left + triggerRect.width / 2 - menuRect.width / 2;
        break;
      case "bottom":
        top = triggerRect.bottom + GAP;
        left = triggerRect.left + triggerRect.width / 2 - menuRect.width / 2;
        break;
      case "left":
        top = triggerRect.top + triggerRect.height / 2 - menuRect.height / 2;
        left = triggerRect.left - menuRect.width - GAP;
        break;
      case "right":
        top = triggerRect.top + triggerRect.height / 2 - menuRect.height / 2;
        left = triggerRect.right + GAP;
        break;
    }

    // verifica se cabe na viewport inteira
    const fitsVertically =
      top >= GAP && top + menuRect.height + GAP <= viewportHeight;
    const fitsHorizontally =
      left >= GAP && left + menuRect.width + GAP <= viewportWidth;

    if (fitsVertically && fitsHorizontally) {
      return { top, left, actualPosition: pos };
    }
  }

  // fallback: forçar ajuste dentro da viewport (mesmo que corte)
  let top = triggerRect.bottom + GAP;
  let left = triggerRect.left;

  if (left + menuRect.width + GAP > viewportWidth) {
    left = viewportWidth - menuRect.width - GAP;
  }
  if (top + menuRect.height + GAP > viewportHeight) {
    top = viewportHeight - menuRect.height - GAP;
  }
  if (top < GAP) top = GAP;
  if (left < GAP) left = GAP;

  return { top, left, actualPosition: preferredPos };
}
