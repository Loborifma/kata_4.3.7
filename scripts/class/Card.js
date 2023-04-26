export class Card{
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