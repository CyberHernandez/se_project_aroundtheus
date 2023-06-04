export default class Section {
  constructor({ items, renderer }, selector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  //renderItems() renders all elements on the page
  this._items.forEach((item) => {
    this._renderer(item);
    this.addItem(item);
  })
  //renderer() will render each element on a page
  //addItem() takes a DOM element and adds it to the container
  this._container.append(item);
}
