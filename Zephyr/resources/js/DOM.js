const createElement = (id = "", tag = "div", ...classes) => {
    const el = document.createElement(tag);
    el.id = id;
    el.classList.add(...classes);
    return el;
};
const sizeElement = (el, width, height) => {
    el.style.width = `${width}px`;
    el.style.height = `${height}px`;
};
const positionElement = (el, left, top) => {
    el.style.left = `${left}px`;
    el.style.top = `${top}px`;
};
export { createElement, sizeElement, positionElement };
