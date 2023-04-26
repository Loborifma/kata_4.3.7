export class Variant{
  constructor(arr){
    this.variantContainer = document.querySelector('.search__results');
    this.arr = arr.forEach(element => {
      const variant = this.createElement(element);
      this.variantContainer.append(variant)
    });
  }

  createElement(name){
    const elemnt = document.createElement('li');
    elemnt.classList.add('search__result');
    const span = document.createElement('span');
    span.textContent = name
    elemnt.append(span)
    return elemnt;
  }
}