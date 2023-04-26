export class Connection{
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