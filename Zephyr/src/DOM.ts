const createElement = (
  id: string = "",
  tag: string = "div",
  ...classes: string[]
) => {
  const el = document.createElement(tag);
  el.id = id;
  el.classList.add(...classes);
  return el;
};

const sizeElement = (el: HTMLElement, width: number, height: number) => {
  el.style.width = `${width}px`;
  el.style.height = `${height}px`;
};

const positionElement = (el: HTMLElement, left: number, top: number) => {
  el.style.left = `${left}px`;
  el.style.top = `${top}px`;
};

export { createElement, sizeElement, positionElement };
