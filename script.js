class Variant{
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

class Card{
  constructor(name, owner, stars){
    this.cardContainer = document.querySelector('.card-container');
    this.card = this.createElement(name, owner, stars);
    this.cardContainer.append(this.card);
  }

  createElement(name, owner, stars){
    const classNameSpan = ['card__username', 'card__owner', 'card__stars']
    const info = [`Name: ${name}`, `Owner: ${owner}`, `Stars: ${stars}`]

    const card = document.createElement('li');
    card.classList.add('card');

    const cardInfo = document.createElement('div');
    cardInfo.classList.add('card__info');

    for(let i=0; i<classNameSpan.length; i++){
      const cardAddInfo = document.createElement('span');
      cardAddInfo.classList.add(classNameSpan[i]);
      cardAddInfo.textContent = info[i];
      cardInfo.append(cardAddInfo);
    }

    const cardDelete = document.createElement('div');
    cardDelete.classList.add('card__delete');

    card.append(cardInfo);
    card.append(cardDelete);
    
    return card;
  }

  static deleteElement(el){
    el.remove()
  }
}

class Connection{
  constructor(arr){
    this.arr = arr;
  }

  getClickedItem(name){
    let index;
    this.arr.forEach((e,i) => {
      if(e.name === name){

        index = i;
      }
    });
    return index;
  }
}

const searchInput = document.querySelector('.search__input');
const searchResults = document.querySelector('.search__results');
const cardContainer = document.querySelector('.card-container');

let connection;

function debounce(fn, ms){
  let timeout;
  return function(){
    const func = () => { fn.apply(this, arguments) };
    clearTimeout(timeout);
    timeout = setTimeout(func, ms)
  }
}

async function renderFetch(text){
  if(text){
    try {
      const url = `https://api.github.com/search/repositories?q=${text}&sort=stars&order=desc&per_page=5`
      const response = await fetch(url)
      const {items: result} = await response.json();
      return result;
    } catch (error) {
      throw new Error(error.message)
    }
  }
}

async function renderInputValue(e){
  const inputValue = e.target.value
  const keyWord = inputValue.toLowerCase().replace(/\s\b/g, '+');
  const result = await renderFetch(keyWord)
  if(result){
    connection = new Connection(result);
    const names = connection.arr.map(e => e.name);
    if(searchResults.children.length == 5){
      Array.from(searchResults.children).forEach(e => e.remove())
    }
    new Variant(names)
  }else{
    Array.from(searchResults.children).forEach(e => e.remove())
  }
}

const renderInputValueDebounced = debounce(renderInputValue, 400);

searchInput.addEventListener('keyup', renderInputValueDebounced);

searchResults.addEventListener('click', (e) => {
  const index = connection.getClickedItem(e.target.innerText);
  const element = connection.arr[index];
  new Card(element.name, element.owner.login, element.stargazers_count);
});

cardContainer.addEventListener('click', (e) => {
  if(e.target.classList.value === 'card__delete'){
    Card.deleteElement(e.target.closest('li'));
  }
})


