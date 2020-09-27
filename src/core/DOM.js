class DOM {
  constructor(selector) {
    this.$el =
      typeof selector === 'string'
        ? document.querySelector(selector)
        : selector;
  }

  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html;
      return this;
    }

    return this.$el.outerHTML.trim();
  }

  text(value) {
    if (typeof value === 'string') {
      if (this.$el.tagName.toLowerCase() === 'input') {
        return (this.$el.value = value);
      } else {
        this.$el.textContent = value;
      }

      return this;
    }

    if (this.$el.tagName.toLowerCase() === 'input') {
      return this.$el.value.trim();
    }

    return this.$el.textContent.trim();
  }

  clear() {
    this.html('');
    return this;
  }

  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback);
  }

  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback);
  }

  append(node) {
    if (node instanceof DOM) {
      node = node.$el;
    }

    if (Element.prototype.append) {
      this.$el.append(node);
    } else {
      this.$el.appendChild(node);
    }

    return this;
  }

  get data() {
    return this.$el.dataset;
  }

  closest(selector) {
    return $dom(this.$el.closest(selector));
  }

  getCoords() {
    return this.$el.getBoundingClientRect();
  }

  find(selector) {
    return $dom(this.$el.querySelector(selector));
  }

  findAll(selector) {
    return this.$el.querySelectorAll(selector);
  }

  css(styles = {}) {
    Object.keys(styles).map((key) => (this.$el.style[key] = styles[key]));
    return Object.keys(styles).length ? this : getComputedStyle(this.$el);
  }

  get class() {
    return {
      add: (className) => {
        this.$el.classList.add(className);
        return this;
      },
      remove: (className) => {
        this.$el.classList.remove(className);
        return this;
      },
      toggle: (className) => {
        this.$el.classList.toggle(className);
        return this;
      },
    };
  }

  focus() {
    this.$el.focus();
    return this;
  }

  blur() {
    this.$el.blur();
    return this;
  }
}

export function $dom(selector) {
  return new DOM(selector);
}

$dom.create = (tagName, classes = '') => {
  const el = document.createElement(tagName);

  if (classes) {
    el.classList.add(classes);
  }

  return $dom(el);
};
