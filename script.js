import { Variant } from "./scripts/class/Variant.js";
import { Card } from "./scripts/class/Card.js";
import { Connection } from "./scripts/class/Connection.js";

import { debounce, renderErrorVisualise } from "./scripts/common-func.js";

const searchInput = document.querySelector('.search__input');
const errorMessage = document.querySelector('.error-message');
const searchResults = document.querySelector('.search__results');
const cardContainer = document.querySelector('.card-container');

let connection;

function createCard(evt){
  const index = connection.getClickedItem(evt.target.innerText);
  const element = connection.arr[index];
  new Card(element.name, element.owner.login, element.stargazers_count);
  cardContainer.addEventListener('click', deleteCard);
}

function deleteCard(evt){
  if(evt.target.classList.value === 'card__delete'){
    Card.deleteElement(evt.target.closest('li'));
    if (!cardContainer.children.length) {
      cardContainer.removeEventListener('click', deleteCard);
    }
  }
}

async function renderFetch(text){
  if(text){
    try {
      const url = `https://api.github.com/search/repositories?q=${text}&sort=stars&order=desc&per_page=5`;
      const response = await fetch(url);
      const {items: result} = await response.json();
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  return [];
}

async function renderInputValue(e){
  const inputValue = e.target.value;
  const keyWord = inputValue.toLowerCase().replace(/\s\b/g, '+');
  const result = await renderFetch(keyWord);

  if(result.length){
    searchResults.addEventListener('click', createCard);
    connection = new Connection(result);
    const names = connection.arr.map(e => e.name);

    if(searchResults.children.length == 5){
      Array.from(searchResults.children).forEach(e => e.remove());
    }

    new Variant(names);
    renderErrorVisualise(searchInput, errorMessage, 'error', 'visually-hidden', false);
  }else{
    searchResults.removeEventListener('click', createCard);
    Array.from(searchResults.children).forEach(e => e.remove());
    renderErrorVisualise(searchInput, errorMessage, 'error', 'visually-hidden', true);
  }
}

const renderInputValueDebounced = debounce(renderInputValue, 400);

searchInput.addEventListener('input', renderInputValueDebounced);









