import { Variant } from "./scripts/class/Variant.js";
import { Card } from "./scripts/class/Card.js";
import { Connection } from "./scripts/class/Connection.js";

import { debounce } from "./scripts/debounce.js";

const searchInput = document.querySelector('.search__input');
const searchResults = document.querySelector('.search__results');
const cardContainer = document.querySelector('.card-container');

let connection;

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


