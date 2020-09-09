class DOM {
  constructor() {}
}

export function dom() {
  return new DOM();
}

dom.create = (tagName, classes = '') => {
  const $el = document.createElement(tagName);

  if (classes) {
    $el.classList.add(classes);
  }

  return $el;
};
